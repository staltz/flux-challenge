# Winston Ewert's Flux Challenge

Built using redux.

I solved the problem of server requests by having a function which returns
the list of requests that should currently be being made by the client. Middleware cancels and adds requests in order to make the current state of requests match that. I think this gives a pretty neat and readable way of handling that.

To run use:

npm install
npm start

This starts up the development version of the webpack server. I didn't make a production version.
