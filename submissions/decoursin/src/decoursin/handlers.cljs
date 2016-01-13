(ns decoursin.handlers
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [<! chan close!]]
            [cljs.core.async.impl.channels :refer [ManyToManyChannel]]
            [cljs-http.client :as client]
            [decoursin.db :as db]
            [decoursin.deque :refer [in? new-deque get-first-non-empty-sith
                                     count-blanks is-empty? set-direction
                                     assoc-sith push-down push-up]]
            [re-frame.core :as re-frame]
            [schema.core :as s]))

(def ^:const port 3000)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; Middleware

(defn- check-and-throw
  "throw an exception if db doesn't match the schema."
  [a-schema db]
  (if-let [problems  (s/check a-schema db)]
    (do
      (println "db: " db)
      (println "the-schema: " a-schema)
      (throw (js/Error. (str "schema check failed: " problems))))))

(def ^:private check-schema-mw (re-frame/after (partial check-and-throw db/schema)))

(def ^:private standard-middleware (when ^boolean goog.DEBUG
                            (comp re-frame/debug check-schema-mw)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; Public

(re-frame/register-handler
 :initialize-db
 re-frame/debug
 (fn [] db/app-db))

;;;;;;;;;;;;;;;;;;;;;;;; update siths handler

(s/defn current-sith-position :- s/Int
  [siths id direction]
  "Used to find where the sith having id=id is located
   in the siths. If neither
   apprentice nor master is in the siths, then
   place at the top or bottom depending on direction"
  (cond
    (= id (get-in siths [0 :id])) 0
    (= id (get-in siths [1 :id])) 1
    (= id (get-in siths [2 :id])) 2
    (= id (get-in siths [3 :id])) 3
    (= id (get-in siths [4 :id])) 4
    ;; siths is empty, place him at the top or bottom
    (and (is-empty? siths) (= :up direction)) -1
    (and (is-empty? siths) (= :down direction))  5
    :else -9999))

(s/defn find-location :- s/Int
  "Returns the location in the siths
   where the sith should be placed [0-4],
   determined by where it's apprentice
   exclusive or master is located."
  [siths sith]
  (let [direction (:direction sith)]
    (if (= :up direction)
      (+  1 (current-sith-position siths (get-in sith [:master :id]) direction))
      (+ -1 (current-sith-position siths (get-in sith [:apprentice :id]) direction)))))

(re-frame/register-handler
 :update-siths
 standard-middleware
 (fn [db [_ sith]]
   "We received a sith that was fetched from the server. Assoc
    it into it's location; remove it from the pending requests
    because it's finished so no longer pending or remove all pending requests
    because :obi-wan-is-here at some siths"
   (let [siths (:siths db)
         location (find-location siths sith)
         buttons (:buttons db)
         sith (if (= (-> db :planet :name) (get-in sith [:homeworld :name]))
                (assoc sith :obi-wan-is-here true)
                sith)
         db (if (some :obi-wan-is-here siths)
              (assoc db :requests db/blank-requests-map)
              (assoc-in db [:requests (:direction sith)] {:id -1 :channel nil}))]
     (assoc db :siths (assoc-sith siths location sith)))))

;;;;;;;;;;;;;;;;;;;;;;;; update pending request

(re-frame/register-handler
 :update-pending-requests
 [standard-middleware
  (re-frame/path :requests)]
 (fn [requests [_ cancel-chan direction id]]
   "We're pending a request from the server for a sith with this id,
    add it to pending"
   (assoc requests direction {:id id :channel cancel-chan})))

;;;;;;;;;;;;;;;;;;;;;;; set-sith handler

(s/defn fetch-sith :- [(s/one ManyToManyChannel "ch1") (s/one ManyToManyChannel "ch2")]
  "Fetch the sith from the server."
  [id :- s/Int]
  (let [url (str "http://localhost:" port "/dark-jedis/" id)
        cancel-chan (chan 5)
        sith-chan (client/get url {:accepts :json
                                   :channel (chan 1 (map :body))
                                   :with-credentials? false
                                   :cancel cancel-chan})]
    [cancel-chan sith-chan]))

(s/defn handle-set-sith :- db/schema
  "In Re-frame, to change the db after asynchronous waiting,
   we must dispatch to a different handler to make the change;
   for this reason, in the when clause below, we dispatch
   to :update-siths and :update-pending-requests handlers. The
   :update-pending-requests dispatch must occur before we resolve
   the sith-channel using <!"
  [db [_ id direction location]]
  (let [siths (:siths db)
        pending (get (:requests db) direction)] 
    (when (and (pos? id) ;; valid sith?
             (not (in? siths id)) ;; is the sith already in there
             (not= id (:id pending)) ;; waiting for a response for this sith?
             (not-any? :obi-wan-is-here siths))
      ;; when, do
      (let [[cancel-chan sith-chan] (fetch-sith id)]
        (re-frame/dispatch [:update-pending-requests cancel-chan direction id])
        (go (let [new-sith (<! sith-chan)
                  new-sith (assoc new-sith :direction direction)]
            (re-frame/dispatch [:update-siths new-sith])))))
      ;; always
      db))

(re-frame/register-handler
 :set-sith
 standard-middleware
 handle-set-sith)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;; buttons clicks handler

(s/defn cancel-request! :- nil
  "closing the cancel channel, cancels
   the sith-chan. Search cljs-http issues for more"
  [channel :- ManyToManyChannel]
  (close! channel))

(s/defn opposite-direction :- s/Keyword
  "This is a hack of sorts. The problem is that we cancel
   the pending requests when scrolling in the opposite direction
   that they were loaded from"
  [direction :- db/Direction]
  (case direction
    :up :down
    :down :up
    nil))

(s/defn cancel-obsolete-pending-request! :- db/Requests
  "A pending request is obsolete, after scroll, only when the position
   that a sith would be placed on the deque is no longer available
   due to scrolling while the sith is being fetched from the server. In
   this case, the sith's position, after scroll, is <0 or >4"
  [requests :- db/Requests siths :- db/Siths direction :- db/Direction]
  (let [ch (:channel (get requests (opposite-direction direction)))
        blanks (count-blanks siths direction)]
    (if (and ch (zero? blanks))
      (do
        (cancel-request! ch)
        (assoc requests (opposite-direction direction) {:id -1, :channel nil}))
      requests)))

(s/defn shift :- db/Siths
  "Shift the deque up or down depending on direction. The result is
   that we remove from one side, and we add the default blank-sith-template
   to the other"
  [siths :- db/Siths direction :- db/Direction]
  (if (= direction :up)
    (push-up (push-up siths))
    (push-down (push-down siths))))

(s/defn handle-button-click :- db/schema
  "Shift the deque up or down, depending on direction, and possibly
   cancel the only pending request in that direction"
  [db [_ direction e]]
  (let [siths (-> (:siths db)
                  (shift direction)
                  (set-direction direction))
        request (cancel-obsolete-pending-request! (:requests db) siths direction)]
    (-> db
        (assoc :siths siths)
        (assoc :requests request))))

(re-frame/register-handler
 :button-click
 standard-middleware
 handle-button-click)

;;;;;;;;;;;;;;;;;;;;;;;;;;;; websocket handler

(s/defn update-obi-wan-is-here
  "Take a planet, and return a function that accepts a sith.
   Update the :obi-wan-is-here field in this sith"
  [planet :- db/Planet]
  (fn obi-wan-is-here? [sith]
    (if (= (:name planet) (get-in sith [:homeworld :name]))
      (assoc sith :obi-wan-is-here true)
      (assoc sith :obi-wan-is-here false))))

(s/defn cancel-all-requests! :- nil
  "Cancel all pending requests"
  [requests :- db/Requests]
  (let [ch1 (-> requests :up :channel)
        ch2 (-> requests :down :channel)]
    (when ch1
      (cancel-request! ch1))
    (when ch2
      (cancel-request! ch2))))

(s/defn handle-ws-message
  "handle websocket messages, by updating the :planet field
   and updating :obi-wan-is-here field in all siths, and
   conditionally remove all pending requests"
  [db [_ planet]]
    (let [planet (clojure.walk/keywordize-keys planet)
          siths (new-deque
                 (map (update-obi-wan-is-here planet)
                      (:siths db)))]
      (when (some :obi-wan-is-here siths)
        (cancel-all-requests! (:requests db)))
      (cond-> db
        (some :obi-wan-is-here siths) (assoc :requests (db/blank-requests-map))
        true (assoc :siths siths)
        true (assoc :planet planet))))

(re-frame/register-handler
 :ws-message
 standard-middleware
 handle-ws-message)
