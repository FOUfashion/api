'use strict';

var _bluebird = require('bluebird');

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

// Basic auth
cli.auth('basic', {
  users: [{
    user: process.env.API_CLI_USER,
    pass: process.env.API_CLI_PASS
  }]
});

// $lab:coverage:off$
cli.command('account').option('-u, --username <username>', 'Account username.').description('Create a new Account.').action(_bluebird.coroutine(function* (args) {
  var _this = this;

  var password = yield new _Promise(function (resolve) {
    _this.prompt({
      type: 'password',
      name: 'password',
      message: 'Enter a password for the account'
    }, resolve);
  });

  var account = yield _generate2['default'].account(args.options.username, password);
  console.log(account);
}));

cli.command('client').option('-n, --name <name>', 'Client name.').option('-a, --account <account>', 'The ID of the account that owns this client.').description('Create a new Client.').action(_bluebird.coroutine(function* (args) {
  var client = yield _generate2['default'].client(args.options.name, args.options.account);
  console.log(client);
}));

cli.command('token').option('-a, --account <account>', 'The ID of the account that owns this client.').option('-c, --client <client>', 'The ID of the client that owns this token.').option('-s, --scope <scope>', 'The scopes for this token, separated by commas.').description('Create a new Token.').action(_bluebird.coroutine(function* (args) {
  var accountId = args.options.account;
  var clientId = args.options.client;
  var scope = args.options.scope.replace(/\s/g, '').split(',');
  var token = yield this.token(accountId, clientId, scope);
  console.log(token);
}));

cli.command('fp').option('-u, --username <username>', 'Account username.').option('-n, --name <name>', 'Client name.').description('Generate auth credentials for a first-party client.').action(_bluebird.coroutine(function* (args) {
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

  var fp = yield _generate2['default'].firstPartyCredentials(args.options.username, password, args.options.name);

  console.log('Client ID:', fp.client.id);
  console.log('Client Secret:', fp.client.secret);
  console.log('Token:', fp.token.value);
}));

exports['default'] = cli;

// $lab:coverage:on$
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NsaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7d0JBQ1IsWUFBWTs7OztBQUVqQyxJQUFNLE1BQU0sK25DQWNxRSxDQUFDOztBQUVsRixJQUFNLEdBQUcsR0FBRywwQkFBYSxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLE9BQUssRUFBRSxDQUFDO0FBQ04sUUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtBQUM5QixRQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO0dBQy9CLENBQUM7Q0FDSCxDQUFDLENBQUM7OztBQUdILEdBQUcsQ0FDQSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ2xCLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxtQkFBbUIsQ0FBQyxDQUN4RCxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FDcEMsTUFBTSxxQkFBQyxXQUFlLElBQUksRUFBRTs7O0FBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBWSxVQUFBLE9BQU8sRUFBSTtBQUM1QyxVQUFLLE1BQU0sQ0FBQztBQUNWLFVBQUksRUFBRSxVQUFVO0FBQ2hCLFVBQUksRUFBRSxVQUFVO0FBQ2hCLGFBQU8sRUFBRSxrQ0FBa0M7S0FDNUMsRUFBRSxPQUFPLENBQUMsQ0FBQztHQUNiLENBQUMsQ0FBQzs7QUFFSCxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4RSxTQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3RCLEVBQUMsQ0FBQzs7QUFFTCxHQUFHLENBQ0EsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUNqQixNQUFNLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQzNDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNqRixXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FDbkMsTUFBTSxxQkFBQyxXQUFlLElBQUksRUFBRTtBQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlFLFNBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDckIsRUFBQyxDQUFDOztBQUVMLEdBQUcsQ0FDQSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ2hCLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNqRixNQUFNLENBQUMsdUJBQXVCLEVBQUUsNENBQTRDLENBQUMsQ0FDN0UsTUFBTSxDQUFDLHFCQUFxQixFQUFFLGlEQUFpRCxDQUFDLENBQ2hGLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNsQyxNQUFNLHFCQUFDLFdBQWUsSUFBSSxFQUFFO0FBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ3JDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNELFNBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDcEIsRUFBQyxDQUFDOztBQUVMLEdBQUcsQ0FDQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQ2IsTUFBTSxDQUFDLDJCQUEyQixFQUFFLG1CQUFtQixDQUFDLENBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FDM0MsV0FBVyxDQUFDLHFEQUFxRCxDQUFDLENBQ2xFLE1BQU0scUJBQUMsV0FBZSxJQUFJLEVBQUU7OztBQUMzQixNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQVksVUFBQSxPQUFPLEVBQUk7QUFDNUMsV0FBSyxNQUFNLENBQUM7QUFDVixVQUFJLEVBQUUsVUFBVTtBQUNoQixVQUFJLEVBQUUsVUFBVTtBQUNoQixhQUFPLEVBQUUsa0NBQWtDO0tBQzVDLEVBQUUsVUFBQSxNQUFNO2FBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FBQSxDQUFDLENBQUM7R0FDeEMsQ0FBQyxDQUFDOztBQUVILE1BQU0sRUFBRSxHQUFHLE1BQU0sc0JBQVMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXBHLFNBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEMsU0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELFNBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdkMsRUFBQyxDQUFDOztxQkFFVSxHQUFHIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYW50YWdlIGZyb20gJ3ZhbnRhZ2UnO1xuaW1wb3J0IGdlbmVyYXRlIGZyb20gJy4vZ2VuZXJhdGUnO1xuXG5jb25zdCBiYW5uZXIgPVxuYCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAjIyMjIyMjIyAgIyMjIyMjIyAgIyMgICAgICMjICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIyMgICAgICAgIyMgICAgICMjICMjICAgICAjIyAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICMjIyMjIyAgICMjICAgICAjIyAjIyAgICAgIyMgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICAgICMjICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgIyMgICAgICAgICMjIyMjIyMgICAjIyMjIyMjICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgV2VsY29tZSB0byBGT1UuZmFzaGlvbiBBUEkgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgICAgICAgICAgICAgQWxsIGNvbm5lY3Rpb25zIGFyZSBtb25pdG9yZWQgYW5kIHJlY29yZGVkICAgICAgICAgICAgICAgICAgI1xuIyAgICAgICAgICAgRGlzY29ubmVjdCBJTU1FRElBVEVMWSBpZiB5b3UgYXJlIG5vdCBhbiBhdXRob3JpemVkIHVzZXIgICAgICAgICAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI2A7XG5cbmNvbnN0IGNsaSA9IG5ldyBWYW50YWdlKCk7XG5jbGkuZGVsaW1pdGVyKCdhcGl+JCcpO1xuY2xpLmJhbm5lcihiYW5uZXIpO1xuXG4vLyBCYXNpYyBhdXRoXG5jbGkuYXV0aCgnYmFzaWMnLCB7XG4gIHVzZXJzOiBbe1xuICAgIHVzZXI6IHByb2Nlc3MuZW52LkFQSV9DTElfVVNFUixcbiAgICBwYXNzOiBwcm9jZXNzLmVudi5BUElfQ0xJX1BBU1NcbiAgfV1cbn0pO1xuXG4vLyAkbGFiOmNvdmVyYWdlOm9mZiRcbmNsaVxuICAuY29tbWFuZCgnYWNjb3VudCcpXG4gIC5vcHRpb24oJy11LCAtLXVzZXJuYW1lIDx1c2VybmFtZT4nLCAnQWNjb3VudCB1c2VybmFtZS4nKVxuICAuZGVzY3JpcHRpb24oJ0NyZWF0ZSBhIG5ldyBBY2NvdW50LicpXG4gIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgIGNvbnN0IHBhc3N3b3JkID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnByb21wdCh7XG4gICAgICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgIG5hbWU6ICdwYXNzd29yZCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFbnRlciBhIHBhc3N3b3JkIGZvciB0aGUgYWNjb3VudCdcbiAgICAgIH0sIHJlc29sdmUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IGdlbmVyYXRlLmFjY291bnQoYXJncy5vcHRpb25zLnVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgY29uc29sZS5sb2coYWNjb3VudCk7XG4gIH0pO1xuXG5jbGlcbiAgLmNvbW1hbmQoJ2NsaWVudCcpXG4gIC5vcHRpb24oJy1uLCAtLW5hbWUgPG5hbWU+JywgJ0NsaWVudCBuYW1lLicpXG4gIC5vcHRpb24oJy1hLCAtLWFjY291bnQgPGFjY291bnQ+JywgJ1RoZSBJRCBvZiB0aGUgYWNjb3VudCB0aGF0IG93bnMgdGhpcyBjbGllbnQuJylcbiAgLmRlc2NyaXB0aW9uKCdDcmVhdGUgYSBuZXcgQ2xpZW50LicpXG4gIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdlbmVyYXRlLmNsaWVudChhcmdzLm9wdGlvbnMubmFtZSwgYXJncy5vcHRpb25zLmFjY291bnQpO1xuICAgIGNvbnNvbGUubG9nKGNsaWVudCk7XG4gIH0pO1xuXG5jbGlcbiAgLmNvbW1hbmQoJ3Rva2VuJylcbiAgLm9wdGlvbignLWEsIC0tYWNjb3VudCA8YWNjb3VudD4nLCAnVGhlIElEIG9mIHRoZSBhY2NvdW50IHRoYXQgb3ducyB0aGlzIGNsaWVudC4nKVxuICAub3B0aW9uKCctYywgLS1jbGllbnQgPGNsaWVudD4nLCAnVGhlIElEIG9mIHRoZSBjbGllbnQgdGhhdCBvd25zIHRoaXMgdG9rZW4uJylcbiAgLm9wdGlvbignLXMsIC0tc2NvcGUgPHNjb3BlPicsICdUaGUgc2NvcGVzIGZvciB0aGlzIHRva2VuLCBzZXBhcmF0ZWQgYnkgY29tbWFzLicpXG4gIC5kZXNjcmlwdGlvbignQ3JlYXRlIGEgbmV3IFRva2VuLicpXG4gIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgIGNvbnN0IGFjY291bnRJZCA9IGFyZ3Mub3B0aW9ucy5hY2NvdW50O1xuICAgIGNvbnN0IGNsaWVudElkID0gYXJncy5vcHRpb25zLmNsaWVudDtcbiAgICBjb25zdCBzY29wZSA9IGFyZ3Mub3B0aW9ucy5zY29wZS5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLnRva2VuKGFjY291bnRJZCwgY2xpZW50SWQsIHNjb3BlKTtcbiAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gIH0pO1xuXG5jbGlcbiAgLmNvbW1hbmQoJ2ZwJylcbiAgLm9wdGlvbignLXUsIC0tdXNlcm5hbWUgPHVzZXJuYW1lPicsICdBY2NvdW50IHVzZXJuYW1lLicpXG4gIC5vcHRpb24oJy1uLCAtLW5hbWUgPG5hbWU+JywgJ0NsaWVudCBuYW1lLicpXG4gIC5kZXNjcmlwdGlvbignR2VuZXJhdGUgYXV0aCBjcmVkZW50aWFscyBmb3IgYSBmaXJzdC1wYXJ0eSBjbGllbnQuJylcbiAgLmFjdGlvbihhc3luYyBmdW5jdGlvbihhcmdzKSB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucHJvbXB0KHtcbiAgICAgICAgdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJyxcbiAgICAgICAgbWVzc2FnZTogJ0VudGVyIGEgcGFzc3dvcmQgZm9yIHRoZSBhY2NvdW50J1xuICAgICAgfSwgcmVzdWx0ID0+IHJlc29sdmUocmVzdWx0LnBhc3N3b3JkKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBmcCA9IGF3YWl0IGdlbmVyYXRlLmZpcnN0UGFydHlDcmVkZW50aWFscyhhcmdzLm9wdGlvbnMudXNlcm5hbWUsIHBhc3N3b3JkLCBhcmdzLm9wdGlvbnMubmFtZSk7XG5cbiAgICBjb25zb2xlLmxvZygnQ2xpZW50IElEOicsIGZwLmNsaWVudC5pZCk7XG4gICAgY29uc29sZS5sb2coJ0NsaWVudCBTZWNyZXQ6JywgZnAuY2xpZW50LnNlY3JldCk7XG4gICAgY29uc29sZS5sb2coJ1Rva2VuOicsIGZwLnRva2VuLnZhbHVlKTtcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsaTtcbi8vICRsYWI6Y292ZXJhZ2U6b24kXG4iXX0=