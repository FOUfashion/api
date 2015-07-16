# Fou API

[![Dependencies Status](https://david-dm.org/FOUfashion/api.png)](https://david-dm.org/FOUfashion/api#info=dependencies)
[![Dev Dependencies Status](https://david-dm.org/FOUfashion/api/dev-status.svg)](https://david-dm.org/FOUfashion/api#info=devDependencies)

The API is built with [Hapi.js](http://hapijs.com/), a rich framework for building applications and services.

## Build

To build and start the API, run:

```bash
npm start
```

To reload the server automatically when changing the source code, use the watch script:

```bash
npm run start-watch
```

And to clean the the build folder:

```bash
npm run clean # build and node_modules
npm run clean-build # build
```

## Tests

Fou API uses [Lab](https://github.com/hapijs/lab) to run tests and [Code](https://github.com/hapijs/code) for assertions. To run the tests:

```bash
npm test
npm run test-watch
```

And to see the coverage:

```bash
npm run coverage
npm run coverage-watch
```

It has 100% code coverage.

## IDE and linting

I use Atom with `atom-beautify`, `autocomplete`, `language-babel`, `linter` and `linter-eslint`. These plugins provide code formatting, auto completion, ES6 support and linting.

If you'd like, you can also lint the entire codebase manually:

```bash
npm run lint
npm run lint-watch
```
