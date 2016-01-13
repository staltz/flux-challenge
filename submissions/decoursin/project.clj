(defproject decoursin "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.189"]
                 [org.clojure/core.async "0.2.374"]
                 [prismatic/schema "1.0.3"]
                 [reagent "0.5.1"]
                 [re-frame "0.6.0"]
                 [jarohen/chord "0.7.0"]
                 [cljs-http "0.1.37"]]

  :min-lein-version "2.5.3"

  :source-paths ["src"]

  :plugins [[lein-cljsbuild "1.1.1"]]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"]

  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src"]
                        :compiler {:main decoursin.core
                                   :optimizations :none
                                   :output-to "resources/public/js/compiled/decoursin.js"
                                   :output-dir "resources/public/js/compiled/out"
                                   :asset-path "js/compiled/out"
                                   :source-map true
                                   :cache-analysis true ;; what is this?
                                   :source-map-timestamp true}}

                       {:id "min"
                        :source-paths ["src"]
                        :compiler {:main decoursin.core
                                   :output-to "resources/public/js/compiled/app.js"
                                   :optimizations :advanced
                                   :pretty-print false}}]}
  :figwheel {;; :http-server-root "public" ;; default and assumes "resources"
             :server-port 3449
             ;; :server-ip "127.0.0.1"

             :css-dirs ["resources/public/css"] ;; watch and update CSS

             ;; :repl true

             ;; :on-jsload "decoursin.core/mount-root"

             ;; Start an nREPL server into the running figwheel process
             ;; :nrepl-port 7888

             ;; To be able to open files in your editor from the heads up display
             ;; you will need to put a script on your path.
             ;; that script will have to take a file path and a line number
             ;; ie. in  ~/bin/myfile-opener
             ;; #! /bin/sh
             ;; emacsclient -n +$2 $1
             ;;
             ;; :open-file-command "myfile-opener"

             ;; to configure a different figwheel logfile path
             ;; :server-logfile "tmp/logs/figwheel-logfile.log"
             })
