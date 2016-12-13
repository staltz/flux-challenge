(ns ^:figwheel-always kauko.core
  (:require
    [reagent.core :as reagent :refer [atom]]
    [kauko.requests :as r]
    [kauko.websockets :as ws]
    [clojure.set :refer [intersection difference]]

    [cljs.core.async :refer [<! >!] :as async])

  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [reagent.ratom :refer [reaction run!]]))

(enable-console-print!)

(def num-of-sith 5)
(def num-of-steps 2)

(defonce obi-wan-location (atom nil))
(defonce sith-list (atom (into [] (take num-of-sith (repeat nil)))))

(defn get-apprentice [index]
  (get-in @sith-list [index :apprentice]))

(defn get-master [index]
  (get-in @sith-list [index :master]))

(defn obi-wan-on-sith-planet? []
  (some
    (fn [sith] (= (get-in sith [:homeworld :name]) (get @obi-wan-location "name")))
    @sith-list))

;; This function used to be a lot more complicated (it could handle situations where
;; the sith-list is [nil nil SITH nil SITH nil]), but since in practise we always have a single "block" of sith
;; (or a single sith), we can always just request the master of the first sith and the apprentice of the last,
;; as long as the list has empty slots on either end.
(defn fetch-some-sith! [whole-list]
  (let [just-sith (remove nil? whole-list)]
    (when (nil? (first whole-list)) (some-> (get-in (first just-sith) [:master :id]) (r/get-sith!)))
    (when (nil? (last whole-list)) (some-> (get-in (last just-sith) [:apprentice :id]) (r/get-sith!)))))

(add-watch sith-list :sith-list-watcher
           (fn [_ _ _ new-state]
             (if (obi-wan-on-sith-planet?)
               (r/abort-requests!)

               (fetch-some-sith! new-state))))

(add-watch obi-wan-location :request-aborter
           (fn [_ _ _ _]
             (if (obi-wan-on-sith-planet?)
               (r/abort-requests!)

               (when (and (empty? @r/pending-requests) (some nil? @sith-list))
                 (print "Restart requests!")
                 (fetch-some-sith! @sith-list)))))

(defn get-index-for-sith [sith]
  "Finds a new siths master or apprentice, and returns an index that is after or before.
  If nothing is found the list is empty, and a random index is returned."
  (or
    (when (get-in sith [:master :id])
      (first (keep-indexed (fn [index master] (when
                                                (= (:id master)
                                                   (get-in sith [:master :id]))
                                                (+ index 1))) @sith-list)))

    (when (get-in sith [:apprentice :id])
      (first (keep-indexed (fn [index apprentice] (when
                                                    (= (:id apprentice)
                                                       (get-in sith [:apprentice :id]))
                                                    (- index 1))) @sith-list)))
    (rand-int num-of-sith)))

(defn sith-fetched! [sith]
  (let [index (get-index-for-sith sith)]
    ;; Check that the returned index is valid. When pressing the buttons in quick succession,
    ;; we can get a response from a request that is already deprecated, and the sith would be outside of the list.
    (when (and (>= index 0) (< index num-of-sith))
      (print "Found " (:name sith) ", putting to: " index)
      (swap! sith-list assoc index sith))))

;; Listen to the channel where new sith responses are written.
(go-loop
  []
  (let [payload (<! r/out-channel)]
    (sith-fetched! (:body payload))
    (recur)))

(defn nil-to-start [col num-to-take num-of-nil]
  "Add <num-of-nil> nils to the beginning of a collection, and return <num-to-take> elements."
  (vec (take num-to-take (concat (repeat num-of-nil nil) col))))

(defn nil-to-end [coll num-to-take num-of-nil]
  "Add <num-of-nil> nils to the end of a collection, and return <num-to-take> elements."
  (vec (take-last num-to-take (concat coll (repeat num-of-nil nil)))))

(defn stop-fetching-for!
  "Aborts requests for masters/apprentices of the sith in coll."
  ([coll]
   (stop-fetching-for! coll :master)
   (stop-fetching-for! coll :apprentice))
  ([coll key]
   (doseq [id (map #(get-in % [key :id]) coll)]
     (r/abort-request! id))))

(defn single-sith [sith generated_id] ;; Generated_id for avoiding Reagent warnings
  (if sith
    ^{:key generated_id}
    [:li (cond-> {:class "css-slot"}
                 (= (get-in sith [:homeworld :name]) (get @obi-wan-location "name"))
                 (merge {:style {:color "red"}}))
     [:h3 (:name sith)]
     [:h6 (str "Homeworld: " (get-in sith [:homeworld :name]))]]

    ^{:key generated_id}
    [:li {:class "css-slot"}]))

(defn main-view []
  (let [up-button-enabled? (when (and (:id (get-master 0))
                                      (not (obi-wan-on-sith-planet?))) true)

        down-button-enabled? (when (and (:id (get-apprentice (- num-of-sith 1)))
                                        (not (obi-wan-on-sith-planet?))) true)]
    [:div {:class "app-container"}
     [:div {:class "css-root"}
      [:h1 {:class "css-planet-monitor"} "Obi-Wan currently on " (get @obi-wan-location "name")]
      [:section {:class "css-scrollable-list"}
       [:ul {:class "css-slots"}
        (doall (for [[sith id] (partition 2
                                          (interleave
                                            (take num-of-sith @sith-list)
                                            (map #(str "gen_id_" %) (range num-of-sith))))]
                 (single-sith sith id)))]
       [:div {:class "css-scroll-buttons"}
        [:button {:class    (str "css-button-up" (when-not up-button-enabled? " css-button-disabled"))
                  :on-click #(do (.preventDefault %)
                                 (when up-button-enabled?
                                   (stop-fetching-for! (take-last num-of-steps @sith-list))
                                   (reset! sith-list (nil-to-start @sith-list num-of-sith num-of-steps))))}]
        [:button {:class    (str "css-button-down" (when-not down-button-enabled? " css-button-disabled"))
                  :on-click #(do (.preventDefault %)
                                 (when down-button-enabled?
                                   (stop-fetching-for! (take num-of-steps @sith-list))
                                   (reset! sith-list (nil-to-end @sith-list num-of-sith num-of-steps))))}]]]]]))

(reagent/render-component [main-view]
                          (. js/document (getElementById "app")))

(ws/start-websocket! obi-wan-location)
(run! (when (empty? (remove nil? @sith-list)) (r/get-sith! 3616)))