'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _bluebird = require('bluebird');

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
    value: _bluebird.coroutine(function* (request, reply) {
      var scope = request.payload.scope.replace(/,*\s/g, ',').split(',');
      var client = yield _modelsClient2['default'].get(request.payload.clientId).run();

      var code = yield new _modelsCode2['default']({
        value: yield _helpersCrypt2['default'].generateCode(),
        accountId: client.accountId,
        clientId: client.id,
        scope: scope
      }).save();

      code.scope = code.scope.join(' ');
      reply(code);
    })
  }, {
    key: 'exchangeCode',
    value: _bluebird.coroutine(function* (request, reply) {
      var code = yield _modelsCode2['default'].get(request.payload.code).run();
      if (code.used) {
        return reply(_boom2['default'].badRequest('Code already used'));
      }

      var client = yield _modelsClient2['default'].get(request.payload.clientId).getJoin().run();
      if (client.secret !== request.payload.clientSecret) {
        return reply(_boom2['default'].badRequest('Invalid clientSecret'));
      }

      var token = yield new _modelsToken2['default']({
        value: yield _helpersCrypt2['default'].generateToken(),
        accountId: client.accountId,
        clientId: client.id,
        scope: code.scope
      }).save();

      token.scope = token.scope.join(' ');
      reply(token);

      code.used = true;
      yield code.save();
    })
  }, {
    key: 'exchangeCredentials',
    value: _bluebird.coroutine(function* (request, reply) {
      var account = yield _modelsAccount2['default'].get(request.payload.username).run();
      var matches = yield _helpersCrypt2['default'].passwordsMatch(account.password, request.payload.password);

      if (!matches) {
        return reply(_boom2['default'].unauthorized('Invalid password'));
      }

      var token = yield new _modelsToken2['default']({
        value: yield _helpersCrypt2['default'].generateToken(),
        accountId: account.id,
        clientId: request.auth.credentials.client.id,
        scope: _helpersScopes2['default'].all
      }).save();

      token.scope = token.scope.join(' ');
      reply(token);
    })
  }]);

  return AuthCtrl;
})();

exports['default'] = AuthCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzRCQUVMLGtCQUFrQjs7Ozs2QkFDakIsbUJBQW1COzs7OzZCQUVsQixtQkFBbUI7Ozs7NEJBQ3BCLGtCQUFrQjs7OzsyQkFDbkIsaUJBQWlCOzs7OzBCQUNsQixnQkFBZ0I7Ozs7SUFFM0IsUUFBUTtXQUFSLFFBQVE7MEJBQVIsUUFBUTs7O2VBQVIsUUFBUTs7K0JBRUcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzlCLFVBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JFLFVBQU0sTUFBTSxHQUFHLE1BQU0sMEJBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRWhFLFVBQU0sSUFBSSxHQUFHLE1BQU0sNEJBQVM7QUFDMUIsYUFBSyxFQUFFLE1BQU0sMEJBQU0sWUFBWSxFQUFFO0FBQ2pDLGlCQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7QUFDM0IsZ0JBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtBQUNuQixhQUFLLEVBQUUsS0FBSztPQUNiLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFVixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLFdBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNiOzs7K0JBRWlCLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNqQyxVQUFNLElBQUksR0FBRyxNQUFNLHdCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hELFVBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNiLGVBQU8sS0FBSyxDQUFDLGtCQUFLLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7T0FDcEQ7O0FBRUQsVUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxRSxVQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7QUFDbEQsZUFBTyxLQUFLLENBQUMsa0JBQUssVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztPQUN2RDs7QUFFRCxVQUFNLEtBQUssR0FBRyxNQUFNLDZCQUFVO0FBQzVCLGFBQUssRUFBRSxNQUFNLDBCQUFNLGFBQWEsRUFBRTtBQUNsQyxpQkFBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO0FBQzNCLGdCQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFDbkIsYUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO09BQ2xCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFVixXQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLFdBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFYixVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7OytCQUV3QixXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDeEMsVUFBTSxPQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsRSxVQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFNLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXZGLFVBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixlQUFPLEtBQUssQ0FBQyxrQkFBSyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO09BQ3JEOztBQUVELFVBQU0sS0FBSyxHQUFHLE1BQU0sNkJBQVU7QUFDNUIsYUFBSyxFQUFFLE1BQU0sMEJBQU0sYUFBYSxFQUFFO0FBQ2xDLGlCQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUU7QUFDckIsZ0JBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUM1QyxhQUFLLEVBQUUsMkJBQU8sR0FBRztPQUNsQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsV0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxXQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDZDs7O1NBM0RHLFFBQVE7OztxQkErREMsUUFBUSIsImZpbGUiOiJhdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvb20gZnJvbSAnYm9vbSc7XG5cbmltcG9ydCBjcnlwdCBmcm9tICcuLi9oZWxwZXJzL2NyeXB0JztcbmltcG9ydCBzY29wZXMgZnJvbSAnLi4vaGVscGVycy9zY29wZXMnO1xuXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuLi9tb2RlbHMvYWNjb3VudCc7XG5pbXBvcnQgQ2xpZW50IGZyb20gJy4uL21vZGVscy9jbGllbnQnO1xuaW1wb3J0IFRva2VuIGZyb20gJy4uL21vZGVscy90b2tlbic7XG5pbXBvcnQgQ29kZSBmcm9tICcuLi9tb2RlbHMvY29kZSc7XG5cbmNsYXNzIEF1dGhDdHJsIHtcblxuICBhc3luYyBhdXRob3JpemUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBzY29wZSA9IHJlcXVlc3QucGF5bG9hZC5zY29wZS5yZXBsYWNlKC8sKlxccy9nLCAnLCcpLnNwbGl0KCcsJyk7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50LmdldChyZXF1ZXN0LnBheWxvYWQuY2xpZW50SWQpLnJ1bigpO1xuXG4gICAgY29uc3QgY29kZSA9IGF3YWl0IG5ldyBDb2RlKHtcbiAgICAgIHZhbHVlOiBhd2FpdCBjcnlwdC5nZW5lcmF0ZUNvZGUoKSxcbiAgICAgIGFjY291bnRJZDogY2xpZW50LmFjY291bnRJZCxcbiAgICAgIGNsaWVudElkOiBjbGllbnQuaWQsXG4gICAgICBzY29wZTogc2NvcGVcbiAgICB9KS5zYXZlKCk7XG5cbiAgICBjb2RlLnNjb3BlID0gY29kZS5zY29wZS5qb2luKCcgJyk7XG4gICAgcmVwbHkoY29kZSk7XG4gIH1cblxuICBhc3luYyBleGNoYW5nZUNvZGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb2RlID0gYXdhaXQgQ29kZS5nZXQocmVxdWVzdC5wYXlsb2FkLmNvZGUpLnJ1bigpO1xuICAgIGlmIChjb2RlLnVzZWQpIHtcbiAgICAgIHJldHVybiByZXBseShCb29tLmJhZFJlcXVlc3QoJ0NvZGUgYWxyZWFkeSB1c2VkJykpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudC5nZXQocmVxdWVzdC5wYXlsb2FkLmNsaWVudElkKS5nZXRKb2luKCkucnVuKCk7XG4gICAgaWYgKGNsaWVudC5zZWNyZXQgIT09IHJlcXVlc3QucGF5bG9hZC5jbGllbnRTZWNyZXQpIHtcbiAgICAgIHJldHVybiByZXBseShCb29tLmJhZFJlcXVlc3QoJ0ludmFsaWQgY2xpZW50U2VjcmV0JykpO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgbmV3IFRva2VuKHtcbiAgICAgIHZhbHVlOiBhd2FpdCBjcnlwdC5nZW5lcmF0ZVRva2VuKCksXG4gICAgICBhY2NvdW50SWQ6IGNsaWVudC5hY2NvdW50SWQsXG4gICAgICBjbGllbnRJZDogY2xpZW50LmlkLFxuICAgICAgc2NvcGU6IGNvZGUuc2NvcGVcbiAgICB9KS5zYXZlKCk7XG5cbiAgICB0b2tlbi5zY29wZSA9IHRva2VuLnNjb3BlLmpvaW4oJyAnKTtcbiAgICByZXBseSh0b2tlbik7XG5cbiAgICBjb2RlLnVzZWQgPSB0cnVlO1xuICAgIGF3YWl0IGNvZGUuc2F2ZSgpO1xuICB9XG5cbiAgYXN5bmMgZXhjaGFuZ2VDcmVkZW50aWFscyhyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBBY2NvdW50LmdldChyZXF1ZXN0LnBheWxvYWQudXNlcm5hbWUpLnJ1bigpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBhd2FpdCBjcnlwdC5wYXNzd29yZHNNYXRjaChhY2NvdW50LnBhc3N3b3JkLCByZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQpO1xuXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gcmVwbHkoQm9vbS51bmF1dGhvcml6ZWQoJ0ludmFsaWQgcGFzc3dvcmQnKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBuZXcgVG9rZW4oe1xuICAgICAgdmFsdWU6IGF3YWl0IGNyeXB0LmdlbmVyYXRlVG9rZW4oKSxcbiAgICAgIGFjY291bnRJZDogYWNjb3VudC5pZCxcbiAgICAgIGNsaWVudElkOiByZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuY2xpZW50LmlkLFxuICAgICAgc2NvcGU6IHNjb3Blcy5hbGxcbiAgICB9KS5zYXZlKCk7XG5cbiAgICB0b2tlbi5zY29wZSA9IHRva2VuLnNjb3BlLmpvaW4oJyAnKTtcbiAgICByZXBseSh0b2tlbik7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRoQ3RybDtcbiJdfQ==