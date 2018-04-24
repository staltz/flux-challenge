# SithTrak&trade;

Welcome to the Matrix&trade; implementation of The Flux Challenge&trade;, ninety-seven lines of indeterminable elegance as defined by the Challenge.

>  the ability of a programmer to easily understand the program's flow and
>  state coordination, being completely familiar with the tools used but 
>  completely unfamiliar with the codebase.

Indeterminable because no one else is familiar *at all* with Matrix. But this could be my Submission Committee since the Matrix data flow engine has much in common with their projects:

* Michael Westrate, author of [MobX](https://github.com/mobxjs/mobx)
* Alan Dipert and Micha Niskin, crew behind [Javelin](https://github.com/hoplon/javelin)
* Yang Bo, author of [binding.scala](https://github.com/ThoughtWorksInc/Binding.scala)

Vast amounts of other prior/concurrent art exist. 

The elegance definition above presents another difficulty: data flow programs do not *have* program flow. The data flows and the UI shape simply conforms to the data. In a sense, the data flow ends with the dynamically altered UI, which itself is just data.

This, by the by, is where Facebook erred with React: the view *is* part of the model. By addressing only the view, they covered the easy part. The whole challenge of UI programming is managing state in an environment with interpendent parts responding to asynchronous input data. But Facebook punted on state, told us to make do as best we could, then changed their mind and told us to use Flux&trade;. As for data flow, Facebook [rejects it](https://reactjs.org/docs/design-principles.html). (Scroll down to "Scheduling"). Excerpts:

> The control over scheduling would be harder for us to gain if we let the user
> directly compose views with a “push” based paradigm common in some variations of 
> Functional Reactive Programming. We want to own the “glue” code.

And:

> There is an internal joke in the team that React should have been 
> called “Schedule” because React does not want to be fully “reactive”.

Instead we have Flux:

![Flux circular flow diagram](https://github.com/kennytilton/flux-challenge/blob/master/submissions/kennytilton/dist/facebook-flux-react.jpg)
