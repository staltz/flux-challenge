(ns om.next.cache)

(deftype Cache [arr index size]
  Object
  (add [this id x]
    (if (<= size (alength arr))
      (let [id' (.shift arr)]
        (swap! index #(-> % (dissoc id') (assoc id x))))
      (swap! index assoc id x))
    (.push arr id))
  (get [this id]
    (get @index id)))

(defn cache [size]
  (Cache. #js [] (atom {}) size))
