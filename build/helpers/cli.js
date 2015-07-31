'use strict';

var _bluebird = require('bluebird');

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _vantage = require('vantage');

var _vantage2 = _interopRequireDefault(_vantage);

var _scopes = require('./scopes');

var _scopes2 = _interopRequireDefault(_scopes);

var _crypt = require('./crypt');

var _crypt2 = _interopRequireDefault(_crypt);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsProfile = require('../models/profile');

var _modelsProfile2 = _interopRequireDefault(_modelsProfile);

var _modelsClient = require('../models/client');

var _modelsClient2 = _interopRequireDefault(_modelsClient);

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var banner = '################################################################################\n#                                                                              #\n#                         ########  #######  ##     ##                         #\n#                         ##       ##     ## ##     ##                         #\n#                         ######   ##     ## ##     ##                         #\n#                         ##       ##     ## ##     ##                         #\n#                         ##        #######   #######                          #\n#                                                                              #\n#                          Welcome to FOU.fashion API                          #\n#                                                                              #\n#                  All connections are monitored and recorded                  #\n#           Disconnect IMMEDIATELY if you are not an authorized user           #\n#                                                                              #\n################################################################################';

// $lab:coverage:off$
var cli = new _vantage2['default']();
cli.delimiter('api~$');
cli.banner(banner);

// Basic auth
cli.auth('basic', {
  users: [{
    user: process.env.API_CLI_USER || 'admin',
    pass: process.env.API_CLI_PASS || 'admin'
  }]
});

cli.command('account').option('-u, --username <username>', 'Account username.').option('-e, --email <email>', 'Profile email.').option('-f, --first <first>', 'Profile first name.').option('-l, --last <last>', 'Profile last name.').description('Create a new Account.').action(_bluebird.coroutine(function* (args) {
  var _this = this;

  var password = yield new _Promise(function (resolve) {
    _this.prompt({
      type: 'password',
      name: 'password',
      message: 'Enter a password for the account'
    }, resolve);
  });

  var account = yield new _modelsAccount2['default']({
    username: args.options.username,
    password: yield _crypt2['default'].encryptPassword(password),
    profile: {
      email: args.options.email,
      name: {
        first: args.options.first,
        last: args.options.last
      }
    }
  }).saveAll();

  this.log(account);
}));

cli.command('client').option('-n, --name <name>', 'Client name.').option('-a, --account <account>', 'The ID of the account that owns this client.').description('Create a new Client.').action(_bluebird.coroutine(function* (args) {
  var client = yield new _modelsClient2['default']({
    name: args.options.name,
    secret: yield _crypt2['default'].generateSecret(),
    accountId: args.options.account
  }).save();

  this.log(client);
}));

cli.command('token').option('-a, --account <account>', 'The ID of the account that owns this client.').option('-c, --client <client>', 'The ID of the client that owns this token.').option('-s, --scope <scope>', 'The scopes for this token, separated by commas.').description('Create a new Token.').action(_bluebird.coroutine(function* (args) {
  var token = yield new _modelsToken2['default']({
    value: yield _crypt2['default'].generateToken(),
    accountId: args.options.account,
    clientId: args.options.client,
    scope: args.options.scope.replace(/\s/g, '').split(',')
  }).save();

  this.log(token);
}));

cli.command('fp').option('-u, --username <username>', 'Account username.').option('-e, --email <email>', 'Profile email.').option('-f, --first <first>', 'Profile first name.').option('-l, --last <last>', 'Profile last name.').option('-n, --name <name>', 'Client name.').description('Generate auth credentials for a first-party client.').action(_bluebird.coroutine(function* (args) {
  var _this2 = this;

  var password = yield new _Promise(function (resolve) {
    _this2.prompt({
      type: 'password',
      name: 'password',
      message: 'Enter a password for the account'
    }, function (result) {
      return resolve(result.password);
    });
  });

  var account = yield new _modelsAccount2['default']({
    username: args.options.username,
    password: yield _crypt2['default'].encryptPassword(password),
    profile: {
      email: args.options.email,
      name: {
        first: args.options.first,
        last: args.options.last
      }
    }
  }).saveAll();

  var client = yield new _modelsClient2['default']({
    name: args.options.name,
    secret: yield _crypt2['default'].generateSecret(),
    accountId: account.id
  }).save();

  var token = yield new _modelsToken2['default']({
    value: yield _crypt2['default'].generateToken(),
    accountId: account.id,
    clientId: client.id,
    scope: _scopes2['default'].ALL
  }).save();

  this.log('Client ID:', client.id);
  this.log('Client Secret:', client.secret);
  this.log('Token:', token.value);
}));

exports['default'] = cli;

// $lab:coverage:on$
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NsaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7c0JBRVYsVUFBVTs7OztxQkFDWCxTQUFTOzs7OzZCQUVQLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7OzRCQUNwQixrQkFBa0I7Ozs7MkJBQ25CLGlCQUFpQjs7OztBQUVuQyxJQUFNLE1BQU0sK25DQWNxRSxDQUFDOzs7QUFHbEYsSUFBTSxHQUFHLEdBQUcsMEJBQWEsQ0FBQztBQUMxQixHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUduQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNoQixPQUFLLEVBQUUsQ0FBQztBQUNOLFFBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxPQUFPO0FBQ3pDLFFBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxPQUFPO0dBQzFDLENBQUM7Q0FDSCxDQUFDLENBQUM7O0FBRUgsR0FBRyxDQUNBLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDbEIsTUFBTSxDQUFDLDJCQUEyQixFQUFFLG1CQUFtQixDQUFDLENBQ3hELE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUMvQyxNQUFNLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsQ0FDcEQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQ2pELFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNwQyxNQUFNLHFCQUFDLFdBQWUsSUFBSSxFQUFFOzs7QUFDM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFZLFVBQUEsT0FBTyxFQUFJO0FBQzVDLFVBQUssTUFBTSxDQUFDO0FBQ1YsVUFBSSxFQUFFLFVBQVU7QUFDaEIsVUFBSSxFQUFFLFVBQVU7QUFDaEIsYUFBTyxFQUFFLGtDQUFrQztLQUM1QyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQ2IsQ0FBQyxDQUFDOztBQUVILE1BQU0sT0FBTyxHQUFHLE1BQU0sK0JBQVk7QUFDaEMsWUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtBQUMvQixZQUFRLEVBQUUsTUFBTSxtQkFBTSxlQUFlLENBQUMsUUFBUSxDQUFDO0FBQy9DLFdBQU8sRUFBRTtBQUNQLFdBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7QUFDekIsVUFBSSxFQUFFO0FBQ0osYUFBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztBQUN6QixZQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO09BQ3hCO0tBQ0Y7R0FDRixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWIsTUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNuQixFQUFDLENBQUM7O0FBRUwsR0FBRyxDQUNBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDakIsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUMzQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsOENBQThDLENBQUMsQ0FDakYsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQ25DLE1BQU0scUJBQUMsV0FBZSxJQUFJLEVBQUU7QUFDM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSw4QkFBVztBQUM5QixRQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO0FBQ3ZCLFVBQU0sRUFBRSxNQUFNLG1CQUFNLGNBQWMsRUFBRTtBQUNwQyxhQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO0dBQ2hDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFVixNQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2xCLEVBQUMsQ0FBQzs7QUFFTCxHQUFHLENBQ0EsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNoQixNQUFNLENBQUMseUJBQXlCLEVBQUUsOENBQThDLENBQUMsQ0FDakYsTUFBTSxDQUFDLHVCQUF1QixFQUFFLDRDQUE0QyxDQUFDLENBQzdFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxpREFBaUQsQ0FBQyxDQUNoRixXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FDbEMsTUFBTSxxQkFBQyxXQUFlLElBQUksRUFBRTtBQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLDZCQUFVO0FBQzVCLFNBQUssRUFBRSxNQUFNLG1CQUFNLGFBQWEsRUFBRTtBQUNsQyxhQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO0FBQy9CLFlBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDN0IsU0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztHQUN4RCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsTUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqQixFQUFDLENBQUM7O0FBRUwsR0FBRyxDQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDYixNQUFNLENBQUMsMkJBQTJCLEVBQUUsbUJBQW1CLENBQUMsQ0FDeEQsTUFBTSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQy9DLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUNwRCxNQUFNLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FDakQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUMzQyxXQUFXLENBQUMscURBQXFELENBQUMsQ0FDbEUsTUFBTSxxQkFBQyxXQUFlLElBQUksRUFBRTs7O0FBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBWSxVQUFBLE9BQU8sRUFBSTtBQUM1QyxXQUFLLE1BQU0sQ0FBQztBQUNWLFVBQUksRUFBRSxVQUFVO0FBQ2hCLFVBQUksRUFBRSxVQUFVO0FBQ2hCLGFBQU8sRUFBRSxrQ0FBa0M7S0FDNUMsRUFBRSxVQUFBLE1BQU07YUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUN4QyxDQUFDLENBQUM7O0FBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSwrQkFBWTtBQUNoQyxZQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO0FBQy9CLFlBQVEsRUFBRSxNQUFNLG1CQUFNLGVBQWUsQ0FBQyxRQUFRLENBQUM7QUFDL0MsV0FBTyxFQUFFO0FBQ1AsV0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztBQUN6QixVQUFJLEVBQUU7QUFDSixhQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQ3pCLFlBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7T0FDeEI7S0FDRjtHQUNGLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFYixNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUFXO0FBQzlCLFFBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDdkIsVUFBTSxFQUFFLE1BQU0sbUJBQU0sY0FBYyxFQUFFO0FBQ3BDLGFBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtHQUN0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsTUFBTSxLQUFLLEdBQUcsTUFBTSw2QkFBVTtBQUM1QixTQUFLLEVBQUUsTUFBTSxtQkFBTSxhQUFhLEVBQUU7QUFDbEMsYUFBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO0FBQ3JCLFlBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtBQUNuQixTQUFLLEVBQUUsb0JBQU8sR0FBRztHQUNsQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsTUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLE1BQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLE1BQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqQyxFQUFDLENBQUM7O3FCQUVVLEdBQUciLCJmaWxlIjoiY2xpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhbnRhZ2UgZnJvbSAndmFudGFnZSc7XG5cbmltcG9ydCBzY29wZXMgZnJvbSAnLi9zY29wZXMnO1xuaW1wb3J0IGNyeXB0IGZyb20gJy4vY3J5cHQnO1xuXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuLi9tb2RlbHMvYWNjb3VudCc7XG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuLi9tb2RlbHMvcHJvZmlsZSc7XG5pbXBvcnQgQ2xpZW50IGZyb20gJy4uL21vZGVscy9jbGllbnQnO1xuaW1wb3J0IFRva2VuIGZyb20gJy4uL21vZGVscy90b2tlbic7XG5cbmNvbnN0IGJhbm5lciA9XG5gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICMjIyMjIyMjICAjIyMjIyMjICAjIyAgICAgIyMgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICAgICMjICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIyMjIyMjICAgIyMgICAgICMjICMjICAgICAjIyAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICMjICAgICAgICMjICAgICAjIyAjIyAgICAgIyMgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAjIyAgICAgICAgIyMjIyMjIyAgICMjIyMjIyMgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICBXZWxjb21lIHRvIEZPVS5mYXNoaW9uIEFQSSAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICBBbGwgY29ubmVjdGlvbnMgYXJlIG1vbml0b3JlZCBhbmQgcmVjb3JkZWQgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICBEaXNjb25uZWN0IElNTUVESUFURUxZIGlmIHlvdSBhcmUgbm90IGFuIGF1dGhvcml6ZWQgdXNlciAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjYDtcblxuLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG5jb25zdCBjbGkgPSBuZXcgVmFudGFnZSgpO1xuY2xpLmRlbGltaXRlcignYXBpfiQnKTtcbmNsaS5iYW5uZXIoYmFubmVyKTtcblxuLy8gQmFzaWMgYXV0aFxuY2xpLmF1dGgoJ2Jhc2ljJywge1xuICB1c2VyczogW3tcbiAgICB1c2VyOiBwcm9jZXNzLmVudi5BUElfQ0xJX1VTRVIgfHwgJ2FkbWluJyxcbiAgICBwYXNzOiBwcm9jZXNzLmVudi5BUElfQ0xJX1BBU1MgfHwgJ2FkbWluJ1xuICB9XVxufSk7XG5cbmNsaVxuICAuY29tbWFuZCgnYWNjb3VudCcpXG4gIC5vcHRpb24oJy11LCAtLXVzZXJuYW1lIDx1c2VybmFtZT4nLCAnQWNjb3VudCB1c2VybmFtZS4nKVxuICAub3B0aW9uKCctZSwgLS1lbWFpbCA8ZW1haWw+JywgJ1Byb2ZpbGUgZW1haWwuJylcbiAgLm9wdGlvbignLWYsIC0tZmlyc3QgPGZpcnN0PicsICdQcm9maWxlIGZpcnN0IG5hbWUuJylcbiAgLm9wdGlvbignLWwsIC0tbGFzdCA8bGFzdD4nLCAnUHJvZmlsZSBsYXN0IG5hbWUuJylcbiAgLmRlc2NyaXB0aW9uKCdDcmVhdGUgYSBuZXcgQWNjb3VudC4nKVxuICAuYWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5wcm9tcHQoe1xuICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICBuYW1lOiAncGFzc3dvcmQnLFxuICAgICAgICBtZXNzYWdlOiAnRW50ZXIgYSBwYXNzd29yZCBmb3IgdGhlIGFjY291bnQnXG4gICAgICB9LCByZXNvbHZlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBuZXcgQWNjb3VudCh7XG4gICAgICB1c2VybmFtZTogYXJncy5vcHRpb25zLnVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGF3YWl0IGNyeXB0LmVuY3J5cHRQYXNzd29yZChwYXNzd29yZCksXG4gICAgICBwcm9maWxlOiB7XG4gICAgICAgIGVtYWlsOiBhcmdzLm9wdGlvbnMuZW1haWwsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBmaXJzdDogYXJncy5vcHRpb25zLmZpcnN0LFxuICAgICAgICAgIGxhc3Q6IGFyZ3Mub3B0aW9ucy5sYXN0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5zYXZlQWxsKCk7XG5cbiAgICB0aGlzLmxvZyhhY2NvdW50KTtcbiAgfSk7XG5cbmNsaVxuICAuY29tbWFuZCgnY2xpZW50JylcbiAgLm9wdGlvbignLW4sIC0tbmFtZSA8bmFtZT4nLCAnQ2xpZW50IG5hbWUuJylcbiAgLm9wdGlvbignLWEsIC0tYWNjb3VudCA8YWNjb3VudD4nLCAnVGhlIElEIG9mIHRoZSBhY2NvdW50IHRoYXQgb3ducyB0aGlzIGNsaWVudC4nKVxuICAuZGVzY3JpcHRpb24oJ0NyZWF0ZSBhIG5ldyBDbGllbnQuJylcbiAgLmFjdGlvbihhc3luYyBmdW5jdGlvbihhcmdzKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgbmV3IENsaWVudCh7XG4gICAgICBuYW1lOiBhcmdzLm9wdGlvbnMubmFtZSxcbiAgICAgIHNlY3JldDogYXdhaXQgY3J5cHQuZ2VuZXJhdGVTZWNyZXQoKSxcbiAgICAgIGFjY291bnRJZDogYXJncy5vcHRpb25zLmFjY291bnRcbiAgICB9KS5zYXZlKCk7XG5cbiAgICB0aGlzLmxvZyhjbGllbnQpO1xuICB9KTtcblxuY2xpXG4gIC5jb21tYW5kKCd0b2tlbicpXG4gIC5vcHRpb24oJy1hLCAtLWFjY291bnQgPGFjY291bnQ+JywgJ1RoZSBJRCBvZiB0aGUgYWNjb3VudCB0aGF0IG93bnMgdGhpcyBjbGllbnQuJylcbiAgLm9wdGlvbignLWMsIC0tY2xpZW50IDxjbGllbnQ+JywgJ1RoZSBJRCBvZiB0aGUgY2xpZW50IHRoYXQgb3ducyB0aGlzIHRva2VuLicpXG4gIC5vcHRpb24oJy1zLCAtLXNjb3BlIDxzY29wZT4nLCAnVGhlIHNjb3BlcyBmb3IgdGhpcyB0b2tlbiwgc2VwYXJhdGVkIGJ5IGNvbW1hcy4nKVxuICAuZGVzY3JpcHRpb24oJ0NyZWF0ZSBhIG5ldyBUb2tlbi4nKVxuICAuYWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBUb2tlbih7XG4gICAgICB2YWx1ZTogYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpLFxuICAgICAgYWNjb3VudElkOiBhcmdzLm9wdGlvbnMuYWNjb3VudCxcbiAgICAgIGNsaWVudElkOiBhcmdzLm9wdGlvbnMuY2xpZW50LFxuICAgICAgc2NvcGU6IGFyZ3Mub3B0aW9ucy5zY29wZS5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJylcbiAgICB9KS5zYXZlKCk7XG5cbiAgICB0aGlzLmxvZyh0b2tlbik7XG4gIH0pO1xuXG5jbGlcbiAgLmNvbW1hbmQoJ2ZwJylcbiAgLm9wdGlvbignLXUsIC0tdXNlcm5hbWUgPHVzZXJuYW1lPicsICdBY2NvdW50IHVzZXJuYW1lLicpXG4gIC5vcHRpb24oJy1lLCAtLWVtYWlsIDxlbWFpbD4nLCAnUHJvZmlsZSBlbWFpbC4nKVxuICAub3B0aW9uKCctZiwgLS1maXJzdCA8Zmlyc3Q+JywgJ1Byb2ZpbGUgZmlyc3QgbmFtZS4nKVxuICAub3B0aW9uKCctbCwgLS1sYXN0IDxsYXN0PicsICdQcm9maWxlIGxhc3QgbmFtZS4nKVxuICAub3B0aW9uKCctbiwgLS1uYW1lIDxuYW1lPicsICdDbGllbnQgbmFtZS4nKVxuICAuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIGF1dGggY3JlZGVudGlhbHMgZm9yIGEgZmlyc3QtcGFydHkgY2xpZW50LicpXG4gIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgIGNvbnN0IHBhc3N3b3JkID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnByb21wdCh7XG4gICAgICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgIG5hbWU6ICdwYXNzd29yZCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFbnRlciBhIHBhc3N3b3JkIGZvciB0aGUgYWNjb3VudCdcbiAgICAgIH0sIHJlc3VsdCA9PiByZXNvbHZlKHJlc3VsdC5wYXNzd29yZCkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IG5ldyBBY2NvdW50KHtcbiAgICAgIHVzZXJuYW1lOiBhcmdzLm9wdGlvbnMudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogYXdhaXQgY3J5cHQuZW5jcnlwdFBhc3N3b3JkKHBhc3N3b3JkKSxcbiAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgZW1haWw6IGFyZ3Mub3B0aW9ucy5lbWFpbCxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIGZpcnN0OiBhcmdzLm9wdGlvbnMuZmlyc3QsXG4gICAgICAgICAgbGFzdDogYXJncy5vcHRpb25zLmxhc3RcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLnNhdmVBbGwoKTtcblxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IG5ldyBDbGllbnQoe1xuICAgICAgbmFtZTogYXJncy5vcHRpb25zLm5hbWUsXG4gICAgICBzZWNyZXQ6IGF3YWl0IGNyeXB0LmdlbmVyYXRlU2VjcmV0KCksXG4gICAgICBhY2NvdW50SWQ6IGFjY291bnQuaWRcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBUb2tlbih7XG4gICAgICB2YWx1ZTogYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpLFxuICAgICAgYWNjb3VudElkOiBhY2NvdW50LmlkLFxuICAgICAgY2xpZW50SWQ6IGNsaWVudC5pZCxcbiAgICAgIHNjb3BlOiBzY29wZXMuQUxMXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgdGhpcy5sb2coJ0NsaWVudCBJRDonLCBjbGllbnQuaWQpO1xuICAgIHRoaXMubG9nKCdDbGllbnQgU2VjcmV0OicsIGNsaWVudC5zZWNyZXQpO1xuICAgIHRoaXMubG9nKCdUb2tlbjonLCB0b2tlbi52YWx1ZSk7XG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGk7XG4vLyAkbGFiOmNvdmVyYWdlOm9uJFxuIl19