(ns ui-of-the-sith.parser
  (:require [om.next :as om]
            [ui-of-the-sith.scrollable-list :as sl]
            [ui-of-the-sith.config :as cfg]
            [ui-of-the-sith.util :as u]))

;; =============================================================================
;; Reads

(defmulti read 
  (fn [env key params]
    key))

(defmethod read :default
  [{:keys [state] :as env} key params]
  (let [st @state]
    (if-let [value (get-in st key)]
      {:value value}
      {:value :not-found})))

(defn get-siths
  [state key]
  ; (get st key) - this is being called with key of :siths/list and is getting the
  ; now normalized array of siths/by-id references
  ; the get-in st % function is being called with [:siths/by-id <<id>>] which is
  ; the `table` of normalized data in the state!
  ; i.e. the original denormalized list has been converted to a list of references
  ; that can be passed directly to get-in st
  (let [st @state]
    (into [] (map #(get-in st %)) (get st key))))

(defmethod read :obi-wan-planet
  [{:keys [state] :as env} key params]
    (let [[_ v] (find @state key)]
      {:value v}))

(defmethod read :siths/list
  [{:keys [state] :as env} key params]
  {:value (get-siths state key)})

;; =============================================================================
;; Mutations

(defmulti mutate om/dispatch)

(defmethod mutate :default
  [_ _ _] {:value :not-found})
   
(defmethod mutate 'obi-wan-planet/update
  [{:keys [state] :as env} key {:keys [planet-name] :as params}]
    {:value {:keys :obi-wan-planet}
     :action #(swap! state assoc :obi-wan-planet planet-name) })

(defmethod mutate 'sith/set-remote-id
  [{:keys [state] :as env} key {:keys [id remote-id] :as params}]
    {:action #(swap! state assoc-in [:siths/by-id id :sith/remote-id] remote-id)
     :value {:keys `[~[:siths/by-id id]]}})

(defmethod mutate 'sith/populate-from-remote
  [{:keys [ast component] :as env} key params]
  (let [ast' (assoc-in ast [:params] (merge params {:component component}))]
    {:dark-jedi-query ast'}))

(defmethod mutate 'siths/scroll
  [{:keys [state component] :as env} key {:keys [index move-to] :as params}]
  (let [sith-query (om/get-query sl/Slot)
        norm-list (:siths/list @state)
        norm-refs {:siths/by-id (:siths/by-id @state)}
        denorm-list (om/db->tree sith-query norm-list norm-refs)
        new-list (condp = move-to
                   :start (u/fill-siths :apprentice (subvec denorm-list index cfg/list-size))
                   :end (u/fill-siths :master (subvec denorm-list 0 (+ 1 index))))
        norm-new-list (om/tree->db component {:siths/list new-list})
        new-refs (meta norm-new-list)]
    {:action #(swap! state 
                     assoc
                     :siths/list (:siths/list norm-new-list)
                     :siths/by-id (:siths/by-id new-refs))}))
