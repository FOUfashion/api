'use strict';

var _bluebird = require('bluebird');

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _acrypto = require('acrypto');

var _acrypto2 = _interopRequireDefault(_acrypto);

exports['default'] = {
  encryptPassword: _bluebird.coroutine(function* (password, salt, iterations) {
    if (!salt) {
      salt = yield _acrypto2['default'].randomBytes(64);
      salt = salt.toString('hex');
    }

    if (!iterations) {
      iterations = 8192;
    } else {
      iterations = parseInt(iterations, 10);
    }

    var key = yield _acrypto2['default'].pbkdf2(password, salt, iterations, 256, 'sha256');
    key = key.toString('base64');

    return salt + ':' + key + ':' + iterations;
  }),
  passwordsMatch: _bluebird.coroutine(function* (original, check) {
    var _original$split = original.split(':');

    var _original$split2 = _slicedToArray(_original$split, 3);

    var salt = _original$split2[0];
    var key = _original$split2[1];
    var iterations = _original$split2[2];

    var encrypted = yield this.encryptPassword(check, salt, iterations);
    return original === encrypted;
  }),
  generateToken: _bluebird.coroutine(function* () {
    var token = yield _acrypto2['default'].randomBytes(16);
    return token.toString('hex');
  }),
  generateCode: _bluebird.coroutine(function* () {
    var code = yield _acrypto2['default'].randomBytes(12);
    return code.toString('hex');
  }),
  generateSecret: _bluebird.coroutine(function* () {
    var secret = yield _acrypto2['default'].randomBytes(24);
    return secret.toString('hex');
  })
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7OztxQkFFZDtBQUNiLGlCQUFlLHNCQUFFLFdBQWUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7QUFDMUQsUUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFVBQUksR0FBRyxNQUFNLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxVQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxRQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2YsZ0JBQVUsR0FBRyxJQUFJLENBQUM7S0FDbkIsTUFBTTtBQUNMLGdCQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2Qzs7QUFFRCxRQUFJLEdBQUcsR0FBRyxNQUFNLHFCQUFRLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUUsT0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLFdBQVUsSUFBSSxTQUFJLEdBQUcsU0FBSSxVQUFVLENBQUc7R0FDdkMsQ0FBQTtBQUNELGdCQUFjLHNCQUFFLFdBQWUsUUFBUSxFQUFFLEtBQUssRUFBRTswQkFDZCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7OztRQUE1QyxJQUFJO1FBQUUsR0FBRztRQUFFLFVBQVU7O0FBQzVCLFFBQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3RFLFdBQU8sUUFBUSxLQUFLLFNBQVMsQ0FBQztHQUMvQixDQUFBO0FBQ0QsZUFBYSxzQkFBRSxhQUFpQjtBQUM5QixRQUFNLEtBQUssR0FBRyxNQUFNLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1QyxXQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDOUIsQ0FBQTtBQUNELGNBQVksc0JBQUUsYUFBaUI7QUFDN0IsUUFBTSxJQUFJLEdBQUcsTUFBTSxxQkFBUSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0MsV0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzdCLENBQUE7QUFDRCxnQkFBYyxzQkFBRSxhQUFpQjtBQUMvQixRQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QyxXQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDL0IsQ0FBQTtDQUNGIiwiZmlsZSI6ImNyeXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFjcnlwdG8gZnJvbSAnYWNyeXB0byc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW5jcnlwdFBhc3N3b3JkOiBhc3luYyBmdW5jdGlvbihwYXNzd29yZCwgc2FsdCwgaXRlcmF0aW9ucykge1xuICAgIGlmICghc2FsdCkge1xuICAgICAgc2FsdCA9IGF3YWl0IGFjcnlwdG8ucmFuZG9tQnl0ZXMoNjQpO1xuICAgICAgc2FsdCA9IHNhbHQudG9TdHJpbmcoJ2hleCcpO1xuICAgIH1cblxuICAgIGlmICghaXRlcmF0aW9ucykge1xuICAgICAgaXRlcmF0aW9ucyA9IDgxOTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGlvbnMgPSBwYXJzZUludChpdGVyYXRpb25zLCAxMCk7XG4gICAgfVxuXG4gICAgbGV0IGtleSA9IGF3YWl0IGFjcnlwdG8ucGJrZGYyKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCAyNTYsICdzaGEyNTYnKTtcbiAgICBrZXkgPSBrZXkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXG4gICAgcmV0dXJuIGAke3NhbHR9OiR7a2V5fToke2l0ZXJhdGlvbnN9YDtcbiAgfSxcbiAgcGFzc3dvcmRzTWF0Y2g6IGFzeW5jIGZ1bmN0aW9uKG9yaWdpbmFsLCBjaGVjaykge1xuICAgIGNvbnN0IFtzYWx0LCBrZXksIGl0ZXJhdGlvbnNdID0gb3JpZ2luYWwuc3BsaXQoJzonKTtcbiAgICBjb25zdCBlbmNyeXB0ZWQgPSBhd2FpdCB0aGlzLmVuY3J5cHRQYXNzd29yZChjaGVjaywgc2FsdCwgaXRlcmF0aW9ucyk7XG4gICAgcmV0dXJuIG9yaWdpbmFsID09PSBlbmNyeXB0ZWQ7XG4gIH0sXG4gIGdlbmVyYXRlVG9rZW46IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygxNik7XG4gICAgcmV0dXJuIHRva2VuLnRvU3RyaW5nKCdoZXgnKTtcbiAgfSxcbiAgZ2VuZXJhdGVDb2RlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb2RlID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygxMik7XG4gICAgcmV0dXJuIGNvZGUudG9TdHJpbmcoJ2hleCcpO1xuICB9LFxuICBnZW5lcmF0ZVNlY3JldDogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VjcmV0ID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygyNCk7XG4gICAgcmV0dXJuIHNlY3JldC50b1N0cmluZygnaGV4Jyk7XG4gIH1cbn07XG4iXX0=