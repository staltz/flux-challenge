(ns app.view
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.mutations :as m :refer [defmutation]]
            [com.fulcrologic.fulcro.dom :as dom]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [app.proxy :refer [sith-output]]))

;(defmutation load-sith [{:sith/keys [id]}]
;  (remote [env] (m/with-params env {[:sith/id id] sith-output})))

(defn sith-list-path [k] [:siths])

(defn add-to-list [list id]
  (vec (concat (-> list :siths :list/siths) [[:sith/id id]])))

(comment
  we are adding the apprentice/master ident to the [:siths :list/siths] ui edge. Then we fetch the data for that sith. When the data comes back, we display the sith slot.)
(defmutation load-sith [{:keys [query-class] :sith/keys [id] :as params}]
  (action [{:keys [app state]}]
          (swap! state assoc-in [:siths :list/siths] (add-to-list @state id))
          (df/load! app [:sith/id id] query-class)))

(comment
  we could just put a df/load into the mutations... you could load from the Sith component. When the mutation is in a cljc file, then you cant import your mutations as well as importing your cljs component into the cljc file... clojure doesnt like you going back and forth like that.
  (df/load! app [:person/id id] PersonDetail))

(def sith-slot-limit 5)

(defn load-siblings [component]
  (let [component-props (comp/props component)
        master-id (:sith/master component-props)
        load-master? (:load-master? (comp/get-computed component))
        apprentice-id (:sith/apprentice component-props)
        load-apprentice? (:load-apprentice? (comp/get-computed component))]
    (when (and load-apprentice? apprentice-id)
      (comp/transact! component [(load-sith {:query-class (comp/get-class component)
                                        :sith/id apprentice-id})]))
    (when (and load-master? master-id)
      (comp/transact! component [(load-sith {:query-class (comp/get-class component)
                                        :sith/id master-id})]))))

(defsc Sith [this {:sith/keys [id name homeWorld] :as props}]
  {:query [:db/id :sith/id :sith/name :sith/master :sith/apprentice  {:sith/homeWorld [:homeWorld/name :homeWorld/id]}]
   :ident [:sith/id :db/id]
   :initial-state (fn [{:keys [id]}] {:db/id id })
   :componentDidMount (fn [this] (load-siblings this))}
  (dom/li :.css-slot
          (when (some? name)
            (dom/div
             (dom/h3 name)
             (dom/h6 "Homeworld: "
                     (dom/span (:homeWorld/name homeWorld)))))))

(def ui-sith (comp/factory Sith {:keyfn :sith/id}))

(defsc SithSlot [this {:keys [db/id slot/sith] :as props}]
  (dom/li :.css-slot
          (when (:name sith)
            (ui-sith sith))))

(defn e-or-n? [obj]
  (or (nil? obj) (empty? obj)))

(defsc SithList [this {:list/keys [siths] :as props}]
  {:query [:list/id {:list/siths (comp/get-query Sith)}]
   :ident (fn [] [:list/id (:list/id props)])
   :initial-state {:list/siths []}}
  (let [[sith-0 sith-1 sith-2 sith-3 sith-4] siths]
    (dom/ul :.css-slots
            (prn sith-0 sith-1 sith-2 sith-3 sith-4)
            (ui-sith (comp/computed sith-0 {:load-apprentice? (e-or-n? sith-1)}))
            (ui-sith (comp/computed sith-1 {:load-apprentice? (e-or-n? sith-2) :load-master? (e-or-n? sith-0)}))
            (ui-sith (comp/computed sith-2 {:load-apprentice? (e-or-n? sith-3) :load-master? (e-or-n? sith-1)}))
            (ui-sith (comp/computed sith-3 {:load-apprentice? (e-or-n? sith-4) :load-master? (e-or-n? sith-2)}))
            (ui-sith (comp/computed sith-4 {:load-master? (nil? sith-3)})))))

(def ui-sith-list (comp/factory SithList))

(defn more-attr? [{:list/keys [siths] :keys [attr]}]
  (reduce (fn [some-apprentice? current-sith]
            (and some-apprentice? (some? (attr current-sith)))) siths))

(defn move-up [state]
  (let [siths-list (-> state :siths :list/siths)
        _ (prn "move-up" sith-list state)
        master (:sith/master (first siths-list))]
    (vec (concat [nil [:sith/id master]] siths-list))))

(defmutation navigate-up [_]
  (action [{:keys [app state]}]
          (swap! state assoc-in [:siths :list/siths] (move-up @state))))

(defsc Root [this {:keys [siths] :as props}]
  {:query [{:siths (comp/get-query SithList)}]}
  (dom/div :.css-root
           (dom/h1 :.css-planet-monitor "Obi-Wan currently on: "
                   (dom/span "Earth"))
           (dom/section :.css-scrollable-list
                        (ui-sith-list siths)
                        (dom/div :.css-scroll-buttons
                                 (dom/button :.css-button-up {:className (if (more-attr? (merge siths {:attr :sith/master}))
                                                                           ""
                                                                           "css-button-disabled")
                                                              :onClick #(comp/transact! this [(navigate-up)])})
                                 (dom/button :.css-button-down {:className (if (more-attr? (merge siths {:attr :sith/apprentice}))
                                                                             ""
                                                                             "css-button-disabled")})))))

(comment
  (comp/get-initial-state Sith {:sith/id 3616 :sith/name "Darth"})
  df/marker-table can be used to keep track of loading states
  merge/remove-ident*)
