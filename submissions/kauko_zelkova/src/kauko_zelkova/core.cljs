(ns ^:figwheel-always kauko-zelkova.core
    (:require
        [reagent.core :refer [atom] :as reagent]
        [kauko-zelkova.requests :as r]
        [kauko-zelkova.websockets :as ws]))

(enable-console-print!)

(println "Edits to this text should show up in your developer console.")

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))

(defn main-view []
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

(reagent/render-component [main-view]
                          (. js/document (getElementById "app")))


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)

