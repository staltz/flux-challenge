# Flux Challenge - Clojurescript Solution with Om Next

This solution uses [clojurescript](https://clojure.org/about/clojurescript) together 
with [David Nolen's](https://swannodette.github.io/) [Om Next](https://github.com/omcljs/om/wiki#om-next) 
library, a clojurescript-based FRP framework, borrowing the best bits from 
[Facebook's relay](https://facebook.github.io/relay), [Netflix's falcor](https://netflix.github.io/falcor)
and [Cognitect's datomic](http://www.datomic.com) with the following interesting characteristics:

* Client-driven graph traversal queries
* Composabled co-located queries on UI components
* Abstract mutations 

## Notes on this implementation.

Om Next allows for transparent remote synchronization that, as a learning exercise I 
decided to use in this solution, even though it has resulted in code that is somewhat 
less clean than if each Slot component triggered the calls to the dark jedi service itself.

I took up this challenge as I'm new to react, clojure and clojurescript - I've been
a Java and Ruby programmer for years and decided to take the plunge into some new
technologies. Solutions had already been submitted using hoplon and re-frame and I
thought om next sounded ineresting. There are almost certainly parts of this submission 
that can be improved (there are no tests for one thing!) and I'd welcome suggestions 
and comments.

## More info on Om Next

David did some great talks last year - [this video](https://www.youtube.com/watch?v=xz389Ek2eS8)
is a good introduction to Om Next.

# Usage

## To view

```bash
$ cd server
$ npm start
$ open http://localhost:3000/s/j1mr10rd4n
```

## To hack

The easiset way is to install [Leiningen](https://leiningen.org) and then run

```bash
lein run -m clojure.main script/figwheel.clj
```

This will provide a REPL with autocompiling code, you can browse the results at
http://localhost:3449.

## License

The contents of this folder are licensed under the [MIT License](https://opensource.org/licenses/mit-license.html)

