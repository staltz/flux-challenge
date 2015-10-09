# flux-challenge

This implementation makes use of `ReduceStore` and `Container` from `flux/utils`. It also takes advantage of newer abstractions from `React` such as [stateless functional  components](http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components).

## view demo

Navigate to: `file:///path/to/flux-challenge/submissions/kyldvs/index.html`

## building

Install dependencies then run the build script which uses `gulp`.

```bash
npm install # only once
gulp dist:min
```

Start up the server

```bash
cd ../../server
npm install # only once
npm start
```

Then navigate to `index.html`.
