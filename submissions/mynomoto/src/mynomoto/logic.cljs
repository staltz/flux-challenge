(ns mynomoto.logic)

(defn first-known [slots]
  (count (take-while #(not (:id %)) slots)))

(defn last-known [slots]
  (- 4 (first-known (reverse slots))))

(defn sith-planet? [current-planet siths]
  (some #{(:id current-planet)} (map #(-> % :homeworld :id) siths)))

(defn no-master-first? [siths]
  (let [fk (first-known siths)]
    (when (<= fk 4)
      (-> (nth siths fk)
          :master
          :id
          nil?))))

(defn no-apprentice-last? [siths]
  (let [lk (last-known siths)]
    (when (<= 0 lk)
      (-> (nth siths lk)
          :apprentice
          :id
          nil?))))
