'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersCrypt = require('../helpers/crypt');

var _helpersCrypt2 = _interopRequireDefault(_helpersCrypt);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsProfile = require('../models/profile');

var _modelsProfile2 = _interopRequireDefault(_modelsProfile);

var AccountCtrl = (function () {
  function AccountCtrl() {
    _classCallCheck(this, AccountCtrl);
  }

  _createClass(AccountCtrl, [{
    key: 'getAuthenticated',
    value: _bluebird.coroutine(function* (request, reply) {
      var account = yield _modelsAccount2['default'].get(request.auth.credentials.account.username).getJoin().run();
      delete account.password;
      reply(account);
    })
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      var accounts = yield _modelsAccount2['default'].filter({ id: request.params.id }).getJoin().run();

      if (accounts.length > 0) {
        return reply(accounts[0]);
      }

      var account = yield _modelsAccount2['default'].get(request.params.id).getJoin().run();
      delete account.password;

      reply(account);
    })
  }, {
    key: 'create',
    value: _bluebird.coroutine(function* (request, reply) {
      var encryptedPassword = yield _helpersCrypt2['default'].encryptPassword(request.payload.password);
      var account = yield new _modelsAccount2['default']({
        username: request.payload.username,
        password: encryptedPassword,
        profile: new _modelsProfile2['default']({
          email: request.payload.email,
          name: {
            first: request.payload.firstName,
            last: request.payload.lastName
          }
        })
      }).saveAll();

      delete account.password;
      reply(account).code(201);
    })
  }]);

  return AccountCtrl;
})();

exports['default'] = AccountCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7OytCQUVPLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNyQyxVQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0YsYUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3hCLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQjs7OytCQUVRLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN4QixVQUFNLFFBQVEsR0FBRyxNQUFNLDJCQUFRLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRWpGLFVBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdkIsZUFBTyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDM0I7O0FBRUQsVUFBTSxPQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyRSxhQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0FBRXhCLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQjs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLGlCQUFpQixHQUFHLE1BQU0sMEJBQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEYsVUFBTSxPQUFPLEdBQUcsTUFBTSwrQkFBWTtBQUNoQyxnQkFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtBQUNsQyxnQkFBUSxFQUFFLGlCQUFpQjtBQUMzQixlQUFPLEVBQUUsK0JBQVk7QUFDbkIsZUFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztBQUM1QixjQUFJLEVBQUU7QUFDSixpQkFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUztBQUNoQyxnQkFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtXQUMvQjtTQUNGLENBQUM7T0FDSCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWIsYUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3hCLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7OztTQXJDRyxXQUFXOzs7cUJBeUNGLFdBQVciLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdCBmcm9tICcuLi9oZWxwZXJzL2NyeXB0JztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi4vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vbW9kZWxzL3Byb2ZpbGUnO1xuXG5jbGFzcyBBY2NvdW50Q3RybCB7XG5cbiAgYXN5bmMgZ2V0QXV0aGVudGljYXRlZChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmdldChyZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudC51c2VybmFtZSkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIGRlbGV0ZSBhY2NvdW50LnBhc3N3b3JkO1xuICAgIHJlcGx5KGFjY291bnQpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCBBY2NvdW50LmZpbHRlcih7IGlkOiByZXF1ZXN0LnBhcmFtcy5pZCB9KS5nZXRKb2luKCkucnVuKCk7XG5cbiAgICBpZiAoYWNjb3VudHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHJlcGx5KGFjY291bnRzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgQWNjb3VudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLmdldEpvaW4oKS5ydW4oKTtcbiAgICBkZWxldGUgYWNjb3VudC5wYXNzd29yZDtcblxuICAgIHJlcGx5KGFjY291bnQpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgZW5jcnlwdGVkUGFzc3dvcmQgPSBhd2FpdCBjcnlwdC5lbmNyeXB0UGFzc3dvcmQocmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkKTtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgbmV3IEFjY291bnQoe1xuICAgICAgdXNlcm5hbWU6IHJlcXVlc3QucGF5bG9hZC51c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBlbmNyeXB0ZWRQYXNzd29yZCxcbiAgICAgIHByb2ZpbGU6IG5ldyBQcm9maWxlKHtcbiAgICAgICAgZW1haWw6IHJlcXVlc3QucGF5bG9hZC5lbWFpbCxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIGZpcnN0OiByZXF1ZXN0LnBheWxvYWQuZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3Q6IHJlcXVlc3QucGF5bG9hZC5sYXN0TmFtZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pLnNhdmVBbGwoKTtcblxuICAgIGRlbGV0ZSBhY2NvdW50LnBhc3N3b3JkO1xuICAgIHJlcGx5KGFjY291bnQpLmNvZGUoMjAxKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRDdHJsO1xuIl19