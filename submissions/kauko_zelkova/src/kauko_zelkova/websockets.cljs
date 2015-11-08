(ns kauko-zelkova.websockets
  (:require [chord.client :refer [ws-ch]]
            [cljs.core.async :refer [<! >! put! close!]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))

(defn- receive-msgs! [server-ch atom]
  ;; every time we get a message from the server, add it to our list
  (go-loop []
           (let [{:keys [message]} (<! server-ch)]
             (reset! atom (js->clj message))
             (when message
               (recur)))))

(defn start-websocket! [atom]
  (go
    (let [{:keys [ws-channel]} (<! (ws-ch "ws://localhost:4000"
                                          {:format :json}))]
      (>! ws-channel "Ready to start receiving Obi-Wan's location!")
      (receive-msgs! ws-channel atom))))