'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersGenerate = require('../helpers/generate');

var _helpersGenerate2 = _interopRequireDefault(_helpersGenerate);

var _helpersDbUtils = require('../helpers/dbUtils');

var _helpersDbUtils2 = _interopRequireDefault(_helpersDbUtils);

var data = {};
var synced = false;

/**
 * This module serves as a common pool of documents and credentials to be used in tests.
 * Sync makes sure those resources are loaded before being used.
 */
data.sync = _bluebird.coroutine(function* () {
  if (synced) {
    return;
  }

  yield _helpersDbUtils2['default'].clearDatabase();

  this.fp = yield _helpersGenerate2['default'].firstPartyCredentials('fpusername', 'fp_password', 'fp_name');
  this.tp = yield _helpersGenerate2['default'].thirdPartyCredentials('tpusername', 'tp_password', 'tp_name');

  this.account = yield _helpersGenerate2['default'].account('testuser', 'testpass');
  this.account.unencryptedPassword = 'testpass';

  this.profile = yield _helpersGenerate2['default'].profile(this.account.id, 'test@account.com', { first: 'Johnny', last: 'Bravo' });
  this.client = yield _helpersGenerate2['default'].client('testclient', this.account.id);

  synced = true;
});

exports['default'] = data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7K0JBQXFCLHFCQUFxQjs7Ozs4QkFDdEIsb0JBQW9COzs7O0FBRXhDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1uQixJQUFJLENBQUMsSUFBSSx1QkFBRyxhQUFpQjtBQUMzQixNQUFJLE1BQU0sRUFBRTtBQUNWLFdBQU87R0FDUjs7QUFFRCxRQUFNLDRCQUFRLGFBQWEsRUFBRSxDQUFDOztBQUU5QixNQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sNkJBQVMscUJBQXFCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN2RixNQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sNkJBQVMscUJBQXFCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFdkYsTUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLDZCQUFTLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7O0FBRTlDLE1BQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSw2QkFBUyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQy9HLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSw2QkFBUyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRW5FLFFBQU0sR0FBRyxJQUFJLENBQUM7Q0FDZixDQUFBLENBQUM7O3FCQUVhLElBQUkiLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZW5lcmF0ZSBmcm9tICcuLi9oZWxwZXJzL2dlbmVyYXRlJztcbmltcG9ydCBkYlV0aWxzIGZyb20gJy4uL2hlbHBlcnMvZGJVdGlscyc7XG5cbmNvbnN0IGRhdGEgPSB7fTtcbmxldCBzeW5jZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBzZXJ2ZXMgYXMgYSBjb21tb24gcG9vbCBvZiBkb2N1bWVudHMgYW5kIGNyZWRlbnRpYWxzIHRvIGJlIHVzZWQgaW4gdGVzdHMuXG4gKiBTeW5jIG1ha2VzIHN1cmUgdGhvc2UgcmVzb3VyY2VzIGFyZSBsb2FkZWQgYmVmb3JlIGJlaW5nIHVzZWQuXG4gKi9cbmRhdGEuc3luYyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBpZiAoc3luY2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgZGJVdGlscy5jbGVhckRhdGFiYXNlKCk7XG5cbiAgdGhpcy5mcCA9IGF3YWl0IGdlbmVyYXRlLmZpcnN0UGFydHlDcmVkZW50aWFscygnZnB1c2VybmFtZScsICdmcF9wYXNzd29yZCcsICdmcF9uYW1lJyk7XG4gIHRoaXMudHAgPSBhd2FpdCBnZW5lcmF0ZS50aGlyZFBhcnR5Q3JlZGVudGlhbHMoJ3RwdXNlcm5hbWUnLCAndHBfcGFzc3dvcmQnLCAndHBfbmFtZScpO1xuXG4gIHRoaXMuYWNjb3VudCA9IGF3YWl0IGdlbmVyYXRlLmFjY291bnQoJ3Rlc3R1c2VyJywgJ3Rlc3RwYXNzJyk7XG4gIHRoaXMuYWNjb3VudC51bmVuY3J5cHRlZFBhc3N3b3JkID0gJ3Rlc3RwYXNzJztcblxuICB0aGlzLnByb2ZpbGUgPSBhd2FpdCBnZW5lcmF0ZS5wcm9maWxlKHRoaXMuYWNjb3VudC5pZCwgJ3Rlc3RAYWNjb3VudC5jb20nLCB7IGZpcnN0OiAnSm9obm55JywgbGFzdDogJ0JyYXZvJyB9KTtcbiAgdGhpcy5jbGllbnQgPSBhd2FpdCBnZW5lcmF0ZS5jbGllbnQoJ3Rlc3RjbGllbnQnLCB0aGlzLmFjY291bnQuaWQpO1xuXG4gIHN5bmNlZCA9IHRydWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhO1xuIl19