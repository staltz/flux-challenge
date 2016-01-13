(ns decoursin.config
  (:require [schema.core :as s]))

(def debug?
  ^boolean js/goog.DEBUG)

(when debug?
  (s/set-fn-validation! true)
  (enable-console-print!))

