# Flux Challenge solved with Freezer

The challenge below is nicely passed using [Freezer.js](https://github.com/arqex/freezer). Freezer is a reactive immutable data structure used as the only app state holder. Every change, deep in the state, triggers an `update` event that is used to re-render the app completely.

This solution relies in React's efficency to re-render only the unmodified parts of the UI. Freezer's immutability can help with this task in order to avoid unnecesary re-render checks if a React component's props have not changed. This solution doesn't take advantage of this feature though.

Using Freezer there is no need of actions, events are used instead. Unlike the actions, multiple events can be triggered concurrently, making Freezer a better tool for handling multiple async data sources.

Functions that update the state are called `Reactions` and, if they are organized by data domains, it is very easy to structure the application in a Flux alike way.

This example remarks how to have all the app state in one place, making all the components stateless.

[Read more about Freezer and Flux](https://medium.com/@arqex/react-the-simple-way-cabdf1f42f12).

#### Install and Run
To run the solution, start the challenge server and just open `index.html` in your browser.

If you want to play with the code, remove the comments from `webpack.config.js` file and start the development server:
```
npm install
npm start
```
Then go to `http://localhost:3030`.

## The challenge
[Go to the main readme file to catch up](https://github.com/arqex/flux-challenge).
