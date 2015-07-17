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

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsClient = require('../models/client');

var _modelsClient2 = _interopRequireDefault(_modelsClient);

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

exports['default'] = {

  account: _bluebird.coroutine(function* (username, password) {
    return yield new _modelsAccount2['default']({
      username: username,
      password: yield _crypt2['default'].encryptPassword(password)
    }).save();
  }),

  client: _bluebird.coroutine(function* (name, accountId) {
    return yield new _modelsClient2['default']({
      name: name,
      secret: yield _crypt2['default'].generateSecret(),
      accountId: accountId
    }).save();
  }),

  token: _bluebird.coroutine(function* (accountId, clientId, scope, entity) {
    return yield new _modelsToken2['default']({
      value: yield _crypt2['default'].generateToken(),
      accountId: accountId,
      clientId: clientId,
      scope: scope,
      entity: entity
    }).save();
  }),

  firstPartyCredentials: _bluebird.coroutine(function* (username, password, name) {
    var account = yield this.account(username, password);
    var client = yield this.client(name, account.id);
    var token = yield this.token(account.id, client.id, _scopes2['default'].all, _entities2['default'].FIRST_PARTY);

    return {
      account: account,
      client: client,
      token: token
    };
  }),

  thirdPartyCredentials: _bluebird.coroutine(function* (username, password, name) {
    var account = yield this.account(username, password);
    var client = yield this.client(name, account.id);
    var token = yield this.token(account.id, client.id, _scopes2['default'].all, _entities2['default'].THIRD_PARTY);

    return {
      account: account,
      client: client,
      token: token
    };
  })

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dlbmVyYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7cUJBQWtCLFNBQVM7Ozs7c0JBRVIsVUFBVTs7Ozt3QkFDUixZQUFZOzs7OzZCQUViLG1CQUFtQjs7Ozs0QkFDcEIsa0JBQWtCOzs7OzJCQUNuQixpQkFBaUI7Ozs7cUJBRXBCOztBQUViLFNBQU8sc0JBQUUsV0FBZSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFdBQU8sTUFBTSwrQkFBWTtBQUN2QixjQUFRLEVBQUUsUUFBUTtBQUNsQixjQUFRLEVBQUUsTUFBTSxtQkFBTSxlQUFlLENBQUMsUUFBUSxDQUFDO0tBQ2hELENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNYLENBQUE7O0FBRUQsUUFBTSxzQkFBRSxXQUFlLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDdEMsV0FBTyxNQUFNLDhCQUFXO0FBQ3RCLFVBQUksRUFBRSxJQUFJO0FBQ1YsWUFBTSxFQUFFLE1BQU0sbUJBQU0sY0FBYyxFQUFFO0FBQ3BDLGVBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNYLENBQUE7O0FBRUQsT0FBSyxzQkFBRSxXQUFlLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUN4RCxXQUFPLE1BQU0sNkJBQVU7QUFDckIsV0FBSyxFQUFFLE1BQU0sbUJBQU0sYUFBYSxFQUFFO0FBQ2xDLGVBQVMsRUFBRSxTQUFTO0FBQ3BCLGNBQVEsRUFBRSxRQUFRO0FBQ2xCLFdBQUssRUFBRSxLQUFLO0FBQ1osWUFBTSxFQUFFLE1BQU07S0FDZixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWCxDQUFBOztBQUVELHVCQUFxQixzQkFBRSxXQUFlLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQzlELFFBQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkQsUUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQsUUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxvQkFBTyxHQUFHLEVBQUUsc0JBQVMsV0FBVyxDQUFDLENBQUM7O0FBRXhGLFdBQU87QUFDTCxhQUFPLEVBQVAsT0FBTztBQUNQLFlBQU0sRUFBTixNQUFNO0FBQ04sV0FBSyxFQUFMLEtBQUs7S0FDTixDQUFDO0dBQ0gsQ0FBQTs7QUFFRCx1QkFBcUIsc0JBQUUsV0FBZSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtBQUM5RCxRQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELFFBQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELFFBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsb0JBQU8sR0FBRyxFQUFFLHNCQUFTLFdBQVcsQ0FBQyxDQUFDOztBQUV4RixXQUFPO0FBQ0wsYUFBTyxFQUFQLE9BQU87QUFDUCxZQUFNLEVBQU4sTUFBTTtBQUNOLFdBQUssRUFBTCxLQUFLO0tBQ04sQ0FBQztHQUNILENBQUE7O0NBRUYiLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHQgZnJvbSAnLi9jcnlwdCc7XG5cbmltcG9ydCBzY29wZXMgZnJvbSAnLi9zY29wZXMnO1xuaW1wb3J0IGVudGl0aWVzIGZyb20gJy4vZW50aXRpZXMnO1xuXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuLi9tb2RlbHMvYWNjb3VudCc7XG5pbXBvcnQgQ2xpZW50IGZyb20gJy4uL21vZGVscy9jbGllbnQnO1xuaW1wb3J0IFRva2VuIGZyb20gJy4uL21vZGVscy90b2tlbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBhY2NvdW50OiBhc3luYyBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IEFjY291bnQoe1xuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGF3YWl0IGNyeXB0LmVuY3J5cHRQYXNzd29yZChwYXNzd29yZClcbiAgICB9KS5zYXZlKCk7XG4gIH0sXG5cbiAgY2xpZW50OiBhc3luYyBmdW5jdGlvbihuYW1lLCBhY2NvdW50SWQpIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IENsaWVudCh7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgc2VjcmV0OiBhd2FpdCBjcnlwdC5nZW5lcmF0ZVNlY3JldCgpLFxuICAgICAgYWNjb3VudElkOiBhY2NvdW50SWRcbiAgICB9KS5zYXZlKCk7XG4gIH0sXG5cbiAgdG9rZW46IGFzeW5jIGZ1bmN0aW9uKGFjY291bnRJZCwgY2xpZW50SWQsIHNjb3BlLCBlbnRpdHkpIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IFRva2VuKHtcbiAgICAgIHZhbHVlOiBhd2FpdCBjcnlwdC5nZW5lcmF0ZVRva2VuKCksXG4gICAgICBhY2NvdW50SWQ6IGFjY291bnRJZCxcbiAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIGVudGl0eTogZW50aXR5XG4gICAgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIGZpcnN0UGFydHlDcmVkZW50aWFsczogYXN5bmMgZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBuYW1lKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuYWNjb3VudCh1c2VybmFtZSwgcGFzc3dvcmQpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMuY2xpZW50KG5hbWUsIGFjY291bnQuaWQpO1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy50b2tlbihhY2NvdW50LmlkLCBjbGllbnQuaWQsIHNjb3Blcy5hbGwsIGVudGl0aWVzLkZJUlNUX1BBUlRZKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhY2NvdW50LFxuICAgICAgY2xpZW50LFxuICAgICAgdG9rZW5cbiAgICB9O1xuICB9LFxuXG4gIHRoaXJkUGFydHlDcmVkZW50aWFsczogYXN5bmMgZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBuYW1lKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuYWNjb3VudCh1c2VybmFtZSwgcGFzc3dvcmQpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMuY2xpZW50KG5hbWUsIGFjY291bnQuaWQpO1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy50b2tlbihhY2NvdW50LmlkLCBjbGllbnQuaWQsIHNjb3Blcy5hbGwsIGVudGl0aWVzLlRISVJEX1BBUlRZKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhY2NvdW50LFxuICAgICAgY2xpZW50LFxuICAgICAgdG9rZW5cbiAgICB9O1xuICB9XG5cbn07XG4iXX0=