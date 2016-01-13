(ns decoursin.db
  (:require [reagent.core :as reagent]
            [schema.core :as s]
            [cljs.core.async.impl.channels :refer [ManyToManyChannel]]
            [decoursin.deque :refer [new-deque set-default-in-deque!
                                     IDeque ISith]]))

;;;;;;;;;;;;;;;;;;;;;;;;; Schemas

(def Direction (s/enum :up :down))

(def Sith {:id s/Num
           (s/optional-key :direction) (s/maybe Direction)
           :name s/Str
           (s/optional-key :obi-wan-is-here) s/Bool
           :homeworld {:name s/Str :id s/Num}
           :master {:url (s/maybe s/Str) :id (s/maybe s/Num)}
           :apprentice {:url (s/maybe s/Str) :id (s/maybe s/Num)}})

(def Siths (s/conditional #(implements? IDeque %) [Sith]))

(def Planet {:id s/Num, :name s/Str})

(def Requests {:up   {:id (s/maybe s/Num)
                      :channel (s/maybe ManyToManyChannel)}
               :down {:id (s/maybe s/Num)
                      :channel (s/maybe ManyToManyChannel)}})

(def schema {:siths Siths
             :requests Requests
             :planet Planet})

;;;;;;;;;;;;;;;;;;;;;;;; Public

(defn blank-sith-template []
  {:id -1
   :direction nil
   :name ""
   :obi-wan-is-here false
   :homeworld {:name "", :id -1}
   :master {:url "", :id -1}
   :apprentice {:url "", :id -1}})

(set-default-in-deque! (blank-sith-template))

(def ^:private v (into [] (repeat 5 (blank-sith-template))))
(def ^:private siths (new-deque v))

(defn blank-requests-map []
  {:up {:id -1 :channel nil}, :down {:id -1 :channel nil}})

(def app-db
  {:siths siths
   ;; requests or better name "pending-requests" since *only* pending requests
   ;; are found here.
   :requests (blank-requests-map)
   :planet {:id -1, :name ""}})
