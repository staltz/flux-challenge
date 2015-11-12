(ns jelz.view
  (:require [re-frame.core :refer [subscribe dispatch]]))

(def txt-danger {:style {:color "red"}})
(def btn-disabled {:class "css-button-disabled" :disabled true})

(defn header []
  (let [planet (subscribe [:planet])
        danger (subscribe [:danger])]
    (fn render-header []
      [:h1.css-planet-monitor
       (when @danger txt-danger)
       (str "Obi-Wan currently on " (:name @planet))])))

(defn single-slot [item]
  (let [danger (subscribe [:danger])]
    (fn render-single-slot [item]
      (if (:id item)
        [:li.css-slot
         (when (= @danger (get-in item [:homeworld :id])) txt-danger)
         [:h3 (:name item)]
         [:h6 (str "Homeworld: " (get-in item [:homeworld :name]))]]
        [:li.css-slot]))))

(defn btn-attrs [kw enabled?]
  (let [base {:on-click #(dispatch [:scroll kw])}]
    (if (kw enabled?) base (merge base btn-disabled))))

(defn buttons []
  (let [enabled? (subscribe [:enabled-buttons])]
    (fn render-buttons []
      [:div.css-scroll-buttons
       [:button.css-button-up (btn-attrs :up @enabled?)]
       [:button.css-button-down (btn-attrs :down @enabled?)]])))

(defn slot-list []
  (let [slots (subscribe [:slots])]
    (fn render-slot-list []
      [:section.css-scrollable-list
       [:ul.css-slots
        (for [item @slots] ^{:key (:req-id item)} [single-slot item])]
       [buttons]])))

(defn layout []
  (let [initialized? (subscribe [:initialized?])]
    (fn render-layout []
      [:div.app-container
       (when @initialized?
         [:div.css-root
          [header]
          [slot-list]])])))
