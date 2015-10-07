# Winston Ewert's Flux Challenge

Built using redux.

My solution to the requests was inspired by react. I have a pure function
of my redux state which indicates which requests should be made. I keep
track of which requests I've actually made, and when there is a difference
between the requests which I think I should have made and the one's I've actually made, I apply the difference. That is, I create or cancel requests so that the ones returned by the function are the same ones I'm doing.

To build and run use:

npm install
npm start

To use the prebuilt-version, just open dist/index.html

This starts up the development version of the webpack server. I didn't make a production version.
