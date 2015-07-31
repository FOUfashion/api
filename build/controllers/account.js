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
      reply((yield _modelsAccount2['default'].find(request.auth.credentials.account.username)));
    })
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      reply((yield _modelsAccount2['default'].find(request.params.id)));
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
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var account = yield _modelsAccount2['default'].find(request.params.id, false);

      if (request.payload.password) {
        account.password = yield _helpersCrypt2['default'].encryptPassword(request.payload.password);
        yield account.save();
        delete account.password;
      }

      reply(account);
    })
  }, {
    key: 'delete',
    value: _bluebird.coroutine(function* (request, reply) {
      var account = yield _modelsAccount2['default'].find(request.params.id, false);
      yield account.deleteAll();
      reply().status(204);
    })
  }]);

  return AccountCtrl;
})();

exports['default'] = AccountCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7OytCQUVPLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNyQyxXQUFLLEVBQUMsTUFBTSwyQkFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUN0RTs7OytCQUVRLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN4QixXQUFLLEVBQUMsTUFBTSwyQkFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDOUM7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxpQkFBaUIsR0FBRyxNQUFNLDBCQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hGLFVBQU0sT0FBTyxHQUFHLE1BQU0sK0JBQVk7QUFDaEMsZ0JBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbEMsZ0JBQVEsRUFBRSxpQkFBaUI7QUFDM0IsZUFBTyxFQUFFLCtCQUFZO0FBQ25CLGVBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7QUFDNUIsY0FBSSxFQUFFO0FBQ0osaUJBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDaEMsZ0JBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7V0FDL0I7U0FDRixDQUFDO09BQ0gsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUViLGFBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOzs7K0JBRVcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU3RCxVQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0FBQzVCLGVBQU8sQ0FBQyxRQUFRLEdBQUcsTUFBTSwwQkFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6RSxjQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixlQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7T0FDekI7O0FBRUQsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7K0JBRVcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzdELFlBQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzFCLFdBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjs7O1NBNUNHLFdBQVc7OztxQkFnREYsV0FBVyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0IGZyb20gJy4uL2hlbHBlcnMvY3J5cHQnO1xuXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuLi9tb2RlbHMvYWNjb3VudCc7XG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuLi9tb2RlbHMvcHJvZmlsZSc7XG5cbmNsYXNzIEFjY291bnRDdHJsIHtcblxuICBhc3luYyBnZXRBdXRoZW50aWNhdGVkKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgcmVwbHkoYXdhaXQgQWNjb3VudC5maW5kKHJlcXVlc3QuYXV0aC5jcmVkZW50aWFscy5hY2NvdW50LnVzZXJuYW1lKSk7XG4gIH1cblxuICBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICByZXBseShhd2FpdCBBY2NvdW50LmZpbmQocmVxdWVzdC5wYXJhbXMuaWQpKTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGVuY3J5cHRlZFBhc3N3b3JkID0gYXdhaXQgY3J5cHQuZW5jcnlwdFBhc3N3b3JkKHJlcXVlc3QucGF5bG9hZC5wYXNzd29yZCk7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IG5ldyBBY2NvdW50KHtcbiAgICAgIHVzZXJuYW1lOiByZXF1ZXN0LnBheWxvYWQudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogZW5jcnlwdGVkUGFzc3dvcmQsXG4gICAgICBwcm9maWxlOiBuZXcgUHJvZmlsZSh7XG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWxvYWQuZW1haWwsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBmaXJzdDogcmVxdWVzdC5wYXlsb2FkLmZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0OiByZXF1ZXN0LnBheWxvYWQubGFzdE5hbWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KS5zYXZlQWxsKCk7XG5cbiAgICBkZWxldGUgYWNjb3VudC5wYXNzd29yZDtcbiAgICByZXBseShhY2NvdW50KS5jb2RlKDIwMSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgQWNjb3VudC5maW5kKHJlcXVlc3QucGFyYW1zLmlkLCBmYWxzZSk7XG5cbiAgICBpZiAocmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkKSB7XG4gICAgICBhY2NvdW50LnBhc3N3b3JkID0gYXdhaXQgY3J5cHQuZW5jcnlwdFBhc3N3b3JkKHJlcXVlc3QucGF5bG9hZC5wYXNzd29yZCk7XG4gICAgICBhd2FpdCBhY2NvdW50LnNhdmUoKTtcbiAgICAgIGRlbGV0ZSBhY2NvdW50LnBhc3N3b3JkO1xuICAgIH1cblxuICAgIHJlcGx5KGFjY291bnQpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IEFjY291bnQuZmluZChyZXF1ZXN0LnBhcmFtcy5pZCwgZmFsc2UpO1xuICAgIGF3YWl0IGFjY291bnQuZGVsZXRlQWxsKCk7XG4gICAgcmVwbHkoKS5zdGF0dXMoMjA0KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRDdHJsO1xuIl19