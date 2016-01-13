(ns decoursin.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [decoursin.deque :refer [new-deque]]
            [re-frame.core :as re-frame]
            [schema.core :as s]))


(re-frame/register-sub
 :siths
 (fn [db [_]]
   (reaction (:siths @db))))

(re-frame/register-sub
 :planet
 (fn [db [_]]
   (reaction (:planet @db))))

;;;;;;;;;;;;;;;;;;;;;;;;;; disable up/down buttons

(defn- is-a-sith?
  "if the sith's :name is not the empty string,
   then s/he is a sith"
  [sith]
  (not (empty? (:name sith))))

(defn- has-no-apprentice?
  "Does this sith have an apprentice? The bottom most one doesn't"
  [sith]
  (nil? (get-in sith [:apprentice :id])))

(defn- has-no-master?
  "Does this sith a have a master? The top most one doesn't"
  [sith]
  (nil? (get-in sith [:master :id])))

(def ^:private sith-without-apprentice? (fn [sith] (and (is-a-sith? sith) (has-no-apprentice? sith))))
(def ^:private sith-without-master? (fn [sith] (and (is-a-sith? sith) (has-no-master? sith))))

(re-frame/register-sub
 :disable-up-button?
 (fn [db [_]]
   (reaction
    (let [siths (:siths @db)]
      (boolean (or (some sith-without-apprentice? siths)
                   (some :obi-wan-is-here siths)))))))

(re-frame/register-sub
 :disable-down-button?
 (fn [db [_]]
   (reaction
    (let [siths (:siths @db)]
      (boolean (or (some sith-without-master? siths)
                   (some :obi-wan-is-here siths)))))))
