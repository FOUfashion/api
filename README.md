![Fou API](header.png)

[![Circle CI](https://img.shields.io/circleci/project/FOUfashion/api/master.svg)](https://circleci.com/gh/FOUfashion/api) [![Coverage](https://img.shields.io/coveralls/FOUfashion/api/master.svg)](https://coveralls.io/github/FOUfashion/api?branch=master) [![Dependencies](https://img.shields.io/david/FOUfashion/api.svg)](https://david-dm.org/FOUfashion/api)

The API was built with a focus on performance, intuitiveness and ease of use with the clients in mind. It uses:

- [Hapi.js](http://hapijs.com/) to power the server
- [RethinkDB](http://rethinkdb.com/) for the main database store

## Features :boom:

- RESTful architecture fully decoupled from clients
- CRUD routes with ACL based on token scope and resource ownership
- OAuth 2 flow with the following grant types:
  - *Authorization Code* for third party clients
  - *Authorization Code* or *Resource Owner Password Credentials* for first party clients
- auth security
  - every request (except `/`) requires token authorization
  - passwords are encrypted with the [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) function
    - a 256-bit key is derived with `sha256` using a 256-bit salt in 8192 iterations => encryption is both fast and secure
    - passwords NEVER leave the API server

## To-Do :dizzy:

- implement a socket-based messaging system with [hapi-io](https://github.com/sibartlett/hapi-io)
- expose RethinkDB post feeds (through sockets)
- use SSL for Vantage connections
- service emails

## Pre-Requisites :computer:

You need the following:

- `node.js` with generators support or `io.js`
- a RethinkDB server running on localhost

If you're using the `FOUfashion/development` repo set-up, run these commands to start the database and the reverse proxy:

```bash
$ docker-compose up -d rethinkdb
$ docker-compose up -d nginx
$ source ../.env
```

## Build :pray:

```bash
# install dependencies
$ npm install

# build and start the server
$ npm run build && npm start

# start and reload the server automatically on changes
$ npm run start-watch
```

## Tests :ok_hand:

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

## Endpoints :golf:

The API blueprint is available at [docs.fou.apiary.io](http://docs.fou.apiary.io/).

Other docs like the database diagram are included there.

## Server CLI :pager:

The API uses [Vantage](https://github.com/dthree/vantage) to create a remote CLI intended only for private use. It is used to create resources and generate auth credentials for first-party clients without exposing these abilities to everyone else.

```bash
# install vantage
$ npm intall -g vantage

# enable the CLI
$ export API_CLI_ENABLED=true
$ export API_CLI_USER=admin
$ export API_CLI_PASS=admin

# start the server
$ npm start

# connect to the CLI
$ vantage 127.0.0.1:4000
```

You'll need to authenticate with the specified credentials.

## IDE and linting :star:

I use [Atom](https://atom.io/) with `atom-beautify`, `autocomplete`, `language-babel`, `linter` and `linter-eslint`. These plugins provide code formatting, auto completion, ES6+ support and linting.
