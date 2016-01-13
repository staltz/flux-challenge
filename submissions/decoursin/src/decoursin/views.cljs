(ns decoursin.views
  (:require [decoursin.db :refer [Direction]]
            [reagent.core :as reagent]
            [re-frame.core :as re-frame]))

(defn sith-component
  "Renders the Sith name (ex: Darth Vader) along with
   his homeworld. If we render, check to see if his apprentice
   exlusive or master should also be rendered, determined by
   the direction"
  [sith location]
  (let [this (reagent/current-component)]
    (reagent/create-class
     {:display-name "sith-component"

      :component-did-update
      (fn [this]
        (let [sith (reagent/props this)
              direction (:direction sith)
              [id location] (cond ;; id is either the apprentice or master, depends on direction
                              (and (= :up direction) (<= location 4)) 
                              [(get-in sith [:apprentice :id])
                               (+  1 location)]

                              (and (= :down direction) (>= location 0))
                              [(get-in sith [:master :id])
                               (+  -1 location)])]
          (when (pos? id)
            (re-frame/dispatch [:set-sith id direction location]))))

      :reagent-render
      (fn [{:keys [name homeworld obi-wan-is-here] :as sith}]
        [:li.css-slot
         (when (seq name)
           [:div
            [:h3 (when obi-wan-is-here {:style {:color "red"}})
             name]
            [:h6 (when obi-wan-is-here {:style {:color "red"}})
             (str "Homeworld: " (:name homeworld))]])])})))

(defn main []
  (let [disable-up-button (re-frame/subscribe [:disable-up-button?])
        disable-down-button (re-frame/subscribe [:disable-down-button?])
        siths (re-frame/subscribe [:siths])
        planet (re-frame/subscribe [:planet])]
    (fn []
      [:div.css-root
       [:h1.css-planet-monitor "Obi-Wan currently on " (:name @planet)]
       [:section.css-scrollable-list
        [:ul.css-slots
         ^{:Key (nth @siths 0)} [sith-component (nth @siths 0) 0]
         ^{:Key (nth @siths 1)} [sith-component (nth @siths 1) 1]
         ^{:Key (nth @siths 2)} [sith-component (nth @siths 2) 2]
         ^{:Key (nth @siths 3)} [sith-component (nth @siths 3) 3]
         ^{:Key (nth @siths 4)} [sith-component (nth @siths 4) 4]]
        [:div.css-scroll-buttons
         [:button.css-button-up {:class (when @disable-up-button "css-button-disabled")
                                 :on-click
                                 (fn [e]
                                   (when-not @disable-up-button
                                     (re-frame/dispatch [:button-click :up e])))}]
         [:button.css-button-down {:class (when @disable-down-button "css-button-disabled")
                                   :on-click
                                   (fn [e]
                                     (when-not @disable-down-button
                                       (re-frame/dispatch [:button-click :down e])))}]]]])))
