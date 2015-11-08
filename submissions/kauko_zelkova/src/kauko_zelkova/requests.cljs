(ns kauko-zelkova.requests
  (:require [cljs-http.client :as http]
            [cljs-http.core :refer [abort!]]
            [cljs.core.async :refer [<! >! chan]])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def pending-requests (atom {}))
(def out-channel (chan 10))

(defn- GET! [id]
  (when-not (get @pending-requests id)
    (print "Searching for sith with id: " id)
    (let [request (http/get (str "http://localhost:3000/dark-jedis/" id)
                            {:with-credentials? false})]
      (swap! pending-requests assoc id request)
      request)))

(defn abort-request! [id]
  (when (get @pending-requests id)
    (print "Aborting request for " id)
    (abort! (get @pending-requests id))
    (swap! pending-requests dissoc id)))

(defn abort-requests! []
  (print "Abort ALL requests!")
  (map (fn [[_ req]] (abort! req)) @pending-requests)
  (reset! pending-requests {}))

(defn get-sith! [id]
  (let [request (GET! id)]
    (when request
      (go
        (>! out-channel (let [result (<! request)]
                          (swap! pending-requests dissoc (get-in result [:body :id]))
                          result))))))

(add-watch pending-requests :foo
           (fn [_ _ old new]
             (print (keys old) " => " (keys new))))