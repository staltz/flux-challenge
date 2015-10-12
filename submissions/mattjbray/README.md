Build instructions
------------------

Because the official elm-http package doesn't support cancelling requests, this
is slightly more complicated than it should be.

1. Install Elm: http://elm-lang.org/install
2. `cd submissions/mattjbray`
3. `git clone git@github.com:mattjbray/elm-http.git`
4. `make`
5. Open index.html

Or with  Docker:

1. `cd submissions/mattjbray`
2. `git clone git@github.com:mattjbray/elm-http.git`
3. Build the frontend: `docker-compose run --rm builder`
4. Run the server: `docker-compose up server`
5. Open index.html