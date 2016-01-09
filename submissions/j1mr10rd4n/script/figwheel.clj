(require '[figwheel-sidecar.repl :as r]
         '[figwheel-sidecar.repl-api :as ra])

(ra/start-figwheel!
  {:figwheel-options {}
   :build-ids ["dev" "min"]
   :all-builds
   [{:id "dev"
     :figwheel true
     :source-paths ["src"]
     :compiler {:main 'ui-of-the-sith.core
                :asset-path "js"
                :output-to "resources/public/js/main.js"
                :output-dir "resources/public/js"
                :verbose true
                :source-map true
                :source-map-timestamp true}}
    {:id "min"
     :figwheel false
     :source-paths ["src"]
     :compiler {:main `ui-of-the-sith.core
                :asset-path "js"
                :output-to "app/js/main.js"
                :output-dir "app/js"
                :optimizations :advanced}}]})

(ra/cljs-repl)
