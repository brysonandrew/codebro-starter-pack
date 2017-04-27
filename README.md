# Repo for isomorphic React.js apps with Typescript.

## Installation:
``` bash
npm install
webpack --config ./webpack/release.js
```

## File structure:
  - ``src/``
    - ``routes/``: Defines the routes for the application using ``react-router``.
    - ``utils/``: Helper methods should be placed under this directory.
    - ``server/``: Contains files which have logic that is executed on the server side.

## CSS Usage:
  - Generic CSS which does not apply to a single component can be place in the ``src/styles.css`` file. React components should use the ``addComponentCSS`` utility method for their CSS styles definintion. Check the ``src/components/home/HelloWorld.tsx`` component for an example.

## Run development using client and server rendering:
``` bash
npm run dev
```

## Run production release:
``` bash
webpack --config ./webpack/release.js
NODE_ENV=production node build/server.js
```

## TypeScript definitions are handled using the [typings](https://github.com/typings/typings) library:

### Searching:
``` bash
typings search react-dom
```
### Installing:
``` bash
typings install --global --save dt~react-dom
```

---
maintained by code bro @ codebro.io