'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _helpersCrypt = require('../helpers/crypt');

var _helpersCrypt2 = _interopRequireDefault(_helpersCrypt);

var _helpersScopes = require('../helpers/scopes');

var _helpersScopes2 = _interopRequireDefault(_helpersScopes);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsClient = require('../models/client');

var _modelsClient2 = _interopRequireDefault(_modelsClient);

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var _modelsCode = require('../models/code');

var _modelsCode2 = _interopRequireDefault(_modelsCode);

var AuthCtrl = (function () {
  function AuthCtrl() {
    _classCallCheck(this, AuthCtrl);
  }

  _createClass(AuthCtrl, [{
    key: 'authorize',
    value: function authorize(request, reply) {
      var scope, client, code;
      return _regeneratorRuntime.async(function authorize$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            scope = request.payload.scope.replace(/,*\s/g, ',').split(',');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_modelsClient2['default'].get(request.payload.clientId).run());

          case 3:
            client = context$2$0.sent;
            context$2$0.t0 = _regeneratorRuntime;
            context$2$0.t1 = _modelsCode2['default'];
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(_helpersCrypt2['default'].generateCode());

          case 8:
            context$2$0.t2 = context$2$0.sent;
            context$2$0.t3 = client.accountId;
            context$2$0.t4 = client.id;
            context$2$0.t5 = scope;
            context$2$0.t6 = {
              value: context$2$0.t2,
              accountId: context$2$0.t3,
              clientId: context$2$0.t4,
              scope: context$2$0.t5
            };
            context$2$0.t7 = new context$2$0.t1(context$2$0.t6).save();
            context$2$0.next = 16;
            return context$2$0.t0.awrap.call(context$2$0.t0, context$2$0.t7);

          case 16:
            code = context$2$0.sent;

            code.scope = code.scope.join(' ');
            reply(code);

          case 19:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'exchangeCode',
    value: function exchangeCode(request, reply) {
      var code, client, token;
      return _regeneratorRuntime.async(function exchangeCode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_modelsCode2['default'].get(request.payload.code).run());

          case 2:
            code = context$2$0.sent;

            if (!code.used) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', reply(_boom2['default'].badRequest('Code already used')));

          case 5:
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(_modelsClient2['default'].get(request.payload.clientId).getJoin().run());

          case 7:
            client = context$2$0.sent;

            if (!(client.secret !== request.payload.clientSecret)) {
              context$2$0.next = 10;
              break;
            }

            return context$2$0.abrupt('return', reply(_boom2['default'].badRequest('Invalid clientSecret')));

          case 10:
            context$2$0.t0 = _regeneratorRuntime;
            context$2$0.t1 = _modelsToken2['default'];
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(_helpersCrypt2['default'].generateToken());

          case 14:
            context$2$0.t2 = context$2$0.sent;
            context$2$0.t3 = client.accountId;
            context$2$0.t4 = client.id;
            context$2$0.t5 = code.scope;
            context$2$0.t6 = {
              value: context$2$0.t2,
              accountId: context$2$0.t3,
              clientId: context$2$0.t4,
              scope: context$2$0.t5
            };
            context$2$0.t7 = new context$2$0.t1(context$2$0.t6).save();
            context$2$0.next = 22;
            return context$2$0.t0.awrap.call(context$2$0.t0, context$2$0.t7);

          case 22:
            token = context$2$0.sent;

            token.scope = token.scope.join(' ');
            reply(token);

            code.used = true;
            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(code.save());

          case 28:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'exchangeCredentials',
    value: function exchangeCredentials(request, reply) {
      var account, matches, token;
      return _regeneratorRuntime.async(function exchangeCredentials$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_modelsAccount2['default'].get(request.payload.username).run());

          case 2:
            account = context$2$0.sent;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(_helpersCrypt2['default'].passwordsMatch(account.password, request.payload.password));

          case 5:
            matches = context$2$0.sent;

            if (matches) {
              context$2$0.next = 8;
              break;
            }

            return context$2$0.abrupt('return', reply(_boom2['default'].unauthorized('Invalid password')));

          case 8:
            context$2$0.t0 = _regeneratorRuntime;
            context$2$0.t1 = _modelsToken2['default'];
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(_helpersCrypt2['default'].generateToken());

          case 12:
            context$2$0.t2 = context$2$0.sent;
            context$2$0.t3 = request.auth.credentials.account.id;
            context$2$0.t4 = request.auth.credentials.client.id;
            context$2$0.t5 = _helpersScopes2['default'].all;
            context$2$0.t6 = {
              value: context$2$0.t2,
              accountId: context$2$0.t3,
              clientId: context$2$0.t4,
              scope: context$2$0.t5
            };
            context$2$0.t7 = new context$2$0.t1(context$2$0.t6).save();
            context$2$0.next = 20;
            return context$2$0.t0.awrap.call(context$2$0.t0, context$2$0.t7);

          case 20:
            token = context$2$0.sent;

            token.scope = token.scope.join(' ');
            reply(token);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return AuthCtrl;
})();

exports['default'] = AuthCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzRCQUVMLGtCQUFrQjs7Ozs2QkFDakIsbUJBQW1COzs7OzZCQUVsQixtQkFBbUI7Ozs7NEJBQ3BCLGtCQUFrQjs7OzsyQkFDbkIsaUJBQWlCOzs7OzBCQUNsQixnQkFBZ0I7Ozs7SUFFM0IsUUFBUTtXQUFSLFFBQVE7MEJBQVIsUUFBUTs7O2VBQVIsUUFBUTs7V0FFRyxtQkFBQyxPQUFPLEVBQUUsS0FBSztVQUN0QixLQUFLLEVBQ0wsTUFBTSxFQUVOLElBQUk7Ozs7QUFISixpQkFBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7NkNBQy9DLDBCQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRTs7O0FBQXpELGtCQUFNOzs7OzZDQUdHLDBCQUFNLFlBQVksRUFBRTs7Ozs2QkFDdEIsTUFBTSxDQUFDLFNBQVM7NkJBQ2pCLE1BQU0sQ0FBQyxFQUFFOzZCQUNaLEtBQUs7O0FBSFosbUJBQUs7QUFDTCx1QkFBUztBQUNULHNCQUFRO0FBQ1IsbUJBQUs7O2dFQUNKLElBQUk7Ozs7O0FBTEQsZ0JBQUk7O0FBT1YsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsaUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztLQUNiOzs7V0FFaUIsc0JBQUMsT0FBTyxFQUFFLEtBQUs7VUFDekIsSUFBSSxFQUtKLE1BQU0sRUFLTixLQUFLOzs7Ozs2Q0FWUSx3QkFBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7OztBQUFqRCxnQkFBSTs7aUJBQ04sSUFBSSxDQUFDLElBQUk7Ozs7O2dEQUNKLEtBQUssQ0FBQyxrQkFBSyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs2Q0FHL0IsMEJBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFOzs7QUFBbkUsa0JBQU07O2tCQUNSLE1BQU0sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7Ozs7O2dEQUN6QyxLQUFLLENBQUMsa0JBQUssVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Ozs7Ozs2Q0FJeEMsMEJBQU0sYUFBYSxFQUFFOzs7OzZCQUN2QixNQUFNLENBQUMsU0FBUzs2QkFDakIsTUFBTSxDQUFDLEVBQUU7NkJBQ1osSUFBSSxDQUFDLEtBQUs7O0FBSGpCLG1CQUFLO0FBQ0wsdUJBQVM7QUFDVCxzQkFBUTtBQUNSLG1CQUFLOztnRUFDSixJQUFJOzs7OztBQUxELGlCQUFLOztBQU9YLGlCQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLGlCQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWIsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs2Q0FDWCxJQUFJLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0tBQ2xCOzs7V0FFd0IsNkJBQUMsT0FBTyxFQUFFLEtBQUs7VUFDaEMsT0FBTyxFQUNQLE9BQU8sRUFNUCxLQUFLOzs7Ozs2Q0FQVywyQkFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUU7OztBQUEzRCxtQkFBTzs7NkNBQ1MsMEJBQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7OztBQUFoRixtQkFBTzs7Z0JBRVIsT0FBTzs7Ozs7Z0RBQ0gsS0FBSyxDQUFDLGtCQUFLLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7NkNBSXRDLDBCQUFNLGFBQWEsRUFBRTs7Ozs2QkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7NkJBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFOzZCQUNyQywyQkFBTyxHQUFHOztBQUhqQixtQkFBSztBQUNMLHVCQUFTO0FBQ1Qsc0JBQVE7QUFDUixtQkFBSzs7Z0VBQ0osSUFBSTs7Ozs7QUFMRCxpQkFBSzs7QUFPWCxpQkFBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxpQkFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0tBQ2Q7OztTQTNERyxRQUFROzs7cUJBK0RDLFFBQVEiLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb29tIGZyb20gJ2Jvb20nO1xuXG5pbXBvcnQgY3J5cHQgZnJvbSAnLi4vaGVscGVycy9jcnlwdCc7XG5pbXBvcnQgc2NvcGVzIGZyb20gJy4uL2hlbHBlcnMvc2NvcGVzJztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi4vbW9kZWxzL2FjY291bnQnO1xuaW1wb3J0IENsaWVudCBmcm9tICcuLi9tb2RlbHMvY2xpZW50JztcbmltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuaW1wb3J0IENvZGUgZnJvbSAnLi4vbW9kZWxzL2NvZGUnO1xuXG5jbGFzcyBBdXRoQ3RybCB7XG5cbiAgYXN5bmMgYXV0aG9yaXplKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3Qgc2NvcGUgPSByZXF1ZXN0LnBheWxvYWQuc2NvcGUucmVwbGFjZSgvLCpcXHMvZywgJywnKS5zcGxpdCgnLCcpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudC5nZXQocmVxdWVzdC5wYXlsb2FkLmNsaWVudElkKS5ydW4oKTtcblxuICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBuZXcgQ29kZSh7XG4gICAgICB2YWx1ZTogYXdhaXQgY3J5cHQuZ2VuZXJhdGVDb2RlKCksXG4gICAgICBhY2NvdW50SWQ6IGNsaWVudC5hY2NvdW50SWQsXG4gICAgICBjbGllbnRJZDogY2xpZW50LmlkLFxuICAgICAgc2NvcGU6IHNjb3BlXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgY29kZS5zY29wZSA9IGNvZGUuc2NvcGUuam9pbignICcpO1xuICAgIHJlcGx5KGNvZGUpO1xuICB9XG5cbiAgYXN5bmMgZXhjaGFuZ2VDb2RlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgY29kZSA9IGF3YWl0IENvZGUuZ2V0KHJlcXVlc3QucGF5bG9hZC5jb2RlKS5ydW4oKTtcbiAgICBpZiAoY29kZS51c2VkKSB7XG4gICAgICByZXR1cm4gcmVwbHkoQm9vbS5iYWRSZXF1ZXN0KCdDb2RlIGFscmVhZHkgdXNlZCcpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnQuZ2V0KHJlcXVlc3QucGF5bG9hZC5jbGllbnRJZCkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIGlmIChjbGllbnQuc2VjcmV0ICE9PSByZXF1ZXN0LnBheWxvYWQuY2xpZW50U2VjcmV0KSB7XG4gICAgICByZXR1cm4gcmVwbHkoQm9vbS5iYWRSZXF1ZXN0KCdJbnZhbGlkIGNsaWVudFNlY3JldCcpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBUb2tlbih7XG4gICAgICB2YWx1ZTogYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpLFxuICAgICAgYWNjb3VudElkOiBjbGllbnQuYWNjb3VudElkLFxuICAgICAgY2xpZW50SWQ6IGNsaWVudC5pZCxcbiAgICAgIHNjb3BlOiBjb2RlLnNjb3BlXG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgdG9rZW4uc2NvcGUgPSB0b2tlbi5zY29wZS5qb2luKCcgJyk7XG4gICAgcmVwbHkodG9rZW4pO1xuXG4gICAgY29kZS51c2VkID0gdHJ1ZTtcbiAgICBhd2FpdCBjb2RlLnNhdmUoKTtcbiAgfVxuXG4gIGFzeW5jIGV4Y2hhbmdlQ3JlZGVudGlhbHMocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgQWNjb3VudC5nZXQocmVxdWVzdC5wYXlsb2FkLnVzZXJuYW1lKS5ydW4oKTtcbiAgICBjb25zdCBtYXRjaGVzID0gYXdhaXQgY3J5cHQucGFzc3dvcmRzTWF0Y2goYWNjb3VudC5wYXNzd29yZCwgcmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkKTtcblxuICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgcmV0dXJuIHJlcGx5KEJvb20udW5hdXRob3JpemVkKCdJbnZhbGlkIHBhc3N3b3JkJykpO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgbmV3IFRva2VuKHtcbiAgICAgIHZhbHVlOiBhd2FpdCBjcnlwdC5nZW5lcmF0ZVRva2VuKCksXG4gICAgICBhY2NvdW50SWQ6IHJlcXVlc3QuYXV0aC5jcmVkZW50aWFscy5hY2NvdW50LmlkLFxuICAgICAgY2xpZW50SWQ6IHJlcXVlc3QuYXV0aC5jcmVkZW50aWFscy5jbGllbnQuaWQsXG4gICAgICBzY29wZTogc2NvcGVzLmFsbFxuICAgIH0pLnNhdmUoKTtcblxuICAgIHRva2VuLnNjb3BlID0gdG9rZW4uc2NvcGUuam9pbignICcpO1xuICAgIHJlcGx5KHRva2VuKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhDdHJsO1xuIl19