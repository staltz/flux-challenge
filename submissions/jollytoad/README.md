# Flux Challenge using [Fluxlet](https://github.com/fluxlet/fluxlet)

Fluxlet is a flux inspired micro-framework for managing the dataflow and state
of your application. It's very functional in style, relying on functional
concepts rather than OO, with a fluent API for configuration.

I started writing a fluxlet tutorial based on this, but it got a bit too long
for inclusion here, and I ended making quite a few changes to the code base and
it got out of sync with the tutorial. So I think I'll continue that at some
other time in a dedicated repository, maybe using litpro to generate the
actual code from the doc itself.


## Run in production mode

(after starting the server)

    $ open index.html

This uses a single minified build.js which is created by jspm...


## Run in development mode

The application code is in [app.js](src/app.js), an ES6 module.
[main.js](src/main.js) is just to bootstrap the call to setup() from the app module.

I've been using browser-sync for development.

    $ cd src
    $ npm install
    $ npm start


## Bundling for production

(from the [src](src) dir, and after npm install)

    $ npm run bundle

This will dump a minified standalone build.js into the parent folder.
