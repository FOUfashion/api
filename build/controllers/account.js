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
      var account = yield _modelsAccount2['default'].get(request.auth.credentials.account.username).getJoin({ profile: true }).run();

      delete account.password;
      reply(account);
    })
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      var idOrUsername = request.params.id;
      var account = undefined;

      if (idOrUsername.includes('-')) {
        account = yield _modelsAccount2['default'].filter({ id: idOrUsername }).getJoin({ profile: true }).nth(0).run();
      } else {
        account = yield _modelsAccount2['default'].get(idOrUsername).getJoin({ profile: true }).run();
      }

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
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var idOrUsername = request.params.id;
      var account = undefined;

      if (idOrUsername.includes('-')) {
        account = yield _modelsAccount2['default'].filter({ id: idOrUsername }).nth(0).run();
      } else {
        account = yield _modelsAccount2['default'].get(idOrUsername).run();
      }

      if (request.payload.password) {
        account.password = yield _helpersCrypt2['default'].encryptPassword(request.payload.password);
        yield account.save();
      }

      delete account.password;
      reply(account);
    })
  }, {
    key: 'delete',
    value: _bluebird.coroutine(function* (request, reply) {
      var idOrUsername = request.params.id;
      var account = undefined;

      if (idOrUsername.includes('-')) {
        account = yield _modelsAccount2['default'].filter({ id: idOrUsername }).nth(0).run();
      } else {
        account = yield _modelsAccount2['default'].get(idOrUsername).run();
      }

      yield account.deleteAll();
      reply().code(204);
    })
  }]);

  return AccountCtrl;
})();

exports['default'] = AccountCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7OytCQUVPLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNyQyxVQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUNuQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUM5QyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDMUIsR0FBRyxFQUFFLENBQUM7O0FBRVQsYUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3hCLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQjs7OytCQUVRLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN4QixVQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUN2QyxVQUFJLE9BQU8sWUFBQSxDQUFDOztBQUVaLFVBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM5QixlQUFPLEdBQUcsTUFBTSwyQkFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FDNUIsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQzFCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDTixHQUFHLEVBQUUsQ0FBQztPQUNWLE1BQU07QUFDTCxlQUFPLEdBQUcsTUFBTSwyQkFDYixHQUFHLENBQUMsWUFBWSxDQUFDLENBQ2pCLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUMxQixHQUFHLEVBQUUsQ0FBQztPQUNWOztBQUVELGFBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxpQkFBaUIsR0FBRyxNQUFNLDBCQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hGLFVBQU0sT0FBTyxHQUFHLE1BQU0sK0JBQVk7QUFDaEMsZ0JBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbEMsZ0JBQVEsRUFBRSxpQkFBaUI7QUFDM0IsZUFBTyxFQUFFLCtCQUFZO0FBQ25CLGVBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7QUFDNUIsY0FBSSxFQUFFO0FBQ0osaUJBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDaEMsZ0JBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7V0FDL0I7U0FDRixDQUFDO09BQ0gsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUViLGFBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOzs7K0JBRVcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFVBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3ZDLFVBQUksT0FBTyxZQUFBLENBQUM7O0FBRVosVUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzlCLGVBQU8sR0FBRyxNQUFNLDJCQUFRLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztPQUNuRSxNQUFNO0FBQ0wsZUFBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO09BQ2pEOztBQUVELFVBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDNUIsZUFBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLDBCQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pFLGNBQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3RCOztBQUVELGFBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDdkMsVUFBSSxPQUFPLFlBQUEsQ0FBQzs7QUFFWixVQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDOUIsZUFBTyxHQUFHLE1BQU0sMkJBQVEsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO09BQ25FLE1BQU07QUFDTCxlQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7T0FDakQ7O0FBRUQsWUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDMUIsV0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25COzs7U0FsRkcsV0FBVzs7O3FCQXNGRixXQUFXIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHQgZnJvbSAnLi4vaGVscGVycy9jcnlwdCc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4uL21vZGVscy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uL21vZGVscy9wcm9maWxlJztcblxuY2xhc3MgQWNjb3VudEN0cmwge1xuXG4gIGFzeW5jIGdldEF1dGhlbnRpY2F0ZWQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgQWNjb3VudFxuICAgICAgLmdldChyZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudC51c2VybmFtZSlcbiAgICAgIC5nZXRKb2luKHsgcHJvZmlsZTogdHJ1ZSB9KVxuICAgICAgLnJ1bigpO1xuXG4gICAgZGVsZXRlIGFjY291bnQucGFzc3dvcmQ7XG4gICAgcmVwbHkoYWNjb3VudCk7XG4gIH1cblxuICBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBpZE9yVXNlcm5hbWUgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgICBsZXQgYWNjb3VudDtcblxuICAgIGlmIChpZE9yVXNlcm5hbWUuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgYWNjb3VudCA9IGF3YWl0IEFjY291bnRcbiAgICAgICAgLmZpbHRlcih7IGlkOiBpZE9yVXNlcm5hbWUgfSlcbiAgICAgICAgLmdldEpvaW4oeyBwcm9maWxlOiB0cnVlIH0pXG4gICAgICAgIC5udGgoMClcbiAgICAgICAgLnJ1bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY2NvdW50ID0gYXdhaXQgQWNjb3VudFxuICAgICAgICAuZ2V0KGlkT3JVc2VybmFtZSlcbiAgICAgICAgLmdldEpvaW4oeyBwcm9maWxlOiB0cnVlIH0pXG4gICAgICAgIC5ydW4oKTtcbiAgICB9XG5cbiAgICBkZWxldGUgYWNjb3VudC5wYXNzd29yZDtcbiAgICByZXBseShhY2NvdW50KTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGVuY3J5cHRlZFBhc3N3b3JkID0gYXdhaXQgY3J5cHQuZW5jcnlwdFBhc3N3b3JkKHJlcXVlc3QucGF5bG9hZC5wYXNzd29yZCk7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IG5ldyBBY2NvdW50KHtcbiAgICAgIHVzZXJuYW1lOiByZXF1ZXN0LnBheWxvYWQudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogZW5jcnlwdGVkUGFzc3dvcmQsXG4gICAgICBwcm9maWxlOiBuZXcgUHJvZmlsZSh7XG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWxvYWQuZW1haWwsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBmaXJzdDogcmVxdWVzdC5wYXlsb2FkLmZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0OiByZXF1ZXN0LnBheWxvYWQubGFzdE5hbWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KS5zYXZlQWxsKCk7XG5cbiAgICBkZWxldGUgYWNjb3VudC5wYXNzd29yZDtcbiAgICByZXBseShhY2NvdW50KS5jb2RlKDIwMSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBpZE9yVXNlcm5hbWUgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgICBsZXQgYWNjb3VudDtcblxuICAgIGlmIChpZE9yVXNlcm5hbWUuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgYWNjb3VudCA9IGF3YWl0IEFjY291bnQuZmlsdGVyKHsgaWQ6IGlkT3JVc2VybmFtZSB9KS5udGgoMCkucnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmdldChpZE9yVXNlcm5hbWUpLnJ1bigpO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQpIHtcbiAgICAgIGFjY291bnQucGFzc3dvcmQgPSBhd2FpdCBjcnlwdC5lbmNyeXB0UGFzc3dvcmQocmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkKTtcbiAgICAgIGF3YWl0IGFjY291bnQuc2F2ZSgpO1xuICAgIH1cblxuICAgIGRlbGV0ZSBhY2NvdW50LnBhc3N3b3JkO1xuICAgIHJlcGx5KGFjY291bnQpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgaWRPclVzZXJuYW1lID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgbGV0IGFjY291bnQ7XG5cbiAgICBpZiAoaWRPclVzZXJuYW1lLmluY2x1ZGVzKCctJykpIHtcbiAgICAgIGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmZpbHRlcih7IGlkOiBpZE9yVXNlcm5hbWUgfSkubnRoKDApLnJ1bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY2NvdW50ID0gYXdhaXQgQWNjb3VudC5nZXQoaWRPclVzZXJuYW1lKS5ydW4oKTtcbiAgICB9XG5cbiAgICBhd2FpdCBhY2NvdW50LmRlbGV0ZUFsbCgpO1xuICAgIHJlcGx5KCkuY29kZSgyMDQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudEN0cmw7XG4iXX0=