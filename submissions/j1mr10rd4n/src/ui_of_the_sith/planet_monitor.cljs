(ns ui-of-the-sith.planet-monitor
  (:require [goog.events :as ev]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom])
  (:import goog.net.WebSocket))

(def base-url "ws://localhost:4000")

(defn socket
  [update-planet-callback]
  (let [socket (WebSocket.)]
    (ev/listen socket
               #js [WebSocket.EventType.CLOSED
                    WebSocket.EventType.ERROR
                    WebSocket.EventType.MESSAGE
                    WebSocket.EventType.OPENED]
               (fn [e]
                 (let [log-message-content (condp = (.-type e)
                                                  WebSocket.EventType.MESSAGE (.-message e)
                                                  WebSocket.EventType.ERROR (.-data e)
                                                  nil)]
                   (if (= (.-type e) WebSocket.EventType.MESSAGE)
                     (let [planet-name (-> e (aget "message") JSON.parse (aget "name"))]
                       ;(.log js/console 
                         ;(clojure.string/join " " [(.-type e) log-message-content]))
                       (update-planet-callback planet-name)))
                   )))
    socket))

(defn planet-monitor-text
  [planet]
  (if planet (str "Obi-Wan currently on " planet)))

(defui PlanetMonitor
  static om/IQuery
  (query [this]
    [:obi-wan-planet])
  Object
  (componentWillMount [this]
    (let [cb (:update-planet-callback (om/get-computed (om/props this)))]
      (om/set-state! this {:socket (socket cb)})
    (.open ((om/get-state this) :socket) base-url)
    ))
  (componentWillUnmount [this]
    (let [socket ((om/get-state this) :socket)]
      (.close socket)))
  (render [this]
    (let [props (om/props this)
          {:keys [obi-wan-planet]} props]
      (dom/h1 #js {:className "css-planet-monitor"} 
              (planet-monitor-text obi-wan-planet)))))

(def planet-monitor (om/factory PlanetMonitor nil))
