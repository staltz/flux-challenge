(ns ui-of-the-sith.scrollable-list
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [ui-of-the-sith.config :as cfg]))

(defn set-scroll-button-state
  [button {:keys [direction obi-wan-planet-match? at-start? at-end? scroll-button-callback]}]
   (let [enabled? (and (nil? obi-wan-planet-match?)
                      (condp = direction
                        :up (not at-start?)
                        :down (not at-end?)))

         css-class (let [button-class (str "css-button-" (name direction))]
                     (if-not enabled?
                       (str button-class " css-button-disabled")
                       button-class)) 
         on-click (if enabled? 
                    (fn [e] (scroll-button-callback direction))
                    (fn [e] (doto e (.preventDefault) (.stopPropagation))))]
    (om/set-state! button {:enabled? enabled?
                           :css-class css-class
                           :on-click on-click})))

(defui ScrollButton
  Object
  (componentWillMount [this]
    (set-scroll-button-state this (om/props this)))
  (componentWillReceiveProps [this nextProps]
    (set-scroll-button-state this nextProps))
  (render [this]
    (let [{:keys [css-class on-click]} (om/get-state this)]
    (dom/button #js {:className css-class
                     :onClick on-click}))))

(defn scroll-button
  [state direction]
  ((om/factory ScrollButton) (merge state {:direction direction})))

(defn abort-xhr [{:keys [xhr]}]
    (if xhr
      (.abort xhr)))

(defn abort-and-restart-xhr-if-required
  [{:keys [xhr matching-planet-in-list?]}]
  (if xhr
    (if matching-planet-in-list?
      ; abort request if there is a match
      (.abort xhr)
      ; restart request if there is no match and an aborted request
      (if (= 7 (.getLastErrorCode xhr))
        (.send xhr (.getLastUri xhr))))))

(defui Slot
  static om/Ident
  (ident [this {:keys [sith/id]}]
    [:siths/by-id id])
  static om/IQuery
  (query [this]
    [:sith/id
     :sith/name
     :sith/homeworld
     :sith/remote-id
     :sith/apprentice-id
     :sith/apprentice-remote-id
     :sith/master-id
     :sith/master-remote-id])
  Object
  (componentWillMount [this]
    (om/update-state! this merge {:css-class "css-slot"}))
  (componentDidMount [this]
    (let [{:keys [sith/id sith/remote-id] :as sith} (om/props this)]
      (if (not (nil? remote-id))
        (om/transact! this
                      `[(sith/populate-from-remote ~{:sith sith})
                      [~[:siths/by-id id]]]))))    
  (componentWillReceiveProps
    [this nextProps]
    (let [{:keys [sith/remote-id sith/name sith/homeworld obi-wan-planet matching-planet-in-list?]} (om/props this)
          next-remote-id (:sith/remote-id nextProps)
          next-name (:sith/name nextProps)
          remote-id-changed? (and (not (nil? next-remote-id))
                                  (not (= remote-id next-remote-id)))
          populated-from-remote? (not (= name next-name))]
      (om/update-state! this merge {:remote-id-changed? remote-id-changed?
                                    :populated-from-remote? populated-from-remote?
                                    :matching-planet-in-list? matching-planet-in-list?
                                    :css-class (if (and (not (nil? homeworld)) 
                                                        (= homeworld obi-wan-planet))
                                                 "css-slot homeworld-alert"
                                                 "css-slot")})))
  (componentDidUpdate [this prevProps prevState]
    (let [{:keys [sith/id] :as sith} (om/props this)
          {:keys [remote-id-changed? populated-from-remote? matching-planet-in-list?]} (om/get-state this)]
      (if remote-id-changed?
        (om/transact! this
                      `[(sith/populate-from-remote ~{:sith sith})
                      [~[:siths/by-id id]]]))
      (if populated-from-remote?
        ((:populate-from-remote-callback (om/get-computed this)) id))
      (abort-and-restart-xhr-if-required (om/get-state this))))
  (componentWillUnmount [this]
    (abort-xhr (om/get-state this)))
  (render [this]
    (let [{:keys [sith/name sith/homeworld] :as props} (om/props this)]
      (dom/li #js {:className (:css-class (om/get-state this))}
          (dom/h3 nil name)
          (if-not (nil? homeworld)
            (dom/h6 nil (str "Homeworld: " homeworld)))))))

(defn slot
  [{:keys [obi-wan-planet obi-wan-planet-match? populate-from-remote-callback] :as state} sith]
  (let [props (merge sith {:obi-wan-planet obi-wan-planet :matching-planet-in-list? obi-wan-planet-match?})
        computed-props (om/computed props {:populate-from-remote-callback populate-from-remote-callback})]
    ((om/factory Slot {:keyfn :sith/id}) computed-props)))

(defn set-list-state
  [scrollable-list {:keys [obi-wan-planet siths/list] :as props}]
  (om/set-state! scrollable-list {:at-start? (nil? (get-in list [0 :sith/master-remote-id]))
                                  :at-end? (nil? (get-in list [(- cfg/list-size 1) :sith/apprentice-remote-id]))
                                  :obi-wan-planet obi-wan-planet
                                  :obi-wan-planet-match? (seq (filter #(and (= obi-wan-planet %) (not (nil? %))) (map #(:sith/homeworld %) list)))
                                  :scroll-button-callback (:scroll-callback (om/get-computed list))
                                  :populate-from-remote-callback (:populate-from-remote-callback (om/get-computed list))}))

(defui ScrollableList
  Object
  (componentWillMount
    [this]
      (set-list-state this (om/props this)))
  (componentWillReceiveProps 
    [this nextProps]
    (set-list-state this nextProps))
  (render [this]
    (let [{:keys [obi-wan-planet siths/list]} (om/props this)]
      (dom/section #js {:className "css-scrollable-list"}
        (apply dom/ul #js {:className "css-slots"} (map #(slot (om/get-state this) %) list))
        (apply dom/div #js {:className "css-scroll-buttons"} (map #(scroll-button (om/get-state this) %) [:up :down]))))))

(def scrollable-list (om/factory ScrollableList))
