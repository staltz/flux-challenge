(ns jelz.helpers)

;;-- Creating/updating slots ---------------------------------------------------

(defn create-slot []
  {:req-id (-> js/Math .random (.toString 36) (.substring 7))})

(defn get-empty-slots []
  (vec (map create-slot (repeat 5 nil))))

(defn extend-slot [slots req-id ext]
  (let [req-id-eq (fn [slot] (= req-id (:req-id slot)))
        extend    (fn [slot] (if (req-id-eq slot) (merge slot ext) slot))]
    (vec (map extend slots))))


;;-- Finding slots -------------------------------------------------------------

(defn first-known [slots]
  (count (take-while (fn [slot] (not (:id slot))) slots)))

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
    :up (into
          [(create-slot) (create-slot)]
          (subvec slots 0 3))
    :down (into
            (subvec slots 2 5)
            [(create-slot) (create-slot)])))


;;-- Aborting requests ---------------------------------------------------------

(defn canceler [slot]
  (when (:pending? slot) (.abort (:xhr slot)))
  (assoc slot :pending? false :xhr nil))

(defn cancel-pending [slots]
  (vec (map canceler slots)))
