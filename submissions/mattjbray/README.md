Flux Challenge in Elm
=====================

A solution using [Elm][elm] following [The Elm Architecture][arch].

[elm]: http://elm-lang.org
[arch]: https://github.com/evancz/elm-architecture-tutorial/

Build instructions
------------------

A compiled `dist/app.js` is provided, but if you want to build it yourself you
can do so like this.

(Because the official elm-http package doesn't support cancelling requests, this
is slightly more complicated than it should be.)

1. Install Elm: http://elm-lang.org/install
2. `cd submissions/mattjbray`
3. Fetch my fork of elm-http: `git clone git@github.com:mattjbray/elm-http.git`
4. Build the frontend: `make`
5. Open index.html

Or with Docker:

1. `cd submissions/mattjbray`
2. Fetch my fork of elm-http: `git clone git@github.com:mattjbray/elm-http.git`
3. Build the frontend: `docker-compose run --rm builder`
4. Run the server: `docker-compose up server`
5. Open index.html