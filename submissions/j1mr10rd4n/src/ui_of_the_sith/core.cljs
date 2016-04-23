(ns ui-of-the-sith.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [goog.dom :as gdom]
            [goog.events :as ev]
            [goog.object :as o]
            [cljs.core.async :as async :refer [<! >! put! chan]]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [ui-of-the-sith.config :as cfg]
            [ui-of-the-sith.parser :as p]
            [ui-of-the-sith.planet-monitor :as pm]
            [ui-of-the-sith.scrollable-list :as sl]
            [ui-of-the-sith.util :as u])
  (:import [goog Uri]
           [goog.net XhrIo]))

(def initial-siths
  (let [initial-sith {:sith/id (om/tempid)
                      :sith/name nil
                      :sith/homeworld nil
                      :sith/master-id nil
                      :sith/apprentice-id nil
                      :sith/remote-id cfg/initial-sith-remote-id
                      :sith/master-remote-id nil
                      :sith/apprentice-remote-id nil}]
    (u/fill-siths :apprentice [initial-sith])))

(def send-chan (chan))

(defn send-to-chan [c]
  (fn [{:keys [dark-jedi-query]} cb]
    (when dark-jedi-query
      (let [{[dark-jedi-query] :children} (om/query->ast dark-jedi-query)
            {:keys [component]} (:params dark-jedi-query)]
        (put! c [component cb])))))

(def reconciler
  (om/reconciler
    {:state {:siths/list initial-siths} ;giving reconciler degenerate data not in atom
     :parser (om/parser {:read p/read :mutate p/mutate})
     :send (send-to-chan send-chan) 
     :remotes [:dark-jedi-query]
     :logger cfg/logger}))

(defn dark-jedi-service-loop [c]
  (go
    (loop [[component cb] (<! c)]
      (let [{:keys [sith/id sith/remote-id] :as sith} (om/props component)
            url (str cfg/base-url remote-id)
            uri (Uri. url)
            xhr (XhrIo.)]
        (ev/listen xhr 
                   #js [goog.net.EventType.COMPLETE]
                   (fn [e] 
                     (if (= (o/get e "type") goog.net.EventType.COMPLETE)
                       (let [xhr (o/get e "target")]
                         (if-let [status (= 200 (-> xhr .getStatus))]
                           (let [jedi-data (-> xhr .getResponseJson js->clj)]
                             (.info cfg/logger (str "GOT RESPONSE FOR " (jedi-data "name") " WITH REMOTE ID " (jedi-data "id")))
                             (let [name (jedi-data "name")
                                   homeworld (get-in jedi-data ["homeworld" "name"])
                                   apprentice-remote-id (get-in jedi-data ["apprentice" "id"])
                                   master-remote-id (get-in jedi-data ["master" "id"])
                                   populated-sith (assoc sith :sith/name name
                                                              :sith/homeworld homeworld
                                                              :sith/apprentice-remote-id apprentice-remote-id
                                                              :sith/master-remote-id master-remote-id)]
                               (om/update-state! component merge {:xhr nil 
                                                                  :populated-from-remote? true})
                               (cb {[:siths/by-id id] populated-sith}))))))))
        (om/update-state! component merge {:xhr xhr})
        (.send xhr uri))
      (recur (<! c)))))

(dark-jedi-service-loop send-chan)

(defn populate-from-remote-callback
  [component]
  (fn [id] 
    (let [updated-sith (get-in @reconciler [:siths/by-id id])
         {:keys [sith/apprentice-id
                 sith/apprentice-remote-id
                 sith/master-id
                 sith/master-remote-id]} updated-sith 
          i (u/index-of (:siths/list @reconciler) [:siths/by-id id])]
      (if (and (not (nil? apprentice-remote-id)) (not (nil? apprentice-id)))
        (om/transact! component 
                      `[(sith/set-remote-id ~{:id apprentice-id :remote-id apprentice-remote-id})
                      [~[:siths/by-id id]]]))
      (if (and (not (nil? master-remote-id)) (not (nil? master-id)))
        (om/transact! component 
                      `[(sith/set-remote-id ~{:id master-id :remote-id master-remote-id})
                      [~[:siths/by-id id]]])))))

(defn scroll-callback
  [component]
  (fn [direction]
    (condp = direction
      :up (om/transact! component
                        `[(siths/scroll ~{:index (- cfg/list-size cfg/scroll-size 1) :move-to :end})
                        [:siths/list]])
      :down (om/transact! component
                          `[(siths/scroll ~{:index cfg/scroll-size :move-to :start})
                          [:siths/list]]))))

(defn update-planet-callback
  [component]
  (fn [planet-name]
    (om/transact! component
                  `[(obi-wan-planet/update {:planet-name ~planet-name}) 
                    [:obi-wan-planet :siths/list]])))

(defui App
  static om/IQuery
  (query [this]
    `[:obi-wan-planet {:siths/list ~(om/get-query sl/Slot)}])
  Object
  (render [this] 
    (let [{:keys [obi-wan-planet siths/list]} (om/props this)
          list' (om/computed list
                             {:populate-from-remote-callback (populate-from-remote-callback this)
                              :scroll-callback (scroll-callback this)})
          scrollable-list-props {:obi-wan-planet obi-wan-planet :siths/list list'}
          planet-monitor-props (om/computed {:obi-wan-planet obi-wan-planet} 
                                            {:update-planet-callback (update-planet-callback this)})]
      (dom/div #js {:className "css-root"}
        (pm/planet-monitor planet-monitor-props)
        (sl/scrollable-list scrollable-list-props)))))

(om/add-root! reconciler
              App (gdom/getElement "app"))
