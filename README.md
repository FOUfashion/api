# Fou API

[![Dependencies Status](https://david-dm.org/FOUfashion/api.png)](https://david-dm.org/FOUfashion/api#info=dependencies)
[![Dev Dependencies Status](https://david-dm.org/FOUfashion/api/dev-status.svg)](https://david-dm.org/FOUfashion/api#info=devDependencies)

The API is built with [Hapi.js](http://hapijs.com/), a rich framework for building applications and services.

## Build

Install dependencies:

```bash
npm install
```

To build and start the API, run:

```bash
npm start
npm run start-watch # reload the server automatically on changes
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

These scripts will create a `coverage.html` report. It has 100% code coverage.

## IDE and linting

I use Atom with `atom-beautify`, `autocomplete`, `language-babel`, `linter` and `linter-eslint`. These plugins provide code formatting, auto completion, ES6 support and linting.

If you'd like, you can also lint the entire codebase manually:

```bash
npm run lint
npm run lint-watch
```

## Server CLI

The API uses [Vantage](https://github.com/dthree/vantage) to create a CLI intended only for private use. It is used to create resources and generate auth credentials for first-party clients without exposing these abilities to everyone else.
