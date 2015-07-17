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
    value: function getAuthenticated(request, reply) {
      reply(request.auth.credentials.account);
    }
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      var accounts = yield _modelsAccount2['default'].filter({ id: request.params.id }).getJoin().run();

      if (accounts.length > 0) {
        return reply(accounts[0]);
      }

      var account = yield _modelsAccount2['default'].get(request.params.id).getJoin().run();
      reply(account);
    })
  }, {
    key: 'create',
    value: _bluebird.coroutine(function* (request, reply) {
      var encryptedPassword = yield _helpersCrypt2['default'].encryptPassword(request.payload.password);
      var account = new _modelsAccount2['default']({
        username: request.payload.username,
        password: encryptedPassword,
        profile: new _modelsProfile2['default']({
          email: request.payload.email,
          name: {
            first: request.payload.firstName,
            last: request.payload.lastName
          }
        })
      });

      reply((yield account.saveAll())).code(201);
    })
  }]);

  return AccountCtrl;
})();

exports['default'] = AccountCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7O1dBRUMsMEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMvQixXQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7OzsrQkFFUSxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDeEIsVUFBTSxRQUFRLEdBQUcsTUFBTSwyQkFBUSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVqRixVQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLGVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzNCOztBQUVELFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckUsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7K0JBRVcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFVBQU0saUJBQWlCLEdBQUcsTUFBTSwwQkFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRixVQUFNLE9BQU8sR0FBRywrQkFBWTtBQUMxQixnQkFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtBQUNsQyxnQkFBUSxFQUFFLGlCQUFpQjtBQUMzQixlQUFPLEVBQUUsK0JBQVk7QUFDbkIsZUFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztBQUM1QixjQUFJLEVBQUU7QUFDSixpQkFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUztBQUNoQyxnQkFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtXQUMvQjtTQUNGLENBQUM7T0FDSCxDQUFDLENBQUM7O0FBRUgsV0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUM7OztTQWhDRyxXQUFXOzs7cUJBb0NGLFdBQVciLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdCBmcm9tICcuLi9oZWxwZXJzL2NyeXB0JztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi4vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vbW9kZWxzL3Byb2ZpbGUnO1xuXG5jbGFzcyBBY2NvdW50Q3RybCB7XG5cbiAgZ2V0QXV0aGVudGljYXRlZChyZXF1ZXN0LCByZXBseSkge1xuICAgIHJlcGx5KHJlcXVlc3QuYXV0aC5jcmVkZW50aWFscy5hY2NvdW50KTtcbiAgfVxuXG4gIGFzeW5jIGdldChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgQWNjb3VudC5maWx0ZXIoeyBpZDogcmVxdWVzdC5wYXJhbXMuaWQgfSkuZ2V0Sm9pbigpLnJ1bigpO1xuXG4gICAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiByZXBseShhY2NvdW50c1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IEFjY291bnQuZ2V0KHJlcXVlc3QucGFyYW1zLmlkKS5nZXRKb2luKCkucnVuKCk7XG4gICAgcmVwbHkoYWNjb3VudCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBlbmNyeXB0ZWRQYXNzd29yZCA9IGF3YWl0IGNyeXB0LmVuY3J5cHRQYXNzd29yZChyZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQpO1xuICAgIGNvbnN0IGFjY291bnQgPSBuZXcgQWNjb3VudCh7XG4gICAgICB1c2VybmFtZTogcmVxdWVzdC5wYXlsb2FkLnVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGVuY3J5cHRlZFBhc3N3b3JkLFxuICAgICAgcHJvZmlsZTogbmV3IFByb2ZpbGUoe1xuICAgICAgICBlbWFpbDogcmVxdWVzdC5wYXlsb2FkLmVtYWlsLFxuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZmlyc3Q6IHJlcXVlc3QucGF5bG9hZC5maXJzdE5hbWUsXG4gICAgICAgICAgbGFzdDogcmVxdWVzdC5wYXlsb2FkLmxhc3ROYW1lXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXBseShhd2FpdCBhY2NvdW50LnNhdmVBbGwoKSkuY29kZSgyMDEpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudEN0cmw7XG4iXX0=