'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _crypt = require('./crypt');

var _crypt2 = _interopRequireDefault(_crypt);

var _scopes = require('./scopes');

var _scopes2 = _interopRequireDefault(_scopes);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsProfile = require('../models/profile');

var _modelsProfile2 = _interopRequireDefault(_modelsProfile);

var _modelsClient = require('../models/client');

var _modelsClient2 = _interopRequireDefault(_modelsClient);

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

exports['default'] = {

  account: _bluebird.coroutine(function* (username, password, profile) {
    return yield new _modelsAccount2['default']({
      username: username,
      password: yield _crypt2['default'].encryptPassword(password),
      profile: profile
    }).save();
  }),

  profile: _bluebird.coroutine(function* (accountId, email, name) {
    return yield new _modelsProfile2['default']({ accountId: accountId, email: email, name: name }).save();
  }),

  client: _bluebird.coroutine(function* (name, accountId) {
    return yield new _modelsClient2['default']({
      name: name,
      secret: yield _crypt2['default'].generateSecret(),
      accountId: accountId
    }).save();
  }),

  token: _bluebird.coroutine(function* (accountId, clientId, scope) {
    return yield new _modelsToken2['default']({
      value: yield _crypt2['default'].generateToken(),
      accountId: accountId,
      clientId: clientId,
      scope: scope
    }).save();
  }),

  firstPartyCredentials: function firstPartyCredentials(data) {
    return this.credentials([_scopes2['default'].FIRST_PARTY], data);
  },

  thirdPartyCredentials: function thirdPartyCredentials(data) {
    return this.credentials([_scopes2['default'].THIRD_PARTY], data);
  },

  credentials: _bluebird.coroutine(function* (scope, _ref) {
    var username = _ref.username;
    var password = _ref.password;
    var clientName = _ref.clientName;
    var profile = _ref.profile;

    var account = yield this.account(username, password, profile);
    account.unencryptedPassword = password;

    var client = yield this.client(clientName, account.id);
    var token = yield this.token(account.id, client.id, scope);

    return {
      account: account,
      client: client,
      token: token
    };
  })

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dlbmVyYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7cUJBQWtCLFNBQVM7Ozs7c0JBQ1IsVUFBVTs7Ozs2QkFFVCxtQkFBbUI7Ozs7NkJBQ25CLG1CQUFtQjs7Ozs0QkFDcEIsa0JBQWtCOzs7OzJCQUNuQixpQkFBaUI7Ozs7cUJBRXBCOztBQUViLFNBQU8sc0JBQUUsV0FBZSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNuRCxXQUFPLE1BQU0sK0JBQVk7QUFDdkIsY0FBUSxFQUFFLFFBQVE7QUFDbEIsY0FBUSxFQUFFLE1BQU0sbUJBQU0sZUFBZSxDQUFDLFFBQVEsQ0FBQztBQUMvQyxhQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWCxDQUFBOztBQUVELFNBQU8sc0JBQUUsV0FBZSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUM5QyxXQUFPLE1BQU0sK0JBQVksRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDN0QsQ0FBQTs7QUFFRCxRQUFNLHNCQUFFLFdBQWUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN0QyxXQUFPLE1BQU0sOEJBQVc7QUFDdEIsVUFBSSxFQUFFLElBQUk7QUFDVixZQUFNLEVBQUUsTUFBTSxtQkFBTSxjQUFjLEVBQUU7QUFDcEMsZUFBUyxFQUFFLFNBQVM7S0FDckIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ1gsQ0FBQTs7QUFFRCxPQUFLLHNCQUFFLFdBQWUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDaEQsV0FBTyxNQUFNLDZCQUFVO0FBQ3JCLFdBQUssRUFBRSxNQUFNLG1CQUFNLGFBQWEsRUFBRTtBQUNsQyxlQUFTLEVBQUUsU0FBUztBQUNwQixjQUFRLEVBQUUsUUFBUTtBQUNsQixXQUFLLEVBQUUsS0FBSztLQUNiLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNYLENBQUE7O0FBRUQsdUJBQXFCLEVBQUUsK0JBQVMsSUFBSSxFQUFFO0FBQ3BDLFdBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG9CQUFPLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3JEOztBQUVELHVCQUFxQixFQUFFLCtCQUFTLElBQUksRUFBRTtBQUNwQyxXQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxvQkFBTyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNyRDs7QUFFRCxhQUFXLHNCQUFFLFdBQWUsS0FBSyxFQUFFLElBQTJDLEVBQUU7UUFBM0MsUUFBUSxHQUFWLElBQTJDLENBQXpDLFFBQVE7UUFBRSxRQUFRLEdBQXBCLElBQTJDLENBQS9CLFFBQVE7UUFBRSxVQUFVLEdBQWhDLElBQTJDLENBQXJCLFVBQVU7UUFBRSxPQUFPLEdBQXpDLElBQTJDLENBQVQsT0FBTzs7QUFDMUUsUUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEUsV0FBTyxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQzs7QUFFdkMsUUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekQsUUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFN0QsV0FBTztBQUNMLGFBQU8sRUFBUCxPQUFPO0FBQ1AsWUFBTSxFQUFOLE1BQU07QUFDTixXQUFLLEVBQUwsS0FBSztLQUNOLENBQUM7R0FDSCxDQUFBOztDQUVGIiwiZmlsZSI6ImdlbmVyYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0IGZyb20gJy4vY3J5cHQnO1xuaW1wb3J0IHNjb3BlcyBmcm9tICcuL3Njb3Blcyc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4uL21vZGVscy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uL21vZGVscy9wcm9maWxlJztcbmltcG9ydCBDbGllbnQgZnJvbSAnLi4vbW9kZWxzL2NsaWVudCc7XG5pbXBvcnQgVG9rZW4gZnJvbSAnLi4vbW9kZWxzL3Rva2VuJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIGFjY291bnQ6IGFzeW5jIGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgcHJvZmlsZSkge1xuICAgIHJldHVybiBhd2FpdCBuZXcgQWNjb3VudCh7XG4gICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogYXdhaXQgY3J5cHQuZW5jcnlwdFBhc3N3b3JkKHBhc3N3b3JkKSxcbiAgICAgIHByb2ZpbGU6IHByb2ZpbGVcbiAgICB9KS5zYXZlKCk7XG4gIH0sXG5cbiAgcHJvZmlsZTogYXN5bmMgZnVuY3Rpb24oYWNjb3VudElkLCBlbWFpbCwgbmFtZSkge1xuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvZmlsZSh7IGFjY291bnRJZCwgZW1haWwsIG5hbWUgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIGNsaWVudDogYXN5bmMgZnVuY3Rpb24obmFtZSwgYWNjb3VudElkKSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBDbGllbnQoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHNlY3JldDogYXdhaXQgY3J5cHQuZ2VuZXJhdGVTZWNyZXQoKSxcbiAgICAgIGFjY291bnRJZDogYWNjb3VudElkXG4gICAgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIHRva2VuOiBhc3luYyBmdW5jdGlvbihhY2NvdW50SWQsIGNsaWVudElkLCBzY29wZSkge1xuICAgIHJldHVybiBhd2FpdCBuZXcgVG9rZW4oe1xuICAgICAgdmFsdWU6IGF3YWl0IGNyeXB0LmdlbmVyYXRlVG9rZW4oKSxcbiAgICAgIGFjY291bnRJZDogYWNjb3VudElkLFxuICAgICAgY2xpZW50SWQ6IGNsaWVudElkLFxuICAgICAgc2NvcGU6IHNjb3BlXG4gICAgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIGZpcnN0UGFydHlDcmVkZW50aWFsczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmNyZWRlbnRpYWxzKFtzY29wZXMuRklSU1RfUEFSVFldLCBkYXRhKTtcbiAgfSxcblxuICB0aGlyZFBhcnR5Q3JlZGVudGlhbHM6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVkZW50aWFscyhbc2NvcGVzLlRISVJEX1BBUlRZXSwgZGF0YSk7XG4gIH0sXG5cbiAgY3JlZGVudGlhbHM6IGFzeW5jIGZ1bmN0aW9uKHNjb3BlLCB7IHVzZXJuYW1lLCBwYXNzd29yZCwgY2xpZW50TmFtZSwgcHJvZmlsZSB9KSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuYWNjb3VudCh1c2VybmFtZSwgcGFzc3dvcmQsIHByb2ZpbGUpO1xuICAgIGFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZCA9IHBhc3N3b3JkO1xuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5jbGllbnQoY2xpZW50TmFtZSwgYWNjb3VudC5pZCk7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLnRva2VuKGFjY291bnQuaWQsIGNsaWVudC5pZCwgc2NvcGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY291bnQsXG4gICAgICBjbGllbnQsXG4gICAgICB0b2tlblxuICAgIH07XG4gIH1cblxufTtcbiJdfQ==