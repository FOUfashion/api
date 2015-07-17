'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _acrypto = require('acrypto');

var _acrypto2 = _interopRequireDefault(_acrypto);

exports['default'] = {
  encryptPassword: function encryptPassword(password, salt, iterations) {
    var key;
    return _regeneratorRuntime.async(function encryptPassword$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          if (salt) {
            context$1$0.next = 5;
            break;
          }

          context$1$0.next = 3;
          return _regeneratorRuntime.awrap(_acrypto2['default'].randomBytes(64));

        case 3:
          salt = context$1$0.sent;

          salt = salt.toString('hex');

        case 5:

          if (!iterations) {
            iterations = 8192;
          } else {
            iterations = parseInt(iterations, 10);
          }

          context$1$0.next = 8;
          return _regeneratorRuntime.awrap(_acrypto2['default'].pbkdf2(password, salt, iterations, 256, 'sha256'));

        case 8:
          key = context$1$0.sent;

          key = key.toString('base64');

          return context$1$0.abrupt('return', salt + ':' + key + ':' + iterations);

        case 11:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },
  passwordsMatch: function passwordsMatch(original, check) {
    var _original$split, _original$split2, salt, key, iterations, encrypted;

    return _regeneratorRuntime.async(function passwordsMatch$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          _original$split = original.split(':');
          _original$split2 = _slicedToArray(_original$split, 3);
          salt = _original$split2[0];
          key = _original$split2[1];
          iterations = _original$split2[2];
          context$1$0.next = 7;
          return _regeneratorRuntime.awrap(this.encryptPassword(check, salt, iterations));

        case 7:
          encrypted = context$1$0.sent;
          return context$1$0.abrupt('return', original === encrypted);

        case 9:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },
  generateToken: function generateToken() {
    var token;
    return _regeneratorRuntime.async(function generateToken$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap(_acrypto2['default'].randomBytes(16));

        case 2:
          token = context$1$0.sent;
          return context$1$0.abrupt('return', token.toString('hex'));

        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },
  generateCode: function generateCode() {
    var code;
    return _regeneratorRuntime.async(function generateCode$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap(_acrypto2['default'].randomBytes(12));

        case 2:
          code = context$1$0.sent;
          return context$1$0.abrupt('return', code.toString('hex'));

        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },
  generateSecret: function generateSecret() {
    var secret;
    return _regeneratorRuntime.async(function generateSecret$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap(_acrypto2['default'].randomBytes(24));

        case 2:
          secret = context$1$0.sent;
          return context$1$0.abrupt('return', secret.toString('hex'));

        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7OztxQkFFZDtBQUNiLGlCQUFlLEVBQUUseUJBQWUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVO1FBWXBELEdBQUc7Ozs7Y0FYRixJQUFJOzs7Ozs7MkNBQ00scUJBQVEsV0FBVyxDQUFDLEVBQUUsQ0FBQzs7O0FBQXBDLGNBQUk7O0FBQ0osY0FBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7QUFHOUIsY0FBSSxDQUFDLFVBQVUsRUFBRTtBQUNmLHNCQUFVLEdBQUcsSUFBSSxDQUFDO1dBQ25CLE1BQU07QUFDTCxzQkFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7V0FDdkM7OzsyQ0FFZSxxQkFBUSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQzs7O0FBQXJFLGFBQUc7O0FBQ1AsYUFBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7OzhDQUVuQixJQUFJLFNBQUksR0FBRyxTQUFJLFVBQVU7Ozs7Ozs7R0FDcEM7QUFDRCxnQkFBYyxFQUFFLHdCQUFlLFFBQVEsRUFBRSxLQUFLOzJDQUNyQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFDdEIsU0FBUzs7Ozs7NEJBRGlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztBQUE1QyxjQUFJO0FBQUUsYUFBRztBQUFFLG9CQUFVOzsyQ0FDSixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDOzs7QUFBL0QsbUJBQVM7OENBQ1IsUUFBUSxLQUFLLFNBQVM7Ozs7Ozs7R0FDOUI7QUFDRCxlQUFhLEVBQUU7UUFDUCxLQUFLOzs7OzsyQ0FBUyxxQkFBUSxXQUFXLENBQUMsRUFBRSxDQUFDOzs7QUFBckMsZUFBSzs4Q0FDSixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUM3QjtBQUNELGNBQVksRUFBRTtRQUNOLElBQUk7Ozs7OzJDQUFTLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUM7OztBQUFwQyxjQUFJOzhDQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQzVCO0FBQ0QsZ0JBQWMsRUFBRTtRQUNSLE1BQU07Ozs7OzJDQUFTLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUM7OztBQUF0QyxnQkFBTTs4Q0FDTCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUM5QjtDQUNGIiwiZmlsZSI6ImNyeXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFjcnlwdG8gZnJvbSAnYWNyeXB0byc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW5jcnlwdFBhc3N3b3JkOiBhc3luYyBmdW5jdGlvbihwYXNzd29yZCwgc2FsdCwgaXRlcmF0aW9ucykge1xuICAgIGlmICghc2FsdCkge1xuICAgICAgc2FsdCA9IGF3YWl0IGFjcnlwdG8ucmFuZG9tQnl0ZXMoNjQpO1xuICAgICAgc2FsdCA9IHNhbHQudG9TdHJpbmcoJ2hleCcpO1xuICAgIH1cblxuICAgIGlmICghaXRlcmF0aW9ucykge1xuICAgICAgaXRlcmF0aW9ucyA9IDgxOTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGlvbnMgPSBwYXJzZUludChpdGVyYXRpb25zLCAxMCk7XG4gICAgfVxuXG4gICAgbGV0IGtleSA9IGF3YWl0IGFjcnlwdG8ucGJrZGYyKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCAyNTYsICdzaGEyNTYnKTtcbiAgICBrZXkgPSBrZXkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXG4gICAgcmV0dXJuIGAke3NhbHR9OiR7a2V5fToke2l0ZXJhdGlvbnN9YDtcbiAgfSxcbiAgcGFzc3dvcmRzTWF0Y2g6IGFzeW5jIGZ1bmN0aW9uKG9yaWdpbmFsLCBjaGVjaykge1xuICAgIGNvbnN0IFtzYWx0LCBrZXksIGl0ZXJhdGlvbnNdID0gb3JpZ2luYWwuc3BsaXQoJzonKTtcbiAgICBjb25zdCBlbmNyeXB0ZWQgPSBhd2FpdCB0aGlzLmVuY3J5cHRQYXNzd29yZChjaGVjaywgc2FsdCwgaXRlcmF0aW9ucyk7XG4gICAgcmV0dXJuIG9yaWdpbmFsID09PSBlbmNyeXB0ZWQ7XG4gIH0sXG4gIGdlbmVyYXRlVG9rZW46IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygxNik7XG4gICAgcmV0dXJuIHRva2VuLnRvU3RyaW5nKCdoZXgnKTtcbiAgfSxcbiAgZ2VuZXJhdGVDb2RlOiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb2RlID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygxMik7XG4gICAgcmV0dXJuIGNvZGUudG9TdHJpbmcoJ2hleCcpO1xuICB9LFxuICBnZW5lcmF0ZVNlY3JldDogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VjcmV0ID0gYXdhaXQgYWNyeXB0by5yYW5kb21CeXRlcygyNCk7XG4gICAgcmV0dXJuIHNlY3JldC50b1N0cmluZygnaGV4Jyk7XG4gIH1cbn07XG4iXX0=