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

  this.fp = yield _helpersGenerate2['default'].firstPartyCredentials({
    username: 'fpusername',
    password: 'fp_password',
    clientName: 'fp_client_name',
    profile: {
      email: 'test@fp.com',
      name: {
        first: 'Premier',
        last: 'Party'
      }
    }
  });

  this.tp = yield _helpersGenerate2['default'].thirdPartyCredentials({
    username: 'tpusername',
    password: 'tp_password',
    clientName: 'tp_client_name',
    profile: {
      email: 'test@tp.com',
      name: {
        first: 'Zweite',
        last: 'Party'
      }
    }
  });

  synced = true;
});

exports['default'] = data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7K0JBQXFCLHFCQUFxQjs7Ozs4QkFDdEIsb0JBQW9COzs7O0FBRXhDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1uQixJQUFJLENBQUMsSUFBSSx1QkFBRyxhQUFpQjtBQUMzQixNQUFJLE1BQU0sRUFBRTtBQUNWLFdBQU87R0FDUjs7QUFFRCxRQUFNLDRCQUFRLGFBQWEsRUFBRSxDQUFDOztBQUU5QixNQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sNkJBQVMscUJBQXFCLENBQUM7QUFDN0MsWUFBUSxFQUFFLFlBQVk7QUFDdEIsWUFBUSxFQUFFLGFBQWE7QUFDdkIsY0FBVSxFQUFFLGdCQUFnQjtBQUM1QixXQUFPLEVBQUU7QUFDUCxXQUFLLEVBQUUsYUFBYTtBQUNwQixVQUFJLEVBQUU7QUFDSixhQUFLLEVBQUUsU0FBUztBQUNoQixZQUFJLEVBQUUsT0FBTztPQUNkO0tBQ0Y7R0FDRixDQUFDLENBQUM7O0FBRUgsTUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLDZCQUFTLHFCQUFxQixDQUFDO0FBQzdDLFlBQVEsRUFBRSxZQUFZO0FBQ3RCLFlBQVEsRUFBRSxhQUFhO0FBQ3ZCLGNBQVUsRUFBRSxnQkFBZ0I7QUFDNUIsV0FBTyxFQUFFO0FBQ1AsV0FBSyxFQUFFLGFBQWE7QUFDcEIsVUFBSSxFQUFFO0FBQ0osYUFBSyxFQUFFLFFBQVE7QUFDZixZQUFJLEVBQUUsT0FBTztPQUNkO0tBQ0Y7R0FDRixDQUFDLENBQUM7O0FBRUgsUUFBTSxHQUFHLElBQUksQ0FBQztDQUNmLENBQUEsQ0FBQzs7cUJBRWEsSUFBSSIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdlbmVyYXRlIGZyb20gJy4uL2hlbHBlcnMvZ2VuZXJhdGUnO1xuaW1wb3J0IGRiVXRpbHMgZnJvbSAnLi4vaGVscGVycy9kYlV0aWxzJztcblxuY29uc3QgZGF0YSA9IHt9O1xubGV0IHN5bmNlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyBhIGNvbW1vbiBwb29sIG9mIGRvY3VtZW50cyBhbmQgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCBpbiB0ZXN0cy5cbiAqIFN5bmMgbWFrZXMgc3VyZSB0aG9zZSByZXNvdXJjZXMgYXJlIGxvYWRlZCBiZWZvcmUgYmVpbmcgdXNlZC5cbiAqL1xuZGF0YS5zeW5jID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGlmIChzeW5jZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBkYlV0aWxzLmNsZWFyRGF0YWJhc2UoKTtcblxuICB0aGlzLmZwID0gYXdhaXQgZ2VuZXJhdGUuZmlyc3RQYXJ0eUNyZWRlbnRpYWxzKHtcbiAgICB1c2VybmFtZTogJ2ZwdXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkOiAnZnBfcGFzc3dvcmQnLFxuICAgIGNsaWVudE5hbWU6ICdmcF9jbGllbnRfbmFtZScsXG4gICAgcHJvZmlsZToge1xuICAgICAgZW1haWw6ICd0ZXN0QGZwLmNvbScsXG4gICAgICBuYW1lOiB7XG4gICAgICAgIGZpcnN0OiAnUHJlbWllcicsXG4gICAgICAgIGxhc3Q6ICdQYXJ0eSdcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHRoaXMudHAgPSBhd2FpdCBnZW5lcmF0ZS50aGlyZFBhcnR5Q3JlZGVudGlhbHMoe1xuICAgIHVzZXJuYW1lOiAndHB1c2VybmFtZScsXG4gICAgcGFzc3dvcmQ6ICd0cF9wYXNzd29yZCcsXG4gICAgY2xpZW50TmFtZTogJ3RwX2NsaWVudF9uYW1lJyxcbiAgICBwcm9maWxlOiB7XG4gICAgICBlbWFpbDogJ3Rlc3RAdHAuY29tJyxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZmlyc3Q6ICdad2VpdGUnLFxuICAgICAgICBsYXN0OiAnUGFydHknXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBzeW5jZWQgPSB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YTtcbiJdfQ==