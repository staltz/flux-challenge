(ns ^:figwheel-always kauko-zelkova.core
  (:require
    [reagent.core :refer [atom] :as reagent]
    [jamesmacaulay.zelkova.signal :as z]
    [jamesmacaulay.zelkova.impl.signal :as zimpl]
    [cljs.core.async :as async]

    [kauko-zelkova.requests :as r]
    [kauko-zelkova.websockets :as ws])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(enable-console-print!)

(def num-of-sith 5)
(def num-of-steps 2)

;;; MODEL ;;;

(def state-pending :pending)
(def state-empty :empty)
(def state-sith :sith)

(defn empty-slot [id]
  {:id (str "gen_id_" id) :state state-empty :body nil})

(defn is-empty-slot? [slot]
  (= (:state slot) state-empty))

(defn pending-request-slot [id request]
  {:id id :state state-pending :body request})

(defn sith-slot [sith]
  {:id (:id sith) :state state-sith :body sith})

(def empty-model {:sith             (assoc
                                      (mapv empty-slot (range num-of-sith))
                                      (rand-int num-of-sith)
                                      (pending-request-slot 3616 (r/get-sith! 3616)))
                  :obi-wan-location nil})

(def local-storage-key "kauko-zelkova-flux-challenge-state")

(defn get-state []
  (let [data (.getItem js/localStorage local-storage-key)]
    (when-not (nil? data)
      (-> data (js/JSON.parse) (js->clj :keywordize-keys true)))))

(def initial-model empty-model #_(or (get-state) empty-model)) ;; ;; Get state from localstorage. Not useful during dev.

(defn get-index-for-sith
  "Finds a sith that has <id> as apprentice or master, and returns its index+1 if the former, and
  index-1 if the latter."
  [list id]
  (let [with-indices (keep-indexed identity list)]
    (print with-indices)
    (or
      (some
        (fn [[index sith]]
          (when (= (get-in sith [:body :master :id]) id)
            (- index 1)))
        with-indices)

      (some
        (fn [[index sith]]
          (when (= (get-in sith [:body :apprentice :id]) id)
            (+ index 1)))
        with-indices)

      (rand-int num-of-sith))))

;;; UPDATE ;;;

(declare updates)

(defn send-action!
  [f & args]
  (async/put! updates (fn [model] (apply f model args))))

(defn move-list-up [model]
  (let [old (:sith model)
        changed (vec (take-last num-of-sith (concat old (repeat num-of-steps empty-slot))))]
    (assoc model :sith changed)))

(defn move-list-down [model]
  (let [old (:sith model)
        changed (vec (take num-of-sith (concat (repeat num-of-steps empty-slot) old)))]
    (assoc model :sith changed)))

(defn request-sith [model id]
  (let [request (r/get-sith! id)]
    (go (let [result (async/<! request)]
          ))
    (assoc-in model [:sith (get-index-for-sith (:sith model) id)] (pending-request-slot id request))))

;;; VIEW ;;;

(defn up-button [model obi-wan-location]
  (let [enabled? (and
                   (:id (get-in model [:sith 0 :body :apprentice]))
                   (not (some #(= (get-in % [:body :homeworld :name]) obi-wan-location) (:sith model))))]
    [:button.css-button-up
     {:on-click #(send-action! move-list-up model)
      :class    (str "css-button-up" (when-not enabled? " css-button-disabled"))}]))

(defn down-button [model obi-wan-location]
  (let [enabled? (and
                   (:id (get-in model [:sith (- 1 num-of-sith) :body :master]))
                   (not (some #(= (get-in % [:body :homeworld :name]) obi-wan-location) (:sith model))))]
    [:button.css-button-down
     {:on-click #(send-action! move-list-down model)
      :class    (str "css-button-down" (when-not enabled? " css-button-disabled"))}]))

(defn sith-slot-component [thing obi-wan-location]
  (let [sith (:body thing)
        homeworld (get-in sith [:homeworld :name])]
    [:li (cond-> {:class "css-slot"}
                 (= homeworld obi-wan-location) (merge {:style {:color "red"}}))
     [:h3 (:name sith)]
     [:h6 homeworld]]))

(defn empty-slot-component []
  [:li {:class "css-slot"}])

(defn sith-slots-component [slots obi-wan-location]
  [:ul.css-slots
   (doall (for [thing slots]
            (if (= (:state thing) state-sith)
              ^{:key (:id thing)}
              [sith-slot-component thing obi-wan-location]

              ^{:key (:id thing)}
              [empty-slot-component])))])

(defn obi-wan-location-component [obi-wan-location]
  [:h1.css-planet-monitor (str "Obi-Wan currently on " (or obi-wan-location "..."))])

(defn main-view [model]
  (let [obi (get-in model [:obi-wan-location :name])
        last-full-slot (last (remove is-empty-slot? (:sith model)))
        first-full-slot (first (remove is-empty-slot? (:sith model)))]

    ;; When there's space at the end of the list AND the last non-empty slot is not pending, request a sith.
    (when (and (= state-sith (:state last-full-slot)) (= state-empty (last (:sith model))))
      (send-action! request-sith model (get-in last-full-slot [:body :apprentice :id])))

    (when (and (= state-sith (:state first-full-slot)) (= state-empty (first (:sith model))))
      (send-action! request-sith model (get-in first-full-slot [:body :apprentice :id])))

    [:div.app-container
     [:div.css-root
      (print (pr-str model))
      [obi-wan-location-component obi]
      [:section.css-scrollable-list
       [sith-slots-component (:sith model) obi]
       [:div.css-scroll-buttons
        [up-button model obi]
        [down-button model obi]]]]]))

;;; INPUTS ;;;

(def updates (async/chan))

(def model (z/foldp (fn [action state] (action state))
                    initial-model
                    (z/input identity ::updates updates)))

(defn store-state!
  [model]
  (let [data (-> model (clj->js) (js/JSON.stringify))]
    (.setItem js/localStorage local-storage-key data)))

(def main-signal (z/map (fn [m]
                          ; (store-state! m) ;; Store state to localstorage. Not useful during dev.
                          (main-view m))
                        model))

(def dom-atom
  (let [live-graph (z/spawn main-signal)]
    (z/pipe-to-atom live-graph
                    (atom (zimpl/init live-graph)))))

(defn root-component [] @dom-atom)


;;; Initialize the app ;;;
(reagent/render-component [root-component]
                          (. js/document (getElementById "app")))