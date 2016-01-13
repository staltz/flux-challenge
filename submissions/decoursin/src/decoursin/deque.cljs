(ns decoursin.deque
  (:require [schema.core :as s]))

(declare deque)

(defprotocol IDeque
  (-push-front [this a] "push a onto the front")
  (-push-back [this a] "push a onto the back")
  (-pop-front [this] "pop the first element")
  (-pop-back [this] "pop the last element")
  (push-up [this] "push the deque up, removing top, adding default to the bottom")
  (push-down [this] "push the deque down, removing bottom, adding default to top"))
(defprotocol ISith
  (assoc-sith [this k sith] "just assoc, with key validation")
  (in? [this id] "is the sith of this id in this deque? returns boolean")
  (set-direction [this direction] "set the :direction entry for each sith")
  (empty-at-location? [this location] "test whether or not there's a sith at location")
  (count-blanks [this direction] "count how many blanks templates are from the top/bottom")
  (is-empty? [this] "true if all 5 elements are empty")
  (get-first-non-empty-sith [this direction] "first non-empty sith from bottom or top, depending on direction"))

(def ^:private default (atom))

(defn set-default-in-deque!
  [a]
  (reset! default a))

(defn new-deque
  ([]
   (deque []))
  ([x-or-coll]
   (if (vector? x-or-coll)
     (deque x-or-coll)
     (deque (into [] x-or-coll)))))

(defn- assert-count-is-5
  [deque]
  (assert (= 5 (count deque)) (str "count is not 5: " deque)))

(s/defn deque [v :- (s/pred vector?)]
    (specify v
             IDeque
             (-push-front [this x]
               (new-deque (into [x] this)))
             (-push-back [this x]
               (new-deque (into [] (conj this x))))
             (-pop-front [this]
               (new-deque (into [] (drop 1 this))))
             (-pop-back [this]
               (new-deque (into [] (drop-last 1 this))))
             (push-down [this]
               (-> this
                   (-pop-back)
                   (-push-front @default)))
             (push-up [this]
               (-> this
                   (-pop-front)
                   (-push-back @default)))
             ISith
             (assoc-sith [this k sith]
               (assert-count-is-5 this)
               (if (and (<= k 4) (>= k 0))
                 (new-deque (into [] (assoc v k sith)))
                 this))
             (in? [this id]
               (assert-count-is-5 this)
               (boolean (some #(= (:id %) id) this)))
             (empty-at-location? [this location]
               (assert-count-is-5 this)
               (assert (= 5 (count this)) (str "count is not 5: " this))
               (when (and (>= location 0) (<= location 4))
                 (empty? (get-in this [location :name]))))
             (count-blanks [this direction]
               (assert-count-is-5 this)
               (let [v (if (= :down direction)
                         (reverse this)
                         this)]
                 (count (take-while #(empty? (:name %)) v))))
             (set-direction [this direction]
               (assert-count-is-5 this)
               (new-deque (mapv #(assoc % :direction direction) this)))
             (is-empty? [this]
               (assert-count-is-5 this)
               (and
                (empty-at-location? this 0)
                (empty-at-location? this 1)
                (empty-at-location? this 2)
                (empty-at-location? this 3)
                (empty-at-location? this 4)))
             (get-first-non-empty-sith [this direction]
               (assert-count-is-5 this)
               (let [coll (if (= :down direction)
                            (reverse this)
                            this)]
                 (first (keep-indexed (fn [i m] (when (seq (:name m)) [m i])) coll))))))
