
[![Build Status](https://travis-ci.org/gterzian/flux-challenge.svg)](https://travis-ci.org/gterzian/flux-challenge)

### What's elegance?

If we focus on the ability for others to quickly jump in, understand and contribute to a codebase, these are matters that can be important

- Test coverage
- Use of standard tools
- Clear project structure
- A lack of complicated stuff going on

Assuming this, I've focused on covering core logic with tests, using [Jest](http://facebook.github.io/jest/), and I used standard flux libraries such as the Facebook Dispatcher, Container and Store classes found in [flux utils](http://facebook.github.io/flux/docs/flux-utils.html) as well as immutable data structures found in [Immutable](http://facebook.github.io/immutable-js/).

I'm sure there are lots of other great flux tools and frameworks out there, and perhaps using ligthweight libraries can help people quickly jump in, especially when the community is still young and there is no de-facto standard framework.

Besides this I've tried to keep things modular and as simple as possible, favoring the use of well-documented higher-order methods on Immutable data structures while avoiding manual looping constructs.

I also think keeping things in separate files and folders is useful.

- Run the tests: `npm test`
- Build the project: `npm start`

Actually, if you just start the server locally and paste the `index.html` file in a browser, you should be fine.

I'm pretty sure I missed some requirement, and I do look forward to your feedback. Thanks for taking a look!

Special thanks to https://github.com/facebook/flux/tree/master/examples/flux-utils-todomvc for showing me how to use the flux/utils classes, and providing a good `package.json` for initial setup with Watchify, Babel and Jest!

[![Star Wars](http://www.beamsshopblog.jp/data/original/0/101/e822b31ffee5b6091dda9bfb0755abd0ebab21d8.jpg?1446603980)](http://www.beamsshopblog.jp/data/original/0/101/e822b31ffee5b6091dda9bfb0755abd0ebab21d8.jpg?1446603980)
