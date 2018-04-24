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

So our data swoops around in a highly purposed and constrained circle like a stadium crowd doing the wave, creating the illusion of control. But what if the hot dog guy is over their and the beer lady is over there? QED.

Under the data flow paradigm, no one tells anyone what data they cannot have when. Here is the view of a Sith somewhat distilled from the actual:

```` js
function sithView( c, sithId) {
    return li({ style: cF( c=> c.md.withObi ? "color:red": null)},
            {
                sithId: sithId,
                lookup: cF( c=> {
                    if (c.md.sithId > 0)
                        return new mxXHR( DARK_JEDI_URL + c.md.sithId)
                }),
    
                info: cF( c=> (c.md.lookup && c.md.lookup.okResult)),
    
                withObi: cF( c=> c.md.info.homeworld.name === sithApp.obiLoc.name)
            }
        , h3({ content: cF( c=> (i = c.md.par.info)? i.name : "")})
        , h6({ content: cF( c=> (i = c.md.par.info)? i.homeworld.name : "")}));
}
````
Ok, let us follow the flow. We will have to bounce around the properties of the beast because UIs are a netwrok of information. Below, `cF`s are formulaic Cells.

First we have a Sith's entry turning red if Obi-Wan is with them on their planet.
```` js
style: cF( c=> c.md.withObi ? "color:red": null)
````
How will they know they are with Obi? That is another formulaic property:
```` js
withObi: cF( c=> c.md.info.homeworld.name === sithApp.obiLoc.name)
````
That raises two questions. The first is how we know their `homeworld`. We look them up:
```` js
info: cF( c=> (c.md.lookup && c.md.lookup.okResult))
````
Wait. What is that lookup? It is actually a thinly wrapped XHR:
```` js
lookup: cF( if (c.md.sithId > 0)
            return new mxXHR( DARK_JEDI_URL + c.md.sithId))
````
Why test if the ID is positive? We created five SithViews straight away, before we knew all the IDs, and for mxWeb&trade; internalese reasons populated them with bogus (negative) IDs. Anyway, once we kick-off a `lookup` the `info` rule will start waiting on the result, which will flow into the formula whenever it comes back. ie, asynchronicity is a natural for data flow.

Speaking of which, where *is* Obi-Wan?
```` js
        obiTrakker: cF( c => new WebSocket('ws://localhost:4000')
                                .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data)),
        obiLoc: cI( null)
````
Careful: `obiTrakker` holds the socket connection, not Obi. The asynch `onmessage` handler initiates data flow by injecting new Obi info into the `obiLoc` input Cell. Imperative meets functional. Anyway...

Instead of a "batch" mentality in which view stuff happens and then data stuff happens in a big cyclic crowd wave all rising and falling in unison, we have a crowd of individual data point fans on their mobile devices calling people or looking things up to get the information they need when they decide they need it. Getting back to coding, this means the individual developer working on some widget can focus on that widget, pulling info from a matrix of other elements as they see fit. The only rule is, no cycles.

Here is how those "pulling" formulas work at run time. The user scrolls and in code not shown we simply change the list of SithIds. A new SithView is created for any new ID in the list. The `lookup` rule fires and kicks off an XHR. The `info` rule sees the lookup and asks for its `result` but gets back null. When the XHR gets its response and it is OK it imperatively feeds the response into its input `result` cell. The `info` cell now sees the result and takes on the result as its value and everyone watching the info fires. That includes `withObi`, who may discover they are on the same planet and turn `true`, triggering the `style` rule to run and decide on "color:red".

In more code not shown, the div owning the two scroll buttons has a `disabled` rule watching all the SithViews to see if any are `withObi`. Seeing one is, it turns `true`, and in turn the scroll buttons decide they are disabled and separately that thier classes should include a "disabled" class.

Sounds complex, right? Without data flow, it is. Now look at the code. The data flow paradigm has dissolved the complexity into so many simple rules for the programmer to trivially decide. Those rules are as simple in a React view, but React rules do nothing to get the data where it needs to be. In the data flow paradigm, views are first-class citizens who manage their own state, arranging for the state graph to stay as current as the view.

No Flux, no Redux.

QED

