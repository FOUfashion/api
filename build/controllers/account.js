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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7O1dBRUMsMEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMvQixXQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7OzsrQkFFUSxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDeEIsVUFBTSxRQUFRLEdBQUcsTUFBTSwyQkFBUSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVqRixVQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLGVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzNCOztBQUVELFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckUsYUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDOztBQUV4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxpQkFBaUIsR0FBRyxNQUFNLDBCQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hGLFVBQU0sT0FBTyxHQUFHLE1BQU0sK0JBQVk7QUFDaEMsZ0JBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbEMsZ0JBQVEsRUFBRSxpQkFBaUI7QUFDM0IsZUFBTyxFQUFFLCtCQUFZO0FBQ25CLGVBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7QUFDNUIsY0FBSSxFQUFFO0FBQ0osaUJBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDaEMsZ0JBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7V0FDL0I7U0FDRixDQUFDO09BQ0gsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUViLGFBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QixXQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOzs7U0FuQ0csV0FBVzs7O3FCQXVDRixXQUFXIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHQgZnJvbSAnLi4vaGVscGVycy9jcnlwdCc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4uL21vZGVscy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uL21vZGVscy9wcm9maWxlJztcblxuY2xhc3MgQWNjb3VudEN0cmwge1xuXG4gIGdldEF1dGhlbnRpY2F0ZWQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICByZXBseShyZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudCk7XG4gIH1cblxuICBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IEFjY291bnQuZmlsdGVyKHsgaWQ6IHJlcXVlc3QucGFyYW1zLmlkIH0pLmdldEpvaW4oKS5ydW4oKTtcblxuICAgIGlmIChhY2NvdW50cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcmVwbHkoYWNjb3VudHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIGRlbGV0ZSBhY2NvdW50LnBhc3N3b3JkO1xuXG4gICAgcmVwbHkoYWNjb3VudCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBlbmNyeXB0ZWRQYXNzd29yZCA9IGF3YWl0IGNyeXB0LmVuY3J5cHRQYXNzd29yZChyZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQpO1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBuZXcgQWNjb3VudCh7XG4gICAgICB1c2VybmFtZTogcmVxdWVzdC5wYXlsb2FkLnVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGVuY3J5cHRlZFBhc3N3b3JkLFxuICAgICAgcHJvZmlsZTogbmV3IFByb2ZpbGUoe1xuICAgICAgICBlbWFpbDogcmVxdWVzdC5wYXlsb2FkLmVtYWlsLFxuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZmlyc3Q6IHJlcXVlc3QucGF5bG9hZC5maXJzdE5hbWUsXG4gICAgICAgICAgbGFzdDogcmVxdWVzdC5wYXlsb2FkLmxhc3ROYW1lXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSkuc2F2ZUFsbCgpO1xuXG4gICAgZGVsZXRlIGFjY291bnQucGFzc3dvcmQ7XG4gICAgcmVwbHkoYWNjb3VudCkuY29kZSgyMDEpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudEN0cmw7XG4iXX0=