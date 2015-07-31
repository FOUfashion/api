'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var _modelsComment = require('../models/comment');

var _modelsComment2 = _interopRequireDefault(_modelsComment);

var _modelsPost = require('../models/post');

var _modelsPost2 = _interopRequireDefault(_modelsPost);

var strategies = [{
  name: 'bearer',
  scheme: 'bearer-access-token',
  options: {
    validateFunc: _bluebird.coroutine(function* (accessToken, callback) {
      try {
        var token = yield _modelsToken2['default'].get(accessToken).getJoin({ account: { profile: true }, client: true }).run();
        delete token.account.password;

        callback(null, true, {
          account: token.account,
          client: token.client,
          scope: token.scope
        });
      } catch (error) {
        // $lab:coverage:off$
        if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound) {
          callback(null, false);
        } else {
          callback(error);
        }
        // $lab:coverage:on$
      }
    })
  }
}, {
  name: 'ownership',
  scheme: 'ownership-access',
  options: {
    companionStrategy: 'bearer',
    rules: {
      profile: function profile(request, credentials, callback) {
        var matchesEmail = request.params.id === credentials.account.profile.email;
        var matchesId = request.params.id === credentials.account.profile.id;
        callback(null, matchesEmail || matchesId);
      },

      comment: _bluebird.coroutine(function* (request, credentials, callback) {
        try {
          var comment = yield _modelsComment2['default'].get(request.params.id).getJoin({ post: true }).run();
          callback(null, comment.post.accountId === credentials.account.id);
        } catch (error) {
          // $lab:coverage:off$
          if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
            var docNameRegex = /.*r\.table\("(.+?)"\).*/gm;
            var matches = docNameRegex.exec(error.message);
            var docName = matches && matches[1] || 'Document';
            callback(_boom2['default'].notFound(docName + ' not found'), false);
          } else {
            callback(error, false);
          }
          // $lab:coverage:on$
        }
      }),

      post: _bluebird.coroutine(function* (request, credentials, callback) {
        try {
          var post = yield _modelsPost2['default'].get(request.params.id).run();
          callback(null, post.accountId === credentials.account.id);
        } catch (error) {
          // $lab:coverage:off$
          if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
            var docNameRegex = /.*r\.table\("(.+?)"\).*/gm;
            var matches = docNameRegex.exec(error.message);
            var docName = matches && matches[1] || 'Document';
            callback(_boom2['default'].notFound(docName + ' not found'), false);
          } else {
            callback(error, false);
          }
          // $lab:coverage:on$
        }
      })
    }
  }
}];

exports['default'] = strategies;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3RyYXRlZ2llcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUFtQixtQkFBbUI7Ozs7b0JBQ3JCLE1BQU07Ozs7MkJBRUwsaUJBQWlCOzs7OzZCQUNmLG1CQUFtQjs7OzswQkFDdEIsZ0JBQWdCOzs7O0FBRWpDLElBQU0sVUFBVSxHQUFHLENBQUM7QUFDbEIsTUFBSSxFQUFFLFFBQVE7QUFDZCxRQUFNLEVBQUUscUJBQXFCO0FBQzdCLFNBQU8sRUFBRTtBQUNQLGdCQUFZLHNCQUFFLFdBQWUsV0FBVyxFQUFFLFFBQVEsRUFBRTtBQUNsRCxVQUFJO0FBQ0YsWUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBTSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZHLGVBQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0FBRTlCLGdCQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNuQixpQkFBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO0FBQ3RCLGdCQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDcEIsZUFBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ25CLENBQUMsQ0FBQztPQUNKLENBQUMsT0FBTyxLQUFLLEVBQUU7O0FBRWQsWUFBSSxLQUFLLFlBQVksMkJBQU8sTUFBTSxDQUFDLGdCQUFnQixFQUFFO0FBQ25ELGtCQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCLE1BQU07QUFDTCxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pCOztPQUVGO0tBQ0YsQ0FBQTtHQUNGO0NBQ0YsRUFBRTtBQUNELE1BQUksRUFBRSxXQUFXO0FBQ2pCLFFBQU0sRUFBRSxrQkFBa0I7QUFDMUIs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WyJpbXBvcnQgdGhpbmt5IGZyb20gJy4uL2hlbHBlcnMvdGhpbmt5JztcbmltcG9ydCBCb29tIGZyb20gJ2Jvb20nO1xuXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi4vbW9kZWxzL3Rva2VuJztcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL21vZGVscy9jb21tZW50JztcbmltcG9ydCBQb3N0IGZyb20gJy4uL21vZGVscy9wb3N0JztcblxuY29uc3Qgc3RyYXRlZ2llcyA9IFt7XG4gIG5hbWU6ICdiZWFyZXInLFxuICBzY2hlbWU6ICdiZWFyZXItYWNjZXNzLXRva2VuJyxcbiAgb3B0aW9uczoge1xuICAgIHZhbGlkYXRlRnVuYzogYXN5bmMgZnVuY3Rpb24oYWNjZXNzVG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IFRva2VuLmdldChhY2Nlc3NUb2tlbikuZ2V0Sm9pbih7IGFjY291bnQ6IHsgcHJvZmlsZTogdHJ1ZSB9LCBjbGllbnQ6IHRydWUgfSkucnVuKCk7XG4gICAgICAgIGRlbGV0ZSB0b2tlbi5hY2NvdW50LnBhc3N3b3JkO1xuXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHRydWUsIHtcbiAgICAgICAgICBhY2NvdW50OiB0b2tlbi5hY2NvdW50LFxuICAgICAgICAgIGNsaWVudDogdG9rZW4uY2xpZW50LFxuICAgICAgICAgIHNjb3BlOiB0b2tlbi5zY29wZVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB0aGlua3kuRXJyb3JzLkRvY3VtZW50Tm90Rm91bmQpIHtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b24kXG4gICAgICB9XG4gICAgfVxuICB9XG59LCB7XG4gIG5hbWU6ICdvd25lcnNoaXAnLFxuICBzY2hlbWU6ICdvd25lcnNoaXAtYWNjZXNzJyxcbiAgb3B0aW9uczoge1xuICAgIGNvbXBhbmlvblN0cmF0ZWd5OiAnYmVhcmVyJyxcbiAgICBydWxlczoge1xuICAgICAgcHJvZmlsZTogZnVuY3Rpb24ocmVxdWVzdCwgY3JlZGVudGlhbHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXNFbWFpbCA9IHJlcXVlc3QucGFyYW1zLmlkID09PSBjcmVkZW50aWFscy5hY2NvdW50LnByb2ZpbGUuZW1haWw7XG4gICAgICAgIGNvbnN0IG1hdGNoZXNJZCA9IHJlcXVlc3QucGFyYW1zLmlkID09PSBjcmVkZW50aWFscy5hY2NvdW50LnByb2ZpbGUuaWQ7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoZXNFbWFpbCB8fCBtYXRjaGVzSWQpO1xuICAgICAgfSxcblxuICAgICAgY29tbWVudDogYXN5bmMgZnVuY3Rpb24ocmVxdWVzdCwgY3JlZGVudGlhbHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29tbWVudCA9IGF3YWl0IENvbW1lbnQuZ2V0KHJlcXVlc3QucGFyYW1zLmlkKS5nZXRKb2luKHsgcG9zdDogdHJ1ZSB9KS5ydW4oKTtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBjb21tZW50LnBvc3QuYWNjb3VudElkID09PSBjcmVkZW50aWFscy5hY2NvdW50LmlkKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB0aGlua3kuRXJyb3JzLkRvY3VtZW50Tm90Rm91bmQgfHwgZXJyb3IubWVzc2FnZS5pbmNsdWRlcygnSW5kZXggb3V0IG9mIGJvdW5kczogMCcpKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NOYW1lUmVnZXggPSAvLipyXFwudGFibGVcXChcIiguKz8pXCJcXCkuKi9nbTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkb2NOYW1lUmVnZXguZXhlYyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnN0IGRvY05hbWUgPSBtYXRjaGVzICYmIG1hdGNoZXNbMV0gfHwgJ0RvY3VtZW50JztcbiAgICAgICAgICAgIGNhbGxiYWNrKEJvb20ubm90Rm91bmQoYCR7ZG9jTmFtZX0gbm90IGZvdW5kYCksIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcG9zdDogYXN5bmMgZnVuY3Rpb24ocmVxdWVzdCwgY3JlZGVudGlhbHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZ2V0KHJlcXVlc3QucGFyYW1zLmlkKS5ydW4oKTtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBwb3N0LmFjY291bnRJZCA9PT0gY3JlZGVudGlhbHMuYWNjb3VudC5pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgdGhpbmt5LkVycm9ycy5Eb2N1bWVudE5vdEZvdW5kIHx8IGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ0luZGV4IG91dCBvZiBib3VuZHM6IDAnKSkge1xuICAgICAgICAgICAgY29uc3QgZG9jTmFtZVJlZ2V4ID0gLy4qclxcLnRhYmxlXFwoXCIoLis/KVwiXFwpLiovZ207XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gZG9jTmFtZVJlZ2V4LmV4ZWMoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zdCBkb2NOYW1lID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzFdIHx8ICdEb2N1bWVudCc7XG4gICAgICAgICAgICBjYWxsYmFjayhCb29tLm5vdEZvdW5kKGAke2RvY05hbWV9IG5vdCBmb3VuZGApLCBmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b24kXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1dO1xuXG5leHBvcnQgZGVmYXVsdCBzdHJhdGVnaWVzO1xuIl19