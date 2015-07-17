'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

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
    value: function get(request, reply) {
      var accounts, account;
      return _regeneratorRuntime.async(function get$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_modelsAccount2['default'].filter({ id: request.params.id }).getJoin().run());

          case 2:
            accounts = context$2$0.sent;

            if (!(accounts.length > 0)) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', reply(accounts[0]));

          case 5:
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(_modelsAccount2['default'].get(request.params.id).getJoin().run());

          case 7:
            account = context$2$0.sent;

            reply(account);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'create',
    value: function create(request, reply) {
      var encryptedPassword, account;
      return _regeneratorRuntime.async(function create$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_helpersCrypt2['default'].encryptPassword(request.payload.password));

          case 2:
            encryptedPassword = context$2$0.sent;
            account = new _modelsAccount2['default']({
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
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(account.saveAll());

          case 6:
            context$2$0.t0 = context$2$0.sent;
            reply(context$2$0.t0).code(201);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return AccountCtrl;
})();

exports['default'] = AccountCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzRCQUFrQixrQkFBa0I7Ozs7NkJBRWhCLG1CQUFtQjs7Ozs2QkFDbkIsbUJBQW1COzs7O0lBRWpDLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7OztlQUFYLFdBQVc7O1dBRUMsMEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMvQixXQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7OztXQUVRLGFBQUMsT0FBTyxFQUFFLEtBQUs7VUFDaEIsUUFBUSxFQU1SLE9BQU87Ozs7OzZDQU5VLDJCQUFRLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFOzs7QUFBMUUsb0JBQVE7O2tCQUVWLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBOzs7OztnREFDZCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OzZDQUdMLDJCQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRTs7O0FBQTlELG1CQUFPOztBQUNiLGlCQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7S0FDaEI7OztXQUVXLGdCQUFDLE9BQU8sRUFBRSxLQUFLO1VBQ25CLGlCQUFpQixFQUNqQixPQUFPOzs7Ozs2Q0FEbUIsMEJBQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDOzs7QUFBekUsNkJBQWlCO0FBQ2pCLG1CQUFPLEdBQUcsK0JBQVk7QUFDMUIsc0JBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbEMsc0JBQVEsRUFBRSxpQkFBaUI7QUFDM0IscUJBQU8sRUFBRSwrQkFBWTtBQUNuQixxQkFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSztBQUM1QixvQkFBSSxFQUFFO0FBQ0osdUJBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDaEMsc0JBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7aUJBQy9CO2VBQ0YsQ0FBQzthQUNILENBQUM7OzZDQUVVLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Ozs7QUFBN0IsaUJBQUssaUJBQTBCLElBQUksQ0FBQyxHQUFHOzs7Ozs7O0tBQ3hDOzs7U0FoQ0csV0FBVzs7O3FCQW9DRixXQUFXIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHQgZnJvbSAnLi4vaGVscGVycy9jcnlwdCc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4uL21vZGVscy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uL21vZGVscy9wcm9maWxlJztcblxuY2xhc3MgQWNjb3VudEN0cmwge1xuXG4gIGdldEF1dGhlbnRpY2F0ZWQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICByZXBseShyZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudCk7XG4gIH1cblxuICBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IEFjY291bnQuZmlsdGVyKHsgaWQ6IHJlcXVlc3QucGFyYW1zLmlkIH0pLmdldEpvaW4oKS5ydW4oKTtcblxuICAgIGlmIChhY2NvdW50cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcmVwbHkoYWNjb3VudHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIHJlcGx5KGFjY291bnQpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgZW5jcnlwdGVkUGFzc3dvcmQgPSBhd2FpdCBjcnlwdC5lbmNyeXB0UGFzc3dvcmQocmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkKTtcbiAgICBjb25zdCBhY2NvdW50ID0gbmV3IEFjY291bnQoe1xuICAgICAgdXNlcm5hbWU6IHJlcXVlc3QucGF5bG9hZC51c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBlbmNyeXB0ZWRQYXNzd29yZCxcbiAgICAgIHByb2ZpbGU6IG5ldyBQcm9maWxlKHtcbiAgICAgICAgZW1haWw6IHJlcXVlc3QucGF5bG9hZC5lbWFpbCxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIGZpcnN0OiByZXF1ZXN0LnBheWxvYWQuZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3Q6IHJlcXVlc3QucGF5bG9hZC5sYXN0TmFtZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmVwbHkoYXdhaXQgYWNjb3VudC5zYXZlQWxsKCkpLmNvZGUoMjAxKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRDdHJsO1xuIl19