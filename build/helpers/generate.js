'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

exports['default'] = {

  account: _bluebird.coroutine(function* (username, password, profile) {
    return yield new _modelsAccount2['default']({
      username: username,
      password: yield _crypt2['default'].encryptPassword(password),
      profile: profile
    }).saveAll();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dlbmVyYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7c0JBQW1CLFVBQVU7Ozs7cUJBQ1gsU0FBUzs7Ozs2QkFFUCxtQkFBbUI7Ozs7NkJBQ25CLG1CQUFtQjs7Ozs0QkFDcEIsa0JBQWtCOzs7OzJCQUNuQixpQkFBaUI7Ozs7cUJBRXBCOztBQUViLFNBQU8sc0JBQUUsV0FBZSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNuRCxXQUFPLE1BQU0sK0JBQVk7QUFDdkIsY0FBUSxFQUFFLFFBQVE7QUFDbEIsY0FBUSxFQUFFLE1BQU0sbUJBQU0sZUFBZSxDQUFDLFFBQVEsQ0FBQztBQUMvQyxhQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDZCxDQUFBOztBQUVELFFBQU0sc0JBQUUsV0FBZSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3RDLFdBQU8sTUFBTSw4QkFBVztBQUN0QixVQUFJLEVBQUUsSUFBSTtBQUNWLFlBQU0sRUFBRSxNQUFNLG1CQUFNLGNBQWMsRUFBRTtBQUNwQyxlQUFTLEVBQUUsU0FBUztLQUNyQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWCxDQUFBOztBQUVELE9BQUssc0JBQUUsV0FBZSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUNoRCxXQUFPLE1BQU0sNkJBQVU7QUFDckIsV0FBSyxFQUFFLE1BQU0sbUJBQU0sYUFBYSxFQUFFO0FBQ2xDLGVBQVMsRUFBRSxTQUFTO0FBQ3BCLGNBQVEsRUFBRSxRQUFRO0FBQ2xCLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ1gsQ0FBQTs7QUFFRCx1QkFBcUIsRUFBRSwrQkFBUyxJQUFJLEVBQUU7QUFDcEMsV0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsb0JBQU8sV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDckQ7O0FBRUQsdUJBQXFCLEVBQUUsK0JBQVMsSUFBSSxFQUFFO0FBQ3BDLFdBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG9CQUFPLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3JEOztBQUVELGFBQVcsc0JBQUUsV0FBZSxLQUFLLEVBQUUsSUFBMkMsRUFBRTtRQUEzQyxRQUFRLEdBQVYsSUFBMkMsQ0FBekMsUUFBUTtRQUFFLFFBQVEsR0FBcEIsSUFBMkMsQ0FBL0IsUUFBUTtRQUFFLFVBQVUsR0FBaEMsSUFBMkMsQ0FBckIsVUFBVTtRQUFFLE9BQU8sR0FBekMsSUFBMkMsQ0FBVCxPQUFPOztBQUMxRSxRQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRSxXQUFPLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDOztBQUV2QyxRQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN6RCxRQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU3RCxXQUFPO0FBQ0wsYUFBTyxFQUFQLE9BQU87QUFDUCxZQUFNLEVBQU4sTUFBTTtBQUNOLFdBQUssRUFBTCxLQUFLO0tBQ04sQ0FBQztHQUNILENBQUE7O0NBRUYiLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2NvcGVzIGZyb20gJy4vc2NvcGVzJztcbmltcG9ydCBjcnlwdCBmcm9tICcuL2NyeXB0JztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi4vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vbW9kZWxzL3Byb2ZpbGUnO1xuaW1wb3J0IENsaWVudCBmcm9tICcuLi9tb2RlbHMvY2xpZW50JztcbmltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgYWNjb3VudDogYXN5bmMgZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBwcm9maWxlKSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBBY2NvdW50KHtcbiAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBhd2FpdCBjcnlwdC5lbmNyeXB0UGFzc3dvcmQocGFzc3dvcmQpLFxuICAgICAgcHJvZmlsZTogcHJvZmlsZVxuICAgIH0pLnNhdmVBbGwoKTtcbiAgfSxcblxuICBjbGllbnQ6IGFzeW5jIGZ1bmN0aW9uKG5hbWUsIGFjY291bnRJZCkge1xuICAgIHJldHVybiBhd2FpdCBuZXcgQ2xpZW50KHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBzZWNyZXQ6IGF3YWl0IGNyeXB0LmdlbmVyYXRlU2VjcmV0KCksXG4gICAgICBhY2NvdW50SWQ6IGFjY291bnRJZFxuICAgIH0pLnNhdmUoKTtcbiAgfSxcblxuICB0b2tlbjogYXN5bmMgZnVuY3Rpb24oYWNjb3VudElkLCBjbGllbnRJZCwgc2NvcGUpIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IFRva2VuKHtcbiAgICAgIHZhbHVlOiBhd2FpdCBjcnlwdC5nZW5lcmF0ZVRva2VuKCksXG4gICAgICBhY2NvdW50SWQ6IGFjY291bnRJZCxcbiAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgIHNjb3BlOiBzY29wZVxuICAgIH0pLnNhdmUoKTtcbiAgfSxcblxuICBmaXJzdFBhcnR5Q3JlZGVudGlhbHM6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVkZW50aWFscyhbc2NvcGVzLkZJUlNUX1BBUlRZXSwgZGF0YSk7XG4gIH0sXG5cbiAgdGhpcmRQYXJ0eUNyZWRlbnRpYWxzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbHMoW3Njb3Blcy5USElSRF9QQVJUWV0sIGRhdGEpO1xuICB9LFxuXG4gIGNyZWRlbnRpYWxzOiBhc3luYyBmdW5jdGlvbihzY29wZSwgeyB1c2VybmFtZSwgcGFzc3dvcmQsIGNsaWVudE5hbWUsIHByb2ZpbGUgfSkge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmFjY291bnQodXNlcm5hbWUsIHBhc3N3b3JkLCBwcm9maWxlKTtcbiAgICBhY2NvdW50LnVuZW5jcnlwdGVkUGFzc3dvcmQgPSBwYXNzd29yZDtcblxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMuY2xpZW50KGNsaWVudE5hbWUsIGFjY291bnQuaWQpO1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy50b2tlbihhY2NvdW50LmlkLCBjbGllbnQuaWQsIHNjb3BlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhY2NvdW50LFxuICAgICAgY2xpZW50LFxuICAgICAgdG9rZW5cbiAgICB9O1xuICB9XG5cbn07XG4iXX0=