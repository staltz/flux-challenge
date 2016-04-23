(ns ui-of-the-sith.util
  (:require [om.next :as om :refer-macros [defui]]
            [ui-of-the-sith.config :as cfg]))

(defn create-master-of
  [apprentice]
    {:sith/id (om/tempid)
     :sith/name nil
     :sith/homeworld nil
     :sith/master-id nil
     :sith/apprentice-id (apprentice :sith/id)
     :sith/remote-id (apprentice :sith/master-remote-id)
     :sith/master-remote-id nil
     :sith/apprentice-remote-id (apprentice :sith/remote-id)})

(defn create-apprentice-of
  [master]
    {:sith/id (om/tempid)  
     :sith/name nil
     :sith/homeworld nil
     :sith/master-id (master :sith/id)
     :sith/apprentice-id nil
     :sith/remote-id (master :sith/apprentice-remote-id)
     :sith/master-remote-id (master :sith/remote-id)
     :sith/apprentice-remote-id nil})

(defn append-apprentice-to [siths]
  (let [last-master (last siths)
        apprentice (create-apprentice-of last-master)
        siths' (assoc-in siths [(- (count siths) 1) :sith/apprentice-id] (apprentice :sith/id))]
        (into [] (conj siths' apprentice))))

(defn prepend-master-to [siths]
  (let [first-apprentice (first siths)
        master (create-master-of first-apprentice)
        siths' (assoc-in siths [0 :sith/master-id] (master :sith/id))]
        (into [] (cons master siths'))))

(defn fill-siths [relationship siths]
  (let [fill-count (- cfg/list-size (count siths))
        fill-function (condp = relationship
                        :master prepend-master-to 
                        :apprentice append-apprentice-to)]
    (reduce (fn [siths' _] (fill-function siths'))
            siths
            (range fill-count))))

(defn index-of [coll v]
  (let [i (count (take-while #(not= v %) coll))]
    (when (or (< i (count coll))
              (= v (last coll)))
          i)))
