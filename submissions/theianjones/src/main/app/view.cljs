(ns app.view
  (:require [com.fulcrologic.fulcro.application :as app]
            [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.mutations :as m :refer [defmutation]]
            [com.fulcrologic.fulcro.dom :as dom]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [app.proxy :refer [sith-output]]))

(comment
  we are adding the apprentice/master ident to the [:siths :list/siths] ui edge. Then we fetch the data for that sith. When the data comes back, we display the sith slot.)
;; (defmutation load-sith [{:keys [query-class] :sith/keys [id] :as params}]
;;   (action [{:keys [app state]}]
;;           (swap! state assoc-in [:siths :list/siths] (add-to-list @state id))
;;           (df/load! app [:sith/id id] query-class)))

(comment
  we could just put a df/load into the mutations... you could load from the Sith component. When the mutation is in a cljc file, then you cant import your mutations as well as importing your cljs component into the cljc file... clojure doesnt like you going back and forth like that.
  (df/load! app [:person/id id] PersonDetail))

(comment
  "this is the mutation we use to disable the buttons to load more siths.")
(defmutation set-button [{:keys [button-key button-value]}]
  (action [{:keys [app state]}]
          (swap! state assoc button-key button-value)))


(defn toggle-button-enabled [component value]
  "
This function disables the down button if the apprentice does not exist.
It also disables the up button if the master doesnt exist.
"
  (let [p (comp/props component)
        master-exists? (some? (:sith/master p))
        apprentice-exists? (some? (:sith/apprentice p))]
    (when (not apprentice-exists?)
      (comp/transact! component [(set-button {:button-key :down-enabled :button-value value})]))
    (when (not master-exists?)
      (comp/transact! component [(set-button {:button-key :up-enabled :button-value value})]))))


(comment
  "We want to load the sith and disable any buttons if the data for this sith doesnt have the attributes we are looking for")
(defsc Sith [this {:sith/keys [id name homeWorld] :as props}]
  {:query [:sith/id :sith/name :sith/master :sith/apprentice  {:sith/homeWorld [:homeWorld/name :homeWorld/id]}]
   :ident :sith/id
   :componentDidMount #(toggle-button-enabled % false)
   :componentWillUnmount #(toggle-button-enabled % true)}
  (dom/div
   (dom/h3 name)
   (dom/h6 "Homeworld: "
           (dom/span (:homeWorld/name homeWorld)))))


(def ui-sith
  "we can define what attribute we want react to use as a key if we are mapping over a list with this component."
  (comp/factory Sith {:keyfn :sith/id}))


(defn load-sith [query-component component where id]
  "
We pass the query-component so that this function doesnt have to live in this file.
The second argument is the component we are loading the sith from.
It takes which slot to target when the data loads as the third argument.
This function will create the sith ident from the id in the fourth argument."
  (let [load-target [:slot/by-id where :slot/sith]
        sith-ident [:sith/id id]]
    (df/load! component sith-ident query-component {:target load-target :abort-id :jedi})))


(comment
  "This is component does a lot of the heavy lifting. We can target each of these component slots to load a sith into that slot. When the component mounts, We load the apprentice in the slot below this slot (if it exists) and we load the master in the slot above (if it exists). This assumes that the slot is empty.")
(defsc SithSlot [this {:db/keys [id] :slot/keys [sith] :as props} {:keys [at-home?]}]
  {:query [:db/id {:slot/sith (comp/get-query Sith)}]
   :initial-state (fn [{:keys [id]}] {:db/id id :slot/sith nil})
   :ident [:slot/by-id :db/id]
   :componentDidUpdate (fn [this prev-props _]
                         (let [p (comp/props this)
                               at-home? (:at-home? (comp/get-computed this))
                               app-id (-> p :slot/sith :sith/apprentice)
                               app-target (:app-target (comp/get-computed this))
                               mas-id (-> p :slot/sith :sith/master)
                               mas-target (:mas-target (comp/get-computed this))]
                           (when (and app-id app-target)
                             (load-sith Sith this app-target app-id))
                           (when (and mas-id mas-target)
                             (load-sith Sith this mas-target mas-id))))}
  (dom/li :.css-slot {:className (if at-home? "red" "")}
          (when (some? sith)
            (ui-sith sith))))

(def ui-slot (comp/factory SithSlot {:keyfn :db/id}))

(defn slot->app-target [slot-id]
  "given a slot id (:one :two :three etc) we add one to that slot for an apprentice"
  (slot-id {:one :two
            :two :three
            :three :four
            :four :five}))

(defn slot->mas-target [slot-id]
  "given a slot id (:one :two :three etc) we subtract one to that slot number for their master"
  (slot-id {:two :one
            :three :two
            :four :three
            :five :four}))

(defn target-occupied? [slots-data slot-id]
  "determines if the give slot is currently empty"
  (reduce (fn [target-occupied? [id val]]
            (if (= (:db/id val) slot-id)
              (some? (:slot/sith val))
              target-occupied?))
          false
          slots-data))

(defn slot-at-home? [slots slot-id current-planet]
  "determines if the current planet and the sith's homeworld in a give slot match"
  (reduce (fn [at-home? [_ val]]
            (if (= (:db/id val) slot-id)
              (= (-> val :slot/sith :sith/homeWorld :homeWorld/name) current-planet)
              at-home?))
          false
          slots))


(defn get-slot-props [component slot-id]
  "generates the props so that the SithSlot component can load their master or apprentice correctly. For example, this function will return an app-target for a given slot if that :slot/sith has a :sith/apprentice and the slot below it is not occupied. This way the SithSlot component knows to load a sith purely based on the presence of the app-target or mas-target."
  (let [props (comp/props component)
        current-planet (comp/get-computed component :current-planet)
        app-target (slot->app-target slot-id)
        app-target-occupied? (not (target-occupied? props app-target))
        mas-target (slot->mas-target slot-id)
        mas-target-occupied? (not (target-occupied? props mas-target))]
    {:app-target (and app-target-occupied? app-target)
     :mas-target (and mas-target-occupied? mas-target)
     :at-home? (slot-at-home? props slot-id current-planet)}))

(defn set-both-buttons [component value]
  (comp/transact! component [(set-button {:button-key :down-enabled :button-value value})
                             (set-button {:button-key :up-enabled :button-value value})]))

(defn compact [col]
  (remove nil? col))


(defn slots->siths [slots]
  (compact (map (fn [[_ slot]] (:slot/sith slot)) slots)))


(defn all-sith-have-attr? [siths attr]
  (reduce (fn [master-or-appr-missing? sith]
            (or master-or-appr-missing? (not (some? (attr sith)))))
          false
          siths))
(def x [{:sith/id 3616, :sith/name "Darth Sidious", :sith/master 2350, :sith/apprentice 1489, :sith/homeWorld {:homeWorld/name "Naboo", :homeWorld/id 7}} {:sith/id 1489, :sith/name "Darth Vader", :sith/master 3616, :sith/apprentice 1330, :sith/homeWorld {:homeWorld/name "Tatooine", :homeWorld/id 18}} {:sith/id 1330, :sith/name "Antinnis Tremayne", :sith/master 1489, :sith/homeWorld {:homeWorld/name "Coruscant", :homeWorld/id 58}}])

(all-sith-have-attr? x :sith/apprentice)

(defn update-buttons [component]
  (let [props (comp/props component)
        computed (comp/get-computed component)
        current-planet (:current-planet computed)
        siths (slots->siths props)
        sith-at-home-detected? (reduce
                                (fn [detected-at-home? {:sith/keys [homeWorld]}]
                                  (or (= (:homeWorld/name homeWorld) current-planet) detected-at-home?))
                                false
                                siths)
        master-missing? (all-sith-have-attr? siths :sith/master)
        appr-missing? (all-sith-have-attr? siths :sith/apprentice)]
    (if sith-at-home-detected?
      (do ;; (app/abort! component :jedi) pathom remote doesnt support aborting requests
        (set-both-buttons component false))
      (comp/transact! component [(set-button {:button-key :down-enabled :button-value (not appr-missing?)})
                                 (set-button {:button-key :up-enabled :button-value (not master-missing?)})]))))

(defsc SithList [this {:slot/keys [one two three four five] :as props}]
    {:query [{:slot/one (comp/get-query SithSlot)}
             {:slot/two (comp/get-query SithSlot)}
             {:slot/three (comp/get-query SithSlot)}
             {:slot/four (comp/get-query SithSlot)}
             {:slot/five (comp/get-query SithSlot)}]
     :initial-state (fn [_] {:slot/one (comp/get-initial-state SithSlot {:id :one})
                             :slot/two (comp/get-initial-state SithSlot {:id :two})
                             :slot/three (comp/get-initial-state SithSlot {:id :three})
                             :slot/four (comp/get-initial-state SithSlot {:id :four})
                             :slot/five (comp/get-initial-state SithSlot {:id :five})})
     :ident (fn [] [:LIST :only-one])
     :componentDidUpdate (fn [this _ _] (update-buttons this))}
    (dom/ul :.css-slots
            (ui-slot (comp/computed one (get-slot-props this :one)))
            (ui-slot (comp/computed two (get-slot-props this :two)))
            (ui-slot (comp/computed three (get-slot-props this :three)))
            (ui-slot (comp/computed four (get-slot-props this :four)))
            (ui-slot (comp/computed five (get-slot-props this :five)))))

(def ui-sith-list (comp/factory SithList {:keyfn :db/id}))

(defn merge-ident [slot new-ident]
  (merge slot {:slot/sith new-ident}))

(defmutation navigate-up [_]
  (action [{:keys [app state]}]
          (let [old-slots (:slot/by-id @state)
                new-slot-one (merge-ident (:one old-slots) nil)
                new-slot-two (merge-ident (:two old-slots) nil)
                new-slot-three (merge-ident (:three old-slots) (-> old-slots :one :slot/sith))
                new-slot-four (merge-ident (:four old-slots) (-> old-slots :two :slot/sith))
                new-slot-five (merge-ident (:five old-slots) (-> old-slots :three :slot/sith))
                new-slots {:one new-slot-one :two new-slot-two :three new-slot-three :four new-slot-four :five new-slot-five}]
            (swap! state assoc :slot/by-id new-slots))))

(defmutation navigate-down [_]
  (action [{:keys [app state]}]
          (let [old-slots (:slot/by-id @state)
                new-slot-one (merge-ident (:one old-slots) (-> old-slots :three :slot/sith))
                new-slot-two (merge-ident (:two old-slots) (-> old-slots :four :slot/sith))
                new-slot-three (merge-ident (:three old-slots) (-> old-slots :five :slot/sith))
                new-slot-four (merge-ident (:four old-slots) nil)
                new-slot-five (merge-ident (:five old-slots) nil)
                new-slots {:one new-slot-one :two new-slot-two :three new-slot-three :four new-slot-four :five new-slot-five}]
            (swap! state assoc :slot/by-id new-slots))))

(defmutation set-current-planet [{:keys [planet]}]
  (action [{:keys [app state]}]
          (swap! state assoc :current-planet planet)))

(defsc Root [this {:keys [root/list up-enabled down-enabled current-planet] :as props}]
  {:query [{:root/list (comp/get-query SithList)} :up-enabled :down-enabled {:current-planet [:id :name]}]
   :initial-state (fn [params] {:root/list (comp/get-initial-state SithList {})
                                :up-enabled true
                                :down-enabled true
                                :current-planet {:id 32, :name "Utapau"}})}
  (dom/div :.css-root
           (dom/h1 :.css-planet-monitor "Obi-Wan currently on: "
                   (dom/span (:name current-planet)))
           (dom/section :.css-scrollable-list
                        (ui-sith-list (comp/computed list {:current-planet (:name current-planet)}))
                        (dom/div :.css-scroll-buttons
                                 (dom/button :.css-button-up {:className (if up-enabled "" "css-button-disabled")
                                                              :disabled (not update-in)
                                                              :onClick #(when up-enabled
                                                                          (comp/transact! this [(navigate-up)]))})
                                 (dom/button :.css-button-down {:className (if down-enabled "" "css-button-disabled")
                                                                :disabled (not down-enabled)
                                                                :onClick #(when down-enabled
                                                                            (comp/transact! this [(navigate-down)]))})))))

(comment
  (comp/get-initial-state Sith {:sith/id 3616 :sith/name "Darth"})
  df/marker-table can be used to keep track of loading states
  merge/remove-ident*)
