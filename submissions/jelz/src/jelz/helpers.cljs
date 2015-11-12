(ns jelz.helpers
  (:require [cljs-uuid-utils.core :refer [make-random-uuid]]))

;;-- Creating/updating slots ---------------------------------------------------

(defn create-slot [] {:req-id (make-random-uuid)})
(defn get-empty-slots [] (vec (repeatedly 5 create-slot)))

(defn extend-slot [slots req-id ext]
  (let [req-id-eq #(= req-id (:req-id %))
        extend    #(if (req-id-eq %) (merge % ext) %)]
    (mapv extend slots)))


;;-- Finding slots -------------------------------------------------------------

(defn first-known [slots]
  (count (take-while #(not (:id %)) slots)))

(defn last-known [slots]
  (- 4 (first-known (reverse slots))))

(defn create-finder [find-fn sibling-fn kw]
  (fn finder
    ([slots no-validate]
     (let [index   (find-fn slots)
           slot    (get slots index)
           sibling (get slots (sibling-fn index 1))
           id      (get-in slot [kw :id])
           req-id  (:req-id sibling)]
       (when (or no-validate (and id req-id))
         {:id id :req-id req-id :xhr (:xhr sibling)})))
    ([slots]
     (finder slots false))))

(def find-master-to-load (create-finder first-known - :master))
(def find-apprentice-to-load (create-finder last-known + :apprentice))


;;-- Scrolling -----------------------------------------------------------------

(defn can-scroll-up? [slots] (< (first-known slots) 3))
(defn can-scroll-down? [slots] (> (last-known slots) 1))

(defn scroll [slots dir]
  (case dir
    :up (into (vec (repeatedly 2 create-slot)) (subvec slots 0 3))
    :down (into (subvec slots 2 5) (repeatedly 2 create-slot))))


;;-- Aborting requests ---------------------------------------------------------

(defn canceler [slot]
  (when (:pending? slot) (.abort (:xhr slot)))
  (assoc slot :pending? false :xhr nil))

(defn cancel-pending [slots]
  (mapv canceler slots))
