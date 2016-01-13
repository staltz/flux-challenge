(ns decoursin.core
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [decoursin.config :as config]
            [reagent.core :as reagent]
            [re-frame.core :as re-frame]
            [decoursin.handlers]
            [decoursin.subs]
            [chord.client :refer [ws-ch]]
            [cljs.core.async :as a]
            [decoursin.views :as views]))

(when config/debug?
  (println "dev mode"))

(defn connect-to-websocket []
  (go-loop []
    (let [{:keys [ws-channel]} (<! (ws-ch "ws://localhost:4000"
                                          {:format :json
                                           :read-ch (a/chan 10)}))
          {:keys [message error]} (<! ws-channel)]
      (re-frame/dispatch [:ws-message message])
      (recur))))

(defn mount-root []
  (re-frame/dispatch [:set-sith 3616 :up 0])
  (reagent/render [views/main]
                  (.getElementById js/document "app")))

(defn ^:export init [] 
  (connect-to-websocket)
  (re-frame/dispatch-sync [:initialize-db])
  (mount-root))

(init)

