(ns app.proxy
  (:require [com.wsscode.pathom.connect :as pc]
            [com.wsscode.pathom.diplomat.http :as http]
            [clojure.core.async :as async]
            [clojure.string :as string]))

(defn fetch
  "this function takes the pathom env and adds HTTP headers and then sends HTTP request."
  [{:keys [_ api-url]
    :as env}
   {::keys [path method body]
    :or {method "GET"}}]
  (let [url (str api-url path)]
    (cond-> (assoc env
                   ::http/as ::http/json
                   ::http/url url
                   ::http/content-type ::http/json
                   ::http/method (keyword "com.wsscode.pathom.diplomat.http" (string/lower-case method)))
      body (assoc ::http/body body)
      :always http/request)))

(def sith-output
  "helper that defines the output of both the sith resolvers."
  [:sith/name
   :sith/id
   :sith/master
   :sith/apprentice
   {:sith/homeWorld [:homeWorld/name :homeWorld/id]}
  ])

(defn qualify-homeworld [sith-response]
  "this function takes a sith http response and constructs the homeworld"
  {:homeWorld/name (-> sith-response
                       :homeworld
                       :name)
   :homeWorld/id (-> sith-response
                     :homeworld
                     :id)})

(defn get-sith [env {:sith/keys [id] :as params}]
  "async function that fetches a /dark-jedi/:id and returns the transformed result"
  (async/go
    (let [{::http/keys [body]} (async/<! (fetch env {::path (str "/dark-jedis/" id)}))
          sith {:sith/homeWorld (qualify-homeworld body)
                :sith/id (:id body)
                :sith/name (:name body)
                :sith/master (-> body :master :id)
                :sith/apprentice (-> body :apprentice :id)}]
      sith)))

(def default-sith
  "Darth Sideous is the default sith."
  {:sith/id 3616})

(def register
  "
  resolvers we use to reach out to our jedi server.
  fetch a sith from the api given their :sith/id
  We defined a default resolver that gives us Darth Sideous's :sith/id. Pathom will then use sith-resolver to resolve the other requested fields
  "
  [(pc/defresolver sith-resolver [env params]
     {::pc/input  #{:sith/id}
      ::pc/output sith-output}
     (get-sith env params))
   (pc/defresolver first-sith [env _]
     {::pc/output [:default-sith [:sith/id]]}
     {:default-sith default-sith})])
