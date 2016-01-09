(ns ui-of-the-sith.config
  (:require [goog.log :as glog]
))

(def base-url "http://localhost:3000/dark-jedis/")

(def initial-sith-remote-id 3616)

(def list-size 5)

(def scroll-size 2)

(defonce logger 
  (let [logger (glog/getLogger "sith.ui")]
    (.setLevel logger goog.debug.Logger.Level.WARNING)
    logger))

