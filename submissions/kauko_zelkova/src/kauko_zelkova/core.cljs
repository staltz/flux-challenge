(ns ^:figwheel-always kauko-zelkova.core
  (:require
    [reagent.core :refer [atom] :as reagent]
    [jamesmacaulay.zelkova.signal :as z]
    [jamesmacaulay.zelkova.impl.signal :as zimpl]
    [cljs.core.async :as async]

    [kauko-zelkova.requests :as r]
    [kauko-zelkova.websockets :as ws]))

(enable-console-print!)

(def num-of-sith 5)
(def num-of-steps 2)

;;; MODEL ;;;

(def state-pending :pending)
(def state-empty :empty)
(def state-sith :sith)

(defn empty-slot [id]
  {:id (str "gen_id_" id) :state state-empty :body nil})

(defn pending-request-slot [id request]
  {:id id :state state-pending :body request})

(defn sith-slot [sith]
  {:id (:id sith) :state state-sith :body sith})

(def empty-model {:sith             (mapv empty-slot (range num-of-sith))
                  :obi-wan-location nil})

(def local-storage-key "kauko-zelkova-flux-challenge-state")

(defn get-state []
  (let [data (.getItem js/localStorage local-storage-key)]
    (when-not (nil? data)
      (-> data (js/JSON.parse) (js->clj :keywordize-keys true)))))

(def initial-model empty-model #_(or (get-state) empty-model)) ;; ;; Get state from localstorage. Not useful during dev.

;;; UPDATE ;;;

(declare updates)

(defn send-action!
  [f & args]
  (async/put! updates (fn [model] (apply f model args))))


;;; VIEW ;;;

(defn sith-slot-component [thing obi-wan-location]
  (let [sith (:body thing)
        homeworld (get-in sith [:homeworld :name])]
    [:li (cond-> {:class "css-slot"}
                 (= homeworld obi-wan-location) (merge {:style {:color "red"}}))
     [:h3 (:name sith)]
     [:h6 homeworld]]))

(defn empty-slot-component [thing]
  [:li {:class "css-slot"}])

(defn sith-slots-component [slots obi]
  (let [obi-wan-location (get obi "name")]
    [:ul.css-slots
     (doall (for [thing slots]
                (if (= (:state thing) state-sith)
                  ^{:key (:id thing)}
                  [sith-slot-component thing obi-wan-location]

                  ^{:key (:id thing)}
                  [empty-slot-component thing])))]))

(defn obi-wan-location-component [obi-wan-location]
  [:h1.css-planet-monitor (str "Obi-Wan currently on " (or (get obi-wan-location "name") "..."))])

(defn main-view [model]
  [:div.app-container
   [:div.css-root
    (print (pr-str model))
    [obi-wan-location-component (:obi-wan-location model)]
    [:section.css-scrollable-list
     [sith-slots-component (:sith model) (:obi-wan-location model)]
     [:div.css-scroll-buttons
      [:button.css-button-up]
      [:button.css-button-down]]]]])

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