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
  this.client = yield _helpersGenerate2['default'].client('testclient', this.account.id);

  synced = true;
});

exports['default'] = data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7K0JBQXFCLHFCQUFxQjs7Ozs4QkFDdEIsb0JBQW9COzs7O0FBRXhDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1uQixJQUFJLENBQUMsSUFBSSx1QkFBRyxhQUFpQjtBQUMzQixNQUFJLE1BQU0sRUFBRTtBQUNWLFdBQU87R0FDUjs7QUFFRCxRQUFNLDRCQUFRLGFBQWEsRUFBRSxDQUFDOztBQUU5QixNQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sNkJBQVMscUJBQXFCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN2RixNQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sNkJBQVMscUJBQXFCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFdkYsTUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLDZCQUFTLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDOUMsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLDZCQUFTLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFbkUsUUFBTSxHQUFHLElBQUksQ0FBQztDQUNmLENBQUEsQ0FBQzs7cUJBRWEsSUFBSSIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdlbmVyYXRlIGZyb20gJy4uL2hlbHBlcnMvZ2VuZXJhdGUnO1xuaW1wb3J0IGRiVXRpbHMgZnJvbSAnLi4vaGVscGVycy9kYlV0aWxzJztcblxuY29uc3QgZGF0YSA9IHt9O1xubGV0IHN5bmNlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyBhIGNvbW1vbiBwb29sIG9mIGRvY3VtZW50cyBhbmQgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCBpbiB0ZXN0cy5cbiAqIFN5bmMgbWFrZXMgc3VyZSB0aG9zZSByZXNvdXJjZXMgYXJlIGxvYWRlZCBiZWZvcmUgYmVpbmcgdXNlZC5cbiAqL1xuZGF0YS5zeW5jID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGlmIChzeW5jZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBkYlV0aWxzLmNsZWFyRGF0YWJhc2UoKTtcblxuICB0aGlzLmZwID0gYXdhaXQgZ2VuZXJhdGUuZmlyc3RQYXJ0eUNyZWRlbnRpYWxzKCdmcHVzZXJuYW1lJywgJ2ZwX3Bhc3N3b3JkJywgJ2ZwX25hbWUnKTtcbiAgdGhpcy50cCA9IGF3YWl0IGdlbmVyYXRlLnRoaXJkUGFydHlDcmVkZW50aWFscygndHB1c2VybmFtZScsICd0cF9wYXNzd29yZCcsICd0cF9uYW1lJyk7XG5cbiAgdGhpcy5hY2NvdW50ID0gYXdhaXQgZ2VuZXJhdGUuYWNjb3VudCgndGVzdHVzZXInLCAndGVzdHBhc3MnKTtcbiAgdGhpcy5hY2NvdW50LnVuZW5jcnlwdGVkUGFzc3dvcmQgPSAndGVzdHBhc3MnO1xuICB0aGlzLmNsaWVudCA9IGF3YWl0IGdlbmVyYXRlLmNsaWVudCgndGVzdGNsaWVudCcsIHRoaXMuYWNjb3VudC5pZCk7XG5cbiAgc3luY2VkID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGE7XG4iXX0=