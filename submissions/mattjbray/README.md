Build instructions
------------------

Because the official elm-http package doesn't support cancelling requests, this
is slightly more complicated than it should be.

1. Install Elm: http://elm-lang.org/install
2. `cd submissions/mattjbray`
3. `elm package install`
4. git clone git@github.com:mattjbray/elm-http.git elm-stuff/packages/mattjbray/elm-http/3.0.0
5. Add the line `"mattjbray/elm-http": "3.0.0",` to `elm-stuff/exact-dependencies.json`
6. `make`
7. Open index.html

Or with  Docker:

1. `cd submissions/mattjbray`
2. `docker-compose run --rm builder elm package install`
3. git clone git@github.com:mattjbray/elm-http.git elm-stuff/packages/mattjbray/elm-http/3.0.0
4. Add the line `"mattjbray/elm-http": "3.0.0",` to `elm-stuff/exact-dependencies.json`
5. Build the frontend: `docker-compose run --rm builder`
6. Run the server: `docker-compose up server`
7. Open index.html