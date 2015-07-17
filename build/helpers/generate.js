'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

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

  account: function account(username, password) {
    return _regeneratorRuntime.async(function account$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.t0 = _regeneratorRuntime;
          context$1$0.t1 = _modelsAccount2['default'];
          context$1$0.t2 = username;
          context$1$0.next = 5;
          return _regeneratorRuntime.awrap(_crypt2['default'].encryptPassword(password));

        case 5:
          context$1$0.t3 = context$1$0.sent;
          context$1$0.t4 = {
            username: context$1$0.t2,
            password: context$1$0.t3
          };
          context$1$0.t5 = new context$1$0.t1(context$1$0.t4).save();
          context$1$0.next = 10;
          return context$1$0.t0.awrap.call(context$1$0.t0, context$1$0.t5);

        case 10:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 11:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },

  client: function client(name, accountId) {
    return _regeneratorRuntime.async(function client$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.t0 = _regeneratorRuntime;
          context$1$0.t1 = _modelsClient2['default'];
          context$1$0.t2 = name;
          context$1$0.next = 5;
          return _regeneratorRuntime.awrap(_crypt2['default'].generateSecret());

        case 5:
          context$1$0.t3 = context$1$0.sent;
          context$1$0.t4 = accountId;
          context$1$0.t5 = {
            name: context$1$0.t2,
            secret: context$1$0.t3,
            accountId: context$1$0.t4
          };
          context$1$0.t6 = new context$1$0.t1(context$1$0.t5).save();
          context$1$0.next = 11;
          return context$1$0.t0.awrap.call(context$1$0.t0, context$1$0.t6);

        case 11:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 12:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },

  token: function token(accountId, clientId, scope, entity) {
    return _regeneratorRuntime.async(function token$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.t0 = _regeneratorRuntime;
          context$1$0.t1 = _modelsToken2['default'];
          context$1$0.next = 4;
          return _regeneratorRuntime.awrap(_crypt2['default'].generateToken());

        case 4:
          context$1$0.t2 = context$1$0.sent;
          context$1$0.t3 = accountId;
          context$1$0.t4 = clientId;
          context$1$0.t5 = scope;
          context$1$0.t6 = entity;
          context$1$0.t7 = {
            value: context$1$0.t2,
            accountId: context$1$0.t3,
            clientId: context$1$0.t4,
            scope: context$1$0.t5,
            entity: context$1$0.t6
          };
          context$1$0.t8 = new context$1$0.t1(context$1$0.t7).save();
          context$1$0.next = 13;
          return context$1$0.t0.awrap.call(context$1$0.t0, context$1$0.t8);

        case 13:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 14:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },

  firstPartyCredentials: function firstPartyCredentials(username, password, name) {
    var account, client, token;
    return _regeneratorRuntime.async(function firstPartyCredentials$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap(this.account(username, password));

        case 2:
          account = context$1$0.sent;
          context$1$0.next = 5;
          return _regeneratorRuntime.awrap(this.client(name, account.id));

        case 5:
          client = context$1$0.sent;
          context$1$0.next = 8;
          return _regeneratorRuntime.awrap(this.token(account.id, client.id, _scopes2['default'].all, _entities2['default'].FIRST_PARTY));

        case 8:
          token = context$1$0.sent;
          return context$1$0.abrupt('return', {
            account: account,
            client: client,
            token: token
          });

        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },

  thirdPartyCredentials: function thirdPartyCredentials(username, password, name) {
    var account, client, token;
    return _regeneratorRuntime.async(function thirdPartyCredentials$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap(this.account(username, password));

        case 2:
          account = context$1$0.sent;
          context$1$0.next = 5;
          return _regeneratorRuntime.awrap(this.client(name, account.id));

        case 5:
          client = context$1$0.sent;
          context$1$0.next = 8;
          return _regeneratorRuntime.awrap(this.token(account.id, client.id, _scopes2['default'].all, _entities2['default'].THIRD_PARTY));

        case 8:
          token = context$1$0.sent;
          return context$1$0.abrupt('return', {
            account: account,
            client: client,
            token: token
          });

        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dlbmVyYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7cUJBQWtCLFNBQVM7Ozs7c0JBRVIsVUFBVTs7Ozt3QkFDUixZQUFZOzs7OzZCQUViLG1CQUFtQjs7Ozs0QkFDcEIsa0JBQWtCOzs7OzJCQUNuQixpQkFBaUI7Ozs7cUJBRXBCOztBQUViLFNBQU8sRUFBRSxpQkFBZSxRQUFRLEVBQUUsUUFBUTs7Ozs7OzJCQUU1QixRQUFROzsyQ0FDRixtQkFBTSxlQUFlLENBQUMsUUFBUSxDQUFDOzs7OztBQUQvQyxvQkFBUTtBQUNSLG9CQUFROzs4REFDUCxJQUFJOzs7Ozs7Ozs7Ozs7R0FDUjs7QUFFRCxRQUFNLEVBQUUsZ0JBQWUsSUFBSSxFQUFFLFNBQVM7Ozs7OzsyQkFFNUIsSUFBSTs7MkNBQ0ksbUJBQU0sY0FBYyxFQUFFOzs7OzJCQUN6QixTQUFTOztBQUZwQixnQkFBSTtBQUNKLGtCQUFNO0FBQ04scUJBQVM7OzhEQUNSLElBQUk7Ozs7Ozs7Ozs7OztHQUNSOztBQUVELE9BQUssRUFBRSxlQUFlLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU07Ozs7Ozs7MkNBRXZDLG1CQUFNLGFBQWEsRUFBRTs7OzsyQkFDdkIsU0FBUzsyQkFDVixRQUFROzJCQUNYLEtBQUs7MkJBQ0osTUFBTTs7QUFKZCxpQkFBSztBQUNMLHFCQUFTO0FBQ1Qsb0JBQVE7QUFDUixpQkFBSztBQUNMLGtCQUFNOzs4REFDTCxJQUFJOzs7Ozs7Ozs7Ozs7R0FDUjs7QUFFRCx1QkFBcUIsRUFBRSwrQkFBZSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUk7UUFDdEQsT0FBTyxFQUNQLE1BQU0sRUFDTixLQUFLOzs7OzsyQ0FGVyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7OztBQUFoRCxpQkFBTzs7MkNBQ1EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7O0FBQTVDLGdCQUFNOzsyQ0FDUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxvQkFBTyxHQUFHLEVBQUUsc0JBQVMsV0FBVyxDQUFDOzs7QUFBakYsZUFBSzs4Q0FFSjtBQUNMLG1CQUFPLEVBQVAsT0FBTztBQUNQLGtCQUFNLEVBQU4sTUFBTTtBQUNOLGlCQUFLLEVBQUwsS0FBSztXQUNOOzs7Ozs7O0dBQ0Y7O0FBRUQsdUJBQXFCLEVBQUUsK0JBQWUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJO1FBQ3RELE9BQU8sRUFDUCxNQUFNLEVBQ04sS0FBSzs7Ozs7MkNBRlcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDOzs7QUFBaEQsaUJBQU87OzJDQUNRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7OztBQUE1QyxnQkFBTTs7MkNBQ1EsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsb0JBQU8sR0FBRyxFQUFFLHNCQUFTLFdBQVcsQ0FBQzs7O0FBQWpGLGVBQUs7OENBRUo7QUFDTCxtQkFBTyxFQUFQLE9BQU87QUFDUCxrQkFBTSxFQUFOLE1BQU07QUFDTixpQkFBSyxFQUFMLEtBQUs7V0FDTjs7Ozs7OztHQUNGOztDQUVGIiwiZmlsZSI6ImdlbmVyYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0IGZyb20gJy4vY3J5cHQnO1xuXG5pbXBvcnQgc2NvcGVzIGZyb20gJy4vc2NvcGVzJztcbmltcG9ydCBlbnRpdGllcyBmcm9tICcuL2VudGl0aWVzJztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi4vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IENsaWVudCBmcm9tICcuLi9tb2RlbHMvY2xpZW50JztcbmltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgYWNjb3VudDogYXN5bmMgZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBBY2NvdW50KHtcbiAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBhd2FpdCBjcnlwdC5lbmNyeXB0UGFzc3dvcmQocGFzc3dvcmQpXG4gICAgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIGNsaWVudDogYXN5bmMgZnVuY3Rpb24obmFtZSwgYWNjb3VudElkKSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBDbGllbnQoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHNlY3JldDogYXdhaXQgY3J5cHQuZ2VuZXJhdGVTZWNyZXQoKSxcbiAgICAgIGFjY291bnRJZDogYWNjb3VudElkXG4gICAgfSkuc2F2ZSgpO1xuICB9LFxuXG4gIHRva2VuOiBhc3luYyBmdW5jdGlvbihhY2NvdW50SWQsIGNsaWVudElkLCBzY29wZSwgZW50aXR5KSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBUb2tlbih7XG4gICAgICB2YWx1ZTogYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpLFxuICAgICAgYWNjb3VudElkOiBhY2NvdW50SWQsXG4gICAgICBjbGllbnRJZDogY2xpZW50SWQsXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICBlbnRpdHk6IGVudGl0eVxuICAgIH0pLnNhdmUoKTtcbiAgfSxcblxuICBmaXJzdFBhcnR5Q3JlZGVudGlhbHM6IGFzeW5jIGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgbmFtZSkge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmFjY291bnQodXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLmNsaWVudChuYW1lLCBhY2NvdW50LmlkKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMudG9rZW4oYWNjb3VudC5pZCwgY2xpZW50LmlkLCBzY29wZXMuYWxsLCBlbnRpdGllcy5GSVJTVF9QQVJUWSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWNjb3VudCxcbiAgICAgIGNsaWVudCxcbiAgICAgIHRva2VuXG4gICAgfTtcbiAgfSxcblxuICB0aGlyZFBhcnR5Q3JlZGVudGlhbHM6IGFzeW5jIGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgbmFtZSkge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmFjY291bnQodXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLmNsaWVudChuYW1lLCBhY2NvdW50LmlkKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMudG9rZW4oYWNjb3VudC5pZCwgY2xpZW50LmlkLCBzY29wZXMuYWxsLCBlbnRpdGllcy5USElSRF9QQVJUWSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWNjb3VudCxcbiAgICAgIGNsaWVudCxcbiAgICAgIHRva2VuXG4gICAgfTtcbiAgfVxuXG59O1xuIl19