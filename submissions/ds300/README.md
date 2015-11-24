Derivables Solution
===================

This uses a novel (and very very young) view rendering library called [ddom](https://github.com/ds300/ddom), which does react/vdom-style diffing and patching of the DOM tree structure (parent/child relationships, but not node properties). This structure is created with [Derivables](https://github.com/ds300/derivablejs), which are an immutable state container which enforces consistency. Derivables are also used to bind state to DOM node properties. These bindings are activated/inactivated depending on whether or not a node is actually in the DOM.

### Project Strucutre

- Pure stateless functional core: `model.ts`
- Pure, lazy 'pull' state structure: `state.ts`
- DOM nodes and their associated pure, lazy state structure: `view.tsx`
- Causing state mutations: `mutations.ts`
- Submitting GET requests for sith details: `request.ts`
- Pulling it all together: `main.ts`

### Notes
Ended up using one atom at the top, because it is a very nice and clean design
when you can get away with it. It would make perfect sense to slip Redux or
similar in there if this app was going to change over time.
