'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _vantage = require('vantage');

var _vantage2 = _interopRequireDefault(_vantage);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

var banner = '################################################################################\n#                                                                              #\n#                         ########  #######  ##     ##                         #\n#                         ##       ##     ## ##     ##                         #\n#                         ######   ##     ## ##     ##                         #\n#                         ##       ##     ## ##     ##                         #\n#                         ##        #######   #######                          #\n#                                                                              #\n#                          Welcome to FOU.fashion API                          #\n#                                                                              #\n#                  All connections are monitored and recorded                  #\n#           Disconnect IMMEDIATELY if you are not an authorized user           #\n#                                                                              #\n################################################################################';

var cli = new _vantage2['default']();
cli.delimiter('api~$');
cli.banner(banner);

// $lab:coverage:off$
cli.command('account').option('-u, --username <username>', 'Account username.').description('Create a new Account.').action(function callee$0$0(args) {
  var password, account;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(new _Promise(function (resolve) {
          _this.prompt({
            type: 'password',
            name: 'password',
            message: 'Enter a password for the account'
          }, resolve);
        }));

      case 2:
        password = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_generate2['default'].account(args.options.username, password));

      case 5:
        account = context$1$0.sent;

        console.log(account);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

cli.command('client').option('-n, --name <name>', 'Client name.').option('-a, --account <account>', 'The ID of the account that owns this client.').description('Create a new Client.').action(function callee$0$0(args) {
  var client;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_generate2['default'].client(args.options.name, args.options.account));

      case 2:
        client = context$1$0.sent;

        console.log(client);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

cli.command('token').option('-a, --account <account>', 'The ID of the account that owns this client.').option('-c, --client <client>', 'The ID of the client that owns this token.').option('-s, --scope <scope>', 'The scopes for this token, separated by commas.').option('-e, --entity <entity>', 'The entity type for this token. Can be `app`, `user` or `any`.').description('Create a new Token.').action(function callee$0$0(args) {
  var accountId, clientId, scope, entity, token;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        accountId = args.options.account;
        clientId = args.options.client;
        scope = args.options.scope.replace(/\s/g, '').split(',');
        entity = args.options.entity;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.token(accountId, clientId, scope, entity));

      case 6:
        token = context$1$0.sent;

        console.log(token);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

cli.command('fp').option('-u, --username <username>', 'Account username.').option('-n, --name <name>', 'Client name.').description('Generate auth credentials for a first-party client.').action(function callee$0$0(args) {
  var password, fp;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(new _Promise(function (resolve) {
          _this2.prompt({
            type: 'password',
            name: 'password',
            message: 'Enter a password for the account'
          }, function (result) {
            return resolve(result.password);
          });
        }));

      case 2:
        password = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_generate2['default'].firstPartyCredentials(args.options.username, password, args.options.name));

      case 5:
        fp = context$1$0.sent;

        console.log('Client ID:', fp.client.id);
        console.log('Client Secret:', fp.client.secret);
        console.log('Token:', fp.token.value);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

exports['default'] = cli;

// $lab:coverage:on$
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NsaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7d0JBQ1IsWUFBWTs7OztBQUVqQyxJQUFNLE1BQU0sK25DQWNxRSxDQUFDOztBQUVsRixJQUFNLEdBQUcsR0FBRywwQkFBYSxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR25CLEdBQUcsQ0FDQSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ2xCLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxtQkFBbUIsQ0FBQyxDQUN4RCxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FDcEMsTUFBTSxDQUFDLG9CQUFlLElBQUk7TUFDbkIsUUFBUSxFQVFSLE9BQU87Ozs7Ozs7eUNBUlUsYUFBWSxVQUFBLE9BQU8sRUFBSTtBQUM1QyxnQkFBSyxNQUFNLENBQUM7QUFDVixnQkFBSSxFQUFFLFVBQVU7QUFDaEIsZ0JBQUksRUFBRSxVQUFVO0FBQ2hCLG1CQUFPLEVBQUUsa0NBQWtDO1dBQzVDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDYixDQUFDOzs7QUFOSSxnQkFBUTs7eUNBUVEsc0JBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQzs7O0FBQWpFLGVBQU87O0FBQ2IsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7OztDQUN0QixDQUFDLENBQUM7O0FBRUwsR0FBRyxDQUNBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDakIsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUMzQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsOENBQThDLENBQUMsQ0FDakYsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQ25DLE1BQU0sQ0FBQyxvQkFBZSxJQUFJO01BQ25CLE1BQU07Ozs7O3lDQUFTLHNCQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7O0FBQXZFLGNBQU07O0FBQ1osZUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztDQUNyQixDQUFDLENBQUM7O0FBRUwsR0FBRyxDQUNBLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDaEIsTUFBTSxDQUFDLHlCQUF5QixFQUFFLDhDQUE4QyxDQUFDLENBQ2pGLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw0Q0FBNEMsQ0FBQyxDQUM3RSxNQUFNLENBQUMscUJBQXFCLEVBQUUsaURBQWlELENBQUMsQ0FDaEYsTUFBTSxDQUFDLHVCQUF1QixFQUFFLGdFQUFnRSxDQUFDLENBQ2pHLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNsQyxNQUFNLENBQUMsb0JBQWUsSUFBSTtNQUNuQixTQUFTLEVBQ1QsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBRU4sS0FBSzs7OztBQUxMLGlCQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO0FBQ2hDLGdCQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQzlCLGFBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDeEQsY0FBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7eUNBRWQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7OztBQUE1RCxhQUFLOztBQUNYLGVBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Q0FDcEIsQ0FBQyxDQUFDOztBQUVMLEdBQUcsQ0FDQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ2IsTUFBTSxDQUFDLDJCQUEyQixFQUFFLG1CQUFtQixDQUFDLENBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FDM0MsV0FBVyxDQUFDLHFEQUFxRCxDQUFDLENBQ2xFLE1BQU0sQ0FBQyxvQkFBZSxJQUFJO01BQ25CLFFBQVEsRUFRUixFQUFFOzs7Ozs7O3lDQVJlLGFBQVksVUFBQSxPQUFPLEVBQUk7QUFDNUMsaUJBQUssTUFBTSxDQUFDO0FBQ1YsZ0JBQUksRUFBRSxVQUFVO0FBQ2hCLGdCQUFJLEVBQUUsVUFBVTtBQUNoQixtQkFBTyxFQUFFLGtDQUFrQztXQUM1QyxFQUFFLFVBQUEsTUFBTTttQkFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztXQUFBLENBQUMsQ0FBQztTQUN4QyxDQUFDOzs7QUFOSSxnQkFBUTs7eUNBUUcsc0JBQVMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOzs7QUFBN0YsVUFBRTs7QUFFUixlQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLGVBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxlQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0NBQ3ZDLENBQUMsQ0FBQzs7cUJBRVUsR0FBRyIsImZpbGUiOiJjbGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFudGFnZSBmcm9tICd2YW50YWdlJztcbmltcG9ydCBnZW5lcmF0ZSBmcm9tICcuL2dlbmVyYXRlJztcblxuY29uc3QgYmFubmVyID1cbmAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIyMjIyMjIyMgICMjIyMjIyMgICMjICAgICAjIyAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICMjICAgICAgICMjICAgICAjIyAjIyAgICAgIyMgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAjIyMjIyMgICAjIyAgICAgIyMgIyMgICAgICMjICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIyMgICAgICAgIyMgICAgICMjICMjICAgICAjIyAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICMjICAgICAgICAjIyMjIyMjICAgIyMjIyMjIyAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gRk9VLmZhc2hpb24gQVBJICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgIEFsbCBjb25uZWN0aW9ucyBhcmUgbW9uaXRvcmVkIGFuZCByZWNvcmRlZCAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgIERpc2Nvbm5lY3QgSU1NRURJQVRFTFkgaWYgeW91IGFyZSBub3QgYW4gYXV0aG9yaXplZCB1c2VyICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNgO1xuXG5jb25zdCBjbGkgPSBuZXcgVmFudGFnZSgpO1xuY2xpLmRlbGltaXRlcignYXBpfiQnKTtcbmNsaS5iYW5uZXIoYmFubmVyKTtcblxuLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG5jbGlcbiAgLmNvbW1hbmQoJ2FjY291bnQnKVxuICAub3B0aW9uKCctdSwgLS11c2VybmFtZSA8dXNlcm5hbWU+JywgJ0FjY291bnQgdXNlcm5hbWUuJylcbiAgLmRlc2NyaXB0aW9uKCdDcmVhdGUgYSBuZXcgQWNjb3VudC4nKVxuICAuYWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5wcm9tcHQoe1xuICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICBuYW1lOiAncGFzc3dvcmQnLFxuICAgICAgICBtZXNzYWdlOiAnRW50ZXIgYSBwYXNzd29yZCBmb3IgdGhlIGFjY291bnQnXG4gICAgICB9LCByZXNvbHZlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBnZW5lcmF0ZS5hY2NvdW50KGFyZ3Mub3B0aW9ucy51c2VybmFtZSwgcGFzc3dvcmQpO1xuICAgIGNvbnNvbGUubG9nKGFjY291bnQpO1xuICB9KTtcblxuY2xpXG4gIC5jb21tYW5kKCdjbGllbnQnKVxuICAub3B0aW9uKCctbiwgLS1uYW1lIDxuYW1lPicsICdDbGllbnQgbmFtZS4nKVxuICAub3B0aW9uKCctYSwgLS1hY2NvdW50IDxhY2NvdW50PicsICdUaGUgSUQgb2YgdGhlIGFjY291bnQgdGhhdCBvd25zIHRoaXMgY2xpZW50LicpXG4gIC5kZXNjcmlwdGlvbignQ3JlYXRlIGEgbmV3IENsaWVudC4nKVxuICAuYWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnZW5lcmF0ZS5jbGllbnQoYXJncy5vcHRpb25zLm5hbWUsIGFyZ3Mub3B0aW9ucy5hY2NvdW50KTtcbiAgICBjb25zb2xlLmxvZyhjbGllbnQpO1xuICB9KTtcblxuY2xpXG4gIC5jb21tYW5kKCd0b2tlbicpXG4gIC5vcHRpb24oJy1hLCAtLWFjY291bnQgPGFjY291bnQ+JywgJ1RoZSBJRCBvZiB0aGUgYWNjb3VudCB0aGF0IG93bnMgdGhpcyBjbGllbnQuJylcbiAgLm9wdGlvbignLWMsIC0tY2xpZW50IDxjbGllbnQ+JywgJ1RoZSBJRCBvZiB0aGUgY2xpZW50IHRoYXQgb3ducyB0aGlzIHRva2VuLicpXG4gIC5vcHRpb24oJy1zLCAtLXNjb3BlIDxzY29wZT4nLCAnVGhlIHNjb3BlcyBmb3IgdGhpcyB0b2tlbiwgc2VwYXJhdGVkIGJ5IGNvbW1hcy4nKVxuICAub3B0aW9uKCctZSwgLS1lbnRpdHkgPGVudGl0eT4nLCAnVGhlIGVudGl0eSB0eXBlIGZvciB0aGlzIHRva2VuLiBDYW4gYmUgYGFwcGAsIGB1c2VyYCBvciBgYW55YC4nKVxuICAuZGVzY3JpcHRpb24oJ0NyZWF0ZSBhIG5ldyBUb2tlbi4nKVxuICAuYWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBjb25zdCBhY2NvdW50SWQgPSBhcmdzLm9wdGlvbnMuYWNjb3VudDtcbiAgICBjb25zdCBjbGllbnRJZCA9IGFyZ3Mub3B0aW9ucy5jbGllbnQ7XG4gICAgY29uc3Qgc2NvcGUgPSBhcmdzLm9wdGlvbnMuc2NvcGUucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpO1xuICAgIGNvbnN0IGVudGl0eSA9IGFyZ3Mub3B0aW9ucy5lbnRpdHk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMudG9rZW4oYWNjb3VudElkLCBjbGllbnRJZCwgc2NvcGUsIGVudGl0eSk7XG4gICAgY29uc29sZS5sb2codG9rZW4pO1xuICB9KTtcblxuY2xpXG4gIC5jb21tYW5kKCdmcCcpXG4gIC5vcHRpb24oJy11LCAtLXVzZXJuYW1lIDx1c2VybmFtZT4nLCAnQWNjb3VudCB1c2VybmFtZS4nKVxuICAub3B0aW9uKCctbiwgLS1uYW1lIDxuYW1lPicsICdDbGllbnQgbmFtZS4nKVxuICAuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIGF1dGggY3JlZGVudGlhbHMgZm9yIGEgZmlyc3QtcGFydHkgY2xpZW50LicpXG4gIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgIGNvbnN0IHBhc3N3b3JkID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnByb21wdCh7XG4gICAgICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgIG5hbWU6ICdwYXNzd29yZCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFbnRlciBhIHBhc3N3b3JkIGZvciB0aGUgYWNjb3VudCdcbiAgICAgIH0sIHJlc3VsdCA9PiByZXNvbHZlKHJlc3VsdC5wYXNzd29yZCkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZnAgPSBhd2FpdCBnZW5lcmF0ZS5maXJzdFBhcnR5Q3JlZGVudGlhbHMoYXJncy5vcHRpb25zLnVzZXJuYW1lLCBwYXNzd29yZCwgYXJncy5vcHRpb25zLm5hbWUpO1xuXG4gICAgY29uc29sZS5sb2coJ0NsaWVudCBJRDonLCBmcC5jbGllbnQuaWQpO1xuICAgIGNvbnNvbGUubG9nKCdDbGllbnQgU2VjcmV0OicsIGZwLmNsaWVudC5zZWNyZXQpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbjonLCBmcC50b2tlbi52YWx1ZSk7XG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGk7XG4vLyAkbGFiOmNvdmVyYWdlOm9uJFxuIl19