(ns jelz.client
  (:require-macros
    [cljs.core.async.macros :refer [go go-loop]])
  (:require
    [chord.client :refer [ws-ch]]
    [cljs.core.async :refer [<!]]
    [ajax.core :refer [GET]]
    [re-frame.core :refer [dispatch]]))

(def endpoints {:planet "ws://localhost:4000"
                :jedi   "http://localhost:3000/dark-jedis/"})

(defonce ws (atom {:connection (ws-ch (:planet endpoints) {:format :json-kw})
                   :listening? false}))

(defn listen [ch]
  (go-loop [] (let [{:keys [message]} (<! ch)]
                (dispatch [:planet-change message])
                (when message (recur)))))

(defn setup-planet-listener []
  (when-not (:listening? @ws)
    (go (let [{:keys [ws-channel]} (<! (:connection @ws))]
          (listen ws-channel)
          (swap! ws assoc :listening? true)))))

(defn fetch-dark-jedi [req-id id]
  (let [url     (str (:jedi endpoints) id)
        handler #(dispatch [:jedi-loaded req-id %])
        xhr     (GET url {:response-format :json
                          :keywords?       true
                          :handler         handler})]
    (dispatch [:jedi-loading req-id xhr])))
