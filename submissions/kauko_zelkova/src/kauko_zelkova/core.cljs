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

(defn new-sith-request [id request]
  {id {:ready? false :body request}})

(def empty-model {:sith (into [] (take num-of-sith (repeat nil)))
                  :obi-wan-location nil})

(def local-storage-key "kauko-zelkova-flux-challenge-state")

(defn get-state []
  (let [data (.getItem js/localStorage local-storage-key)]
    (when-not (nil? data)
      (-> data (js/JSON.parse) (js->clj :keywordize-keys true)))))

(def initial-model (or (get-state) empty-model))

;;; UPDATE ;;;

(declare updates)

(defn send-action!
  [f & args]
  (async/put! updates (fn [model] (apply f model args))))


;;; VIEW ;;;

(defn main-view [model]
  [:div.app-container
   [:div.css-root
    [:h1.css-planet-monitor "Obi-Wan currently on Tatooine"]
    [:section.css-scrollable-list
     [:ul.css-slots
      [:li.css-slot [:h3 "Jorak Uln"] [:h6 "Homeworld: Korriban"]]
      [:li.css-slot [:h3 "Skere Kaan"] [:h6 "Homeworld: Coruscant"]]
      [:li.css-slot [:h3 "Na'daz"] [:h6 "Homeworld: Ryloth"]]
      [:li.css-slot [:h3 "Kas'im"] [:h6 "Homeworld: Nal Hutta"]]
      [:li.css-slot [:h3 "Darth Bane"] [:h6 "Homeworld: Apatros"]]]
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