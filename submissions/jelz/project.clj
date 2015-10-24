(defproject jelz-submission "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]
                 [reagent "0.5.1"]
                 [re-frame "0.4.1"]
                 [jarohen/chord "0.6.0"]
                 [cljs-ajax "0.5.0"]]

  :plugins [[lein-cljsbuild "1.1.0"]
            [lein-figwheel "0.4.1"]]

  :source-paths ["src"]

  :clean-targets ^{:protect false} ["resources/public/js/out" "target"]

  :cljsbuild {:builds [{:id           "dev"
                        :source-paths ["src"]
                        :figwheel     {}
                        :compiler     {:main                 jelz.core
                                       :asset-path           "js/out"
                                       :output-to            "resources/public/js/app.js"
                                       :output-dir           "resources/public/js/out"
                                       :source-map-timestamp true}}
                       {:id           "min"
                        :source-paths ["src"]
                        :compiler     {:output-to     "resources/public/js/app.js"
                                       :main          jelz.core
                                       :optimizations :advanced
                                       :pretty-print  false}}]})
