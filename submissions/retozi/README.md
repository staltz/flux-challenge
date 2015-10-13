# Flux Challenge

This is the demonstration of the current architecture we use at my workplace to build a production web app.

Some notes on the design decisions / rules we enforce:

### Use of Typescript

Everything must be strictly typed (even immutable data structures). Reasoning here: https://www.youtube.com/watch?v=-WKGKofd2DI


### Flux

The example comes with an own """Flux""" implementation. (I believe it's not worth to use an external dependency. A decent, modern implementation
is roughly 200-300 straightforward LOC and should be tailored to the needs of a project.)

It is comparable to redux:

* a single state atom
* immutability to track state changes
* a functional way to update the state


However, there are a couple of differences.

* Actions are implemented as classes. The action implements the reducer function as its own method. The reasoning here: http://www.code-experience.com/problems-with-flux/ .
* The async flow is strictly isolated inside the RequestAction and translated into two, synchronous state updates.
* There is only one place where queries for state from the server are triggered: Inside the selector of a state slice.
* A typed solution for immutability.


##### Async flow

Async code is evil. It is notoriously hard to reason about, and if you are not careful, it leaks all over your flux architecture, making things very complex.

There are no promises or other async helpers in this example. All async behavior is wrapped inside the RequestAction class and does not leak outside.

If you need to talk to the server, you must dispatch a RequestAction.

The Store will call the writer of this action twice: Once when the request is sent (i.e. pending), once when the request returns.
Both the "request sent" write and "response received" write are being multiplexed into the write method of the RequestAction.



#### Bootstrapping and updating server state

I've never seen a big discussion about this in the flux community, but it is somewhat of a hard problem: Where do you trigger your Actions that query state from the server?

Most fetches are triggered by a user interaction with the DOM. But some need to be triggered when bootstrapping the "initial state" from the server.

This is solved by only triggering query Actions in the selector function of a given state slice. So fetches will be automatically triggered when a container pulls in a
certain state slice. The selector function is declared in the state slice module (and not in the Container) for DRY purposes.

To "refresh" state from the server, simply fire a regular sync action that puts a state slice in a state where the selector triggers the RequestAction side-effect.