'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

exports['default'] = {
  bearer: function bearer(accessToken, callback) {
    var token;
    return _regeneratorRuntime.async(function bearer$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return _regeneratorRuntime.awrap(_modelsToken2['default'].get(accessToken).getJoin().run());

        case 3:
          token = context$1$0.sent;

          callback(null, true, {
            user: token.entity === _entities2['default'].FIRST_PARTY,
            account: token.account,
            client: token.client,
            scope: token.scope,
            entity: token.entity
          });
          context$1$0.next = 10;
          break;

        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);

          callback(context$1$0.t0);

        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 7]]);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3ZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7MkJBQWtCLGlCQUFpQjs7Ozt3QkFDZCxZQUFZOzs7O3FCQUVsQjtBQUNiLFFBQU0sRUFBRSxnQkFBZSxXQUFXLEVBQUUsUUFBUTtRQUVsQyxLQUFLOzs7Ozs7MkNBQVMseUJBQU0sR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRTs7O0FBQXBELGVBQUs7O0FBRVgsa0JBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ25CLGdCQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sS0FBSyxzQkFBUyxXQUFXO0FBQzNDLG1CQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDdEIsa0JBQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNwQixpQkFBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO0FBQ2xCLGtCQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07V0FDckIsQ0FBQyxDQUFDOzs7Ozs7OztBQUVILGtCQUFRLGdCQUFJLENBQUM7Ozs7Ozs7R0FFaEI7Q0FDRiIsImZpbGUiOiJ2YWxpZGF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuaW1wb3J0IGVudGl0aWVzIGZyb20gJy4vZW50aXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJlYXJlcjogYXN5bmMgZnVuY3Rpb24oYWNjZXNzVG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgVG9rZW4uZ2V0KGFjY2Vzc1Rva2VuKS5nZXRKb2luKCkucnVuKCk7XG5cbiAgICAgIGNhbGxiYWNrKG51bGwsIHRydWUsIHtcbiAgICAgICAgdXNlcjogdG9rZW4uZW50aXR5ID09PSBlbnRpdGllcy5GSVJTVF9QQVJUWSxcbiAgICAgICAgYWNjb3VudDogdG9rZW4uYWNjb3VudCxcbiAgICAgICAgY2xpZW50OiB0b2tlbi5jbGllbnQsXG4gICAgICAgIHNjb3BlOiB0b2tlbi5zY29wZSxcbiAgICAgICAgZW50aXR5OiB0b2tlbi5lbnRpdHlcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBjYWxsYmFjayhleCk7XG4gICAgfVxuICB9XG59O1xuIl19