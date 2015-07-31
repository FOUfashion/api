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

var _dummy = require('./dummy');

var _dummy2 = _interopRequireDefault(_dummy);

var _modelsAccount = require('../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _modelsComment = require('../models/comment');

var _modelsComment2 = _interopRequireDefault(_modelsComment);

var _modelsPost = require('../models/post');

var _modelsPost2 = _interopRequireDefault(_modelsPost);

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

  this.fp.account.unencryptedPassword = 'fp_password';
  this.tp.account.unencryptedPassword = 'tp_password';

  this.tempAccount1 = yield new _modelsAccount2['default'](_dummy2['default'].account()).saveAll();
  this.tempAccount2 = yield new _modelsAccount2['default'](_dummy2['default'].account()).saveAll();

  this.post1 = yield new _modelsPost2['default'](_dummy2['default'].post({ accountId: this.fp.account.id })).save();
  this.post2 = yield new _modelsPost2['default'](_dummy2['default'].post({ accountId: this.tp.account.id })).save();

  this.comment1 = yield new _modelsComment2['default'](_dummy2['default'].comment({ accountId: this.fp.account.id, postId: this.post1.id })).save();
  this.comment2 = yield new _modelsComment2['default'](_dummy2['default'].comment({ accountId: this.tp.account.id, postId: this.post2.id })).save();

  synced = true;
});

exports['default'] = data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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ZXNDb250ZW50IjpbImltcG9ydCBnZW5lcmF0ZSBmcm9tICcuLi9oZWxwZXJzL2dlbmVyYXRlJztcbmltcG9ydCBkYlV0aWxzIGZyb20gJy4uL2hlbHBlcnMvZGJVdGlscyc7XG5pbXBvcnQgZHVtbXkgZnJvbSAnLi9kdW1teSc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4uL21vZGVscy9hY2NvdW50JztcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL21vZGVscy9jb21tZW50JztcbmltcG9ydCBQb3N0IGZyb20gJy4uL21vZGVscy9wb3N0JztcblxuY29uc3QgZGF0YSA9IHt9O1xubGV0IHN5bmNlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyBhIGNvbW1vbiBwb29sIG9mIGRvY3VtZW50cyBhbmQgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCBpbiB0ZXN0cy5cbiAqIFN5bmMgbWFrZXMgc3VyZSB0aG9zZSByZXNvdXJjZXMgYXJlIGxvYWRlZCBiZWZvcmUgYmVpbmcgdXNlZC5cbiAqL1xuZGF0YS5zeW5jID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGlmIChzeW5jZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBkYlV0aWxzLmNsZWFyRGF0YWJhc2UoKTtcblxuICB0aGlzLmZwID0gYXdhaXQgZ2VuZXJhdGUuZmlyc3RQYXJ0eUNyZWRlbnRpYWxzKHtcbiAgICB1c2VybmFtZTogJ2ZwdXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkOiAnZnBfcGFzc3dvcmQnLFxuICAgIGNsaWVudE5hbWU6ICdmcF9jbGllbnRfbmFtZScsXG4gICAgcHJvZmlsZToge1xuICAgICAgZW1haWw6ICd0ZXN0QGZwLmNvbScsXG4gICAgICBuYW1lOiB7XG4gICAgICAgIGZpcnN0OiAnUHJlbWllcicsXG4gICAgICAgIGxhc3Q6ICdQYXJ0eSdcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHRoaXMudHAgPSBhd2FpdCBnZW5lcmF0ZS50aGlyZFBhcnR5Q3JlZGVudGlhbHMoe1xuICAgIHVzZXJuYW1lOiAndHB1c2VybmFtZScsXG4gICAgcGFzc3dvcmQ6ICd0cF9wYXNzd29yZCcsXG4gICAgY2xpZW50TmFtZTogJ3RwX2NsaWVudF9uYW1lJyxcbiAgICBwcm9maWxlOiB7XG4gICAgICBlbWFpbDogJ3Rlc3RAdHAuY29tJyxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZmlyc3Q6ICdad2VpdGUnLFxuICAgICAgICBsYXN0OiAnUGFydHknXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICB0aGlzLmZwLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZCA9ICdmcF9wYXNzd29yZCc7XG4gIHRoaXMudHAuYWNjb3VudC51bmVuY3J5cHRlZFBhc3N3b3JkID0gJ3RwX3Bhc3N3b3JkJztcblxuICB0aGlzLnRlbXBBY2NvdW50MSA9IGF3YWl0IG5ldyBBY2NvdW50KGR1bW15LmFjY291bnQoKSkuc2F2ZUFsbCgpO1xuICB0aGlzLnRlbXBBY2NvdW50MiA9IGF3YWl0IG5ldyBBY2NvdW50KGR1bW15LmFjY291bnQoKSkuc2F2ZUFsbCgpO1xuXG4gIHRoaXMucG9zdDEgPSBhd2FpdCBuZXcgUG9zdChkdW1teS5wb3N0KHsgYWNjb3VudElkOiB0aGlzLmZwLmFjY291bnQuaWQgfSkpLnNhdmUoKTtcbiAgdGhpcy5wb3N0MiA9IGF3YWl0IG5ldyBQb3N0KGR1bW15LnBvc3QoeyBhY2NvdW50SWQ6IHRoaXMudHAuYWNjb3VudC5pZCB9KSkuc2F2ZSgpO1xuXG4gIHRoaXMuY29tbWVudDEgPSBhd2FpdCBuZXcgQ29tbWVudChkdW1teS5jb21tZW50KHsgYWNjb3VudElkOiB0aGlzLmZwLmFjY291bnQuaWQsIHBvc3RJZDogdGhpcy5wb3N0MS5pZCB9KSkuc2F2ZSgpO1xuICB0aGlzLmNvbW1lbnQyID0gYXdhaXQgbmV3IENvbW1lbnQoZHVtbXkuY29tbWVudCh7IGFjY291bnRJZDogdGhpcy50cC5hY2NvdW50LmlkLCBwb3N0SWQ6IHRoaXMucG9zdDIuaWQgfSkpLnNhdmUoKTtcblxuICBzeW5jZWQgPSB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YTtcbiJdfQ==