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
      salt = yield _acrypto2['default'].randomBytes(32);
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
  passwordsMatch: _bluebird.coroutine(function* (baseEncrypted, toCheck) {
    var _baseEncrypted$split = baseEncrypted.split(':');

    var _baseEncrypted$split2 = _slicedToArray(_baseEncrypted$split, 3);

    var salt = _baseEncrypted$split2[0];
    var key = _baseEncrypted$split2[1];
    var iterations = _baseEncrypted$split2[2];

    var encrypted = yield this.encryptPassword(toCheck, salt, iterations);
    return baseEncrypted === encrypted;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7OztxQkFFZDtBQUNiLGlCQUFlLHNCQUFFLFdBQWUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7QUFDMUQsUUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFVBQUksR0FBRyxNQUFNLHFCQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxVQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxRQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2YsZ0JBQVUsR0FBRyxJQUFJLENBQUM7S0FDbkIsTUFBTTtBQUNMLGdCQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2Qzs7QUFFRCxRQUFJLEdBQUcsR0FBRyxNQUFNLHFCQUFRLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUUsT0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLFdBQVUsSUFBSSxTQUFJLEdBQUcsU0FBSSxVQUFVLENBQUc7R0FDdkMsQ0FBQTtBQUNELGdCQUFjLHNCQUFFLFdBQWUsYUFBYSxFQUFFLE9BQU8sRUFBRTsrQkFDckIsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Ozs7UUFBakQsSUFBSTtRQUFFLEdBQUc7UUFBRSxVQUFVOztBQUM1QixRQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RSxXQUFPLGFBQWEsS0FBSyxTQUFTLENBQUM7R0FDcEMsQ0FBQTtBQUNELGVBQWEsc0JBQUUsYUFBaUI7QUFDOUIsUUFBTSxLQUFLLEdBQUcsTUFBTSxxQkFBUSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUMsV0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzlCLENBQUE7QUFDRCxjQUFZLHNCQUFFLGFBQWlCO0FBQzdCLFFBQU0sSUFBSSxHQUFHLE1BQU0scUJBQVEsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM3QixDQUFBO0FBQ0QsZ0JBQWMsc0JBQUUsYUFBaUI7QUFDL0IsUUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBUSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0MsV0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQy9CLENBQUE7Q0FDRiIsImZpbGUiOiJjcnlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhY3J5cHRvIGZyb20gJ2FjcnlwdG8nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVuY3J5cHRQYXNzd29yZDogYXN5bmMgZnVuY3Rpb24ocGFzc3dvcmQsIHNhbHQsIGl0ZXJhdGlvbnMpIHtcbiAgICBpZiAoIXNhbHQpIHtcbiAgICAgIHNhbHQgPSBhd2FpdCBhY3J5cHRvLnJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgIHNhbHQgPSBzYWx0LnRvU3RyaW5nKCdoZXgnKTtcbiAgICB9XG5cbiAgICBpZiAoIWl0ZXJhdGlvbnMpIHtcbiAgICAgIGl0ZXJhdGlvbnMgPSA4MTkyO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRpb25zID0gcGFyc2VJbnQoaXRlcmF0aW9ucywgMTApO1xuICAgIH1cblxuICAgIGxldCBrZXkgPSBhd2FpdCBhY3J5cHRvLnBia2RmMihwYXNzd29yZCwgc2FsdCwgaXRlcmF0aW9ucywgMjU2LCAnc2hhMjU2Jyk7XG4gICAga2V5ID0ga2V5LnRvU3RyaW5nKCdiYXNlNjQnKTtcblxuICAgIHJldHVybiBgJHtzYWx0fToke2tleX06JHtpdGVyYXRpb25zfWA7XG4gIH0sXG4gIHBhc3N3b3Jkc01hdGNoOiBhc3luYyBmdW5jdGlvbihiYXNlRW5jcnlwdGVkLCB0b0NoZWNrKSB7XG4gICAgY29uc3QgW3NhbHQsIGtleSwgaXRlcmF0aW9uc10gPSBiYXNlRW5jcnlwdGVkLnNwbGl0KCc6Jyk7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gYXdhaXQgdGhpcy5lbmNyeXB0UGFzc3dvcmQodG9DaGVjaywgc2FsdCwgaXRlcmF0aW9ucyk7XG4gICAgcmV0dXJuIGJhc2VFbmNyeXB0ZWQgPT09IGVuY3J5cHRlZDtcbiAgfSxcbiAgZ2VuZXJhdGVUb2tlbjogYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KTtcbiAgICByZXR1cm4gdG9rZW4udG9TdHJpbmcoJ2hleCcpO1xuICB9LFxuICBnZW5lcmF0ZUNvZGU6IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBhY3J5cHRvLnJhbmRvbUJ5dGVzKDEyKTtcbiAgICByZXR1cm4gY29kZS50b1N0cmluZygnaGV4Jyk7XG4gIH0sXG4gIGdlbmVyYXRlU2VjcmV0OiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWNyZXQgPSBhd2FpdCBhY3J5cHRvLnJhbmRvbUJ5dGVzKDI0KTtcbiAgICByZXR1cm4gc2VjcmV0LnRvU3RyaW5nKCdoZXgnKTtcbiAgfVxufTtcbiJdfQ==