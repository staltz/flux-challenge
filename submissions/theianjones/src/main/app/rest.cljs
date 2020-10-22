(ns app.rest
  (:require [com.fulcrologic.fulcro.algorithms.tx-processing :as ftx]
            [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.diplomat.http :as pd.http]
            [com.wsscode.pathom.diplomat.http.fetch :as pd.fetch]
            [com.wsscode.pathom.core :as p]
            [com.wsscode.pathom.trace :as pt]
            [app.proxy :as connect]
            [clojure.core.async :as async]
            [edn-query-language.core :as eql]
            [taoensso.timbre :as log]))

(defn transmit!
  "
  used by our fulcro app to execute eql requests.
  "
  [env {::ftx/keys [result-handler ast]}]
  (let [query (eql/ast->query ast)
        result ((:parser env) env query)]
    (async/go
      (result-handler {:body (async/<! result)
                       :original-transaction ast
                       :status-code 200}))))


(def parser
  "
  parallel-parser is able to create parallel data fetches.
  pc/connect-plugin registers mutations and resolvers to the pathom index
  pc/mutate-async would be used if we created mutations but this app has none.
  "
  (p/parallel-parser
   {::p/plugins [(pc/connect-plugin {::pc/register connect/register})
                 p/elide-special-outputs-plugin]
    ::p/mutate pc/mutate-async}))


(def remote
  "
  transmit! is the function that takes the pathom env and reads the async request that the parse sent out
  parser is a parallel-parser. This returns responses in a channel.
  api url is the endpoint that we are sending our requests to.
  request-async is the http driver that does the requests under the hood.
  readers are how pathom actually parse the EQL querie that comes in. https://blog.wsscode.com/pathom/#Readers
  the parallel-reader does a lot of the heavy lifting as it will detect dependencies and kick off resolvers in parallell and coordinate results https://blog.wsscode.com/pathom/v2/pathom/2.2.0/connect/readers.html#_pcparallel_reader
  open-ident-reader will add an ident to the context of your query... so it will take {[:sith/id 123] [:sith/name]} and put {:sith/id 123} into the parsing context.
   map-reader will simply check if the current value is on the conext and return that value if its found.
  "
  {:transmit!              transmit!
   :parser                 parser
   :api-url                "http://localhost:3000"
   ::pd.http/driver        pd.fetch/request-async
   ::p/reader              [p/map-reader
                            pc/parallel-reader
                            pc/open-ident-reader
                            p/env-placeholder-reader]
   ::p/placeholder-prefixes #{">"}})

(comment
  (async/go (let [response
                  (async/<! (parser {} [{[:sith/id 3616] [:sith/name {:sith/master [:sith/id]} {:sith/apprentice [:sith/id]}]}]))]
              (prn (:status response))
              (prn (:body response)))))
