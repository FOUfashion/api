# Fou API

[![Circle CI](https://circleci.com/gh/FOUfashion/api.svg?style=svg)](https://circleci.com/gh/FOUfashion/api)
[![Coverage Status](https://coveralls.io/repos/FOUfashion/api/badge.svg?branch=master&service=github)](https://coveralls.io/github/FOUfashion/api?branch=master)
[![Dependencies Status](https://david-dm.org/FOUfashion/api.png)](https://david-dm.org/FOUfashion/api)

The API is built with [Hapi.js](http://hapijs.com/), a rich framework for building applications and services.

## Build

```bash
# install dependencies
$ npm install

# build and start the server
$ npm start

# start and reload the server automatically on changes
$ npm run start-watch
```

Note that you need a RethinkDB server running on localhost. Take a look in the `config` folder too.

## Tests

Fou API uses [Lab](https://github.com/hapijs/lab) to run tests and [Code](https://github.com/hapijs/code) for assertions.

```bash
# run the tests
$ npm test

# automatically re-run the tests on code changes
$ npm run test-watch

# run the tests and generate a coverage.html report
$ npm run coverage

# automatically re-run the tests with coverage on code changes
$ npm run coverage-watch

# also lint the code if you're feeling fancy
$ npm run lint

# and if you can't help from typing...
$ npm run lint-watch
```

## Server CLI

The API uses [Vantage](https://github.com/dthree/vantage) to create a remote CLI intended only for private use. It is used to create resources and generate auth credentials for first-party clients without exposing these abilities to everyone else.

```bash
# install vantage
$ npm intall -g vantage

# enable the CLI
$ export CLI_ENABLED=true

# start the server
$ npm start

# connect to the CLI
$ vantage 127.0.0.1:4000
```

## IDE and linting

I use [Atom](https://atom.io/) with `atom-beautify`, `autocomplete`, `language-babel`, `linter` and `linter-eslint`. These plugins provide code formatting, auto completion, ES6 support and linting.
