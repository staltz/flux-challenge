(ns app.client
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]])
  (:require [goog.dom :as gdom]
            [com.fulcrologic.fulcro.application :as app]
            [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.algorithms.data-targeting :as targeting]
            [chord.client :refer [ws-ch]]
            [cljs.core.async :refer [<!]]
            [app.rest :refer [remote]]
            [app.proxy :refer [sith-output]]
            [app.view :as view]))

(defn mount [app]
  (app/mount! app view/Root "app"))

(def endpoints {:planet "ws://localhost:4000"
                :jedi   "http://localhost:3000/dark-jedis/"})

(defonce ws (atom {:connection (ws-ch (:planet endpoints) {:format :json-kw})
                   :listening? false}))

(defn listen [ch app]
  (go-loop [] (let [{:keys [message]} (<! ch)]
                (comp/transact! app `[(view/set-current-planet {:planet ~message})])
                (when message (recur)))))

(defn setup-planet-listener [app]
  (when-not (:listening? @ws)
    (go (let [{:keys [ws-channel]} (<! (:connection @ws))]
          (listen ws-channel app)
          (swap! ws assoc :listening? true)))))

(defn client-did-mount
  "
  adding a target to this load was the secret sauce. We load the data into the fulcro app db and then we need to tell fulcro where to put the data.
  In this case, we have a row of :siths, where :list/siths holds and array of sith ids. This adds an edge to the UI graph.
  http://book.fulcrologic.com/#_adding_edges
  "
  [app]
  (df/load! app :default-sith view/Sith {:target [:slot/by-id :one :slot/sith]})
  (setup-planet-listener app))

(defonce app (app/fulcro-app {:client-did-mount client-did-mount
                              :remotes          {:remote remote}}))

(defn ^:export init
  []
  (mount app)
  (js/console.log "Loaded"))

(defn ^:export refresh
  "During development, shadow-cljs will call this on every hot reload of source. See shadow-cljs.edn"
  []
  ;; re-mounting will cause forced UI refresh, update internals, etc.
  (mount app)
  ;; As of Fulcro 3.3.0, this addition will help with stale queries when using dynamic routing:
  (comp/refresh-dynamic-queries! app)
  (js/console.log "Hot reload"))
