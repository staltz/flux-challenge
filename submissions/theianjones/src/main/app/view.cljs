(ns app.view
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.dom :as dom]
            [app.proxy :refer [sith-output]]))

(defsc Sith [this {:sith/keys [id name homeWorld] :as props}]
  {:query [:sith/id :sith/name :sith/master :sith/apprentice {:sith/homeWorld [:homeWorld/name :homeWorld/id]}]
   :ident :sith/id}
  (dom/li :.css-slot
          (dom/h3 name)
          (dom/h6 "Homeworld: "
                  (dom/span (:homeWorld/name homeWorld)))))

(def ui-sith (comp/factory Sith {:keyfn :sith/id}))

(defsc SithList [this {:list/keys [siths] :as props}]
  {:query [:list/id {:list/siths (comp/get-query Sith)}]
   :ident (fn [] [:list/id (:list/id props)])}
  (prn siths props)
  (dom/ul :.css-slots
          (map ui-sith siths)))

(def ui-sith-list (comp/factory SithList))

(defsc Root [this {:keys [siths]}]
  {:query [{:siths (comp/get-query SithList)}]}
  (dom/div :.css-root
           (dom/h1 :.css-planet-monitor "Obi-Wan curently on: "
                   (dom/span "Earth"))
           (dom/section :.css-scrollable-list
                        (ui-sith-list siths)
                        (dom/div :.css-scroll-buttons
                                 (dom/button :.css-button-up)
                                 (dom/button :.css-button-down)))))

(comment
  (comp/get-initial-state Sith {:sith/id 3616 :sith/name "Darth"}))
