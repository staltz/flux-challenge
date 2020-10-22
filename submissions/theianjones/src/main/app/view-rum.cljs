(ns app.rum.view)
;   (:require
;     [rum.core :as rum]))

; (rum/defc sith-li < {:key-fn (fn [{:sith/keys [id]}]
;                                (str "sith-" id))}
;           [{:keys [sith]}]
;           [:li.css-slot {:className (when (:at-home sith) 'red')}
;            [:h3 (:name sith)]
;            [:h6 "Home world: "
;             [:span (-> sith :homeWorld :name)]]])

; (defn merge-at-home [sith currentPlanet]
;   (merge sith
;          {:at-home
;           (= (:name currentPlanet)
;              (-> sith :homeWorld :name))}))

; (rum/defc sith-lists [{:list/keys [siths]} {:keys [currentPlanet]}]
;           [:ul.css-slots
;            (map (fn [sith] (sith-li
;                             {:sith (merge-at-home sith currentPlanet)})) siths)])


; (rum/defc app []
;           [:div.css-root
;            [:h1.css-planet-monitor "Obi-Want currently on: "
;             [:span "Earth"]]
;            [:section.css-scrollable-list
;             (sith-lists {:list/siths [{:id 1 :name "Yoda" :homeWorld {:name "Earth"}}]})
;             [:div.css-scroll-buttons
;              [:button.css-button-up]
;              [:button.css-button-down]]]])
