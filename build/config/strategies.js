'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

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
        var token = yield _modelsToken2['default'].get(accessToken).getJoin().run();
        delete token.account.password;

        console.log('credentials', {
          client: token.client,
          scope: token.scope
        });

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
      account: function account(request, credentials, callback) {
        var matchesUsername = request.params.id === credentials.account.username;
        var matchesId = request.params.id === credentials.account.id;
        callback(null, matchesUsername || matchesId);
      },
      profile: function profile(request, credentials, callback) {
        var matchesEmail = request.params.id === credentials.profile.email;
        var matchesId = request.params.id === credentials.profile.id;
        callback(null, matchesEmail || matchesId);
      },
      comment: _bluebird.coroutine(function* (request, credentials, callback) {
        var commentId = request.params.id || request.payload.commentId;

        try {
          var comment = yield _modelsComment2['default'].get(commentId).run();
          callback(null, comment.post.accountId === credentials.profile.id);
        } catch (error) {
          callback(error, false);
        }
      }),
      post: _bluebird.coroutine(function* (request, credentials, callback) {
        var postId = request.params.id || request.payload.postId;

        try {
          var post = yield _modelsPost2['default'].get(postId).run();
          callback(null, post.accountId === credentials.profile.id);
        } catch (error) {
          callback(error, false);
        }
      })
    }
  }
}];

exports['default'] = strategies;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3RyYXRlZ2llcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzJCQUFrQixpQkFBaUI7Ozs7NkJBQ2hCLG1CQUFtQjs7Ozs2QkFFbEIsbUJBQW1COzs7OzBCQUN0QixnQkFBZ0I7Ozs7QUFFakMsSUFBTSxVQUFVLEdBQUcsQ0FBQztBQUNsQixNQUFJLEVBQUUsUUFBUTtBQUNkLFFBQU0sRUFBRSxxQkFBcUI7QUFDN0IsU0FBTyxFQUFFO0FBQ1AsZ0JBQVksc0JBQUUsV0FBZSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQ2xELFVBQUk7QUFDRixZQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzRCxlQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDOztBQUU5QixlQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtBQUN6QixnQkFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ3BCLGVBQUssRUFBRSxLQUFLLENBQUMsS0FBSztTQUNuQixDQUFDLENBQUM7O0FBRUgsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ25CLGlCQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDdEIsZ0JBQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNwQixlQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO09BQ0osQ0FBQyxPQUFPLEtBQUssRUFBRTs7QUFFZCxZQUFJLEtBQUssWUFBWSwyQkFBTyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7QUFDbkQsa0JBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkIsTUFBTTtBQUNMLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakI7O09BRUY7S0FDRixDQUFBO0dBQ0Y7Q0FDRixFQUFFO0FBQ0QsTUFBSSxFQUFFLFdBQVc7QUFDakIsUUFBTSxFQUFFLGtCQUFrQjtBQUMxQixTQUFPLEVBQUU7QUFDUCxxQkFBaUIsRUFBRSxRQUFRO0FBQzNCLFNBQUssRUFBRTtBQUNMLGFBQU8sRUFBRSxpQkFBUyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtBQUNoRCxZQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUMzRSxZQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUMvRCxnQkFBUSxDQUFDLElBQUksRUFBRSxlQUFlLElBQUksU0FBUyxDQUFDLENBQUM7T0FDOUM7QUFDRCxhQUFPLEVBQUUsaUJBQVMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7QUFDaEQsWUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDckUsWUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDL0QsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxJQUFJLFNBQVMsQ0FBQyxDQUFDO09BQzNDO0FBQ0QsYUFBTyxzQkFBRSxXQUFlLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQ3RELFlBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztBQUVqRSxZQUFJO0FBQ0YsY0FBTSxPQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkQsa0JBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRSxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2Qsa0JBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEI7T0FDRixDQUFBO0FBQ0QsVUFBSSxzQkFBRSxXQUFlLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQ25ELFlBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUUzRCxZQUFJO0FBQ0YsY0FBTSxJQUFJLEdBQUcsTUFBTSx3QkFBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsa0JBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNELENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxrQkFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4QjtPQUNGLENBQUE7S0FDRjtHQUNGO0NBQ0YsQ0FBQyxDQUFDOztxQkFFWSxVQUFVIiwiZmlsZSI6InN0cmF0ZWdpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9rZW4gZnJvbSAnLi4vbW9kZWxzL3Rva2VuJztcbmltcG9ydCB0aGlua3kgZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9tb2RlbHMvY29tbWVudCc7XG5pbXBvcnQgUG9zdCBmcm9tICcuLi9tb2RlbHMvcG9zdCc7XG5cbmNvbnN0IHN0cmF0ZWdpZXMgPSBbe1xuICBuYW1lOiAnYmVhcmVyJyxcbiAgc2NoZW1lOiAnYmVhcmVyLWFjY2Vzcy10b2tlbicsXG4gIG9wdGlvbnM6IHtcbiAgICB2YWxpZGF0ZUZ1bmM6IGFzeW5jIGZ1bmN0aW9uKGFjY2Vzc1Rva2VuLCBjYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBUb2tlbi5nZXQoYWNjZXNzVG9rZW4pLmdldEpvaW4oKS5ydW4oKTtcbiAgICAgICAgZGVsZXRlIHRva2VuLmFjY291bnQucGFzc3dvcmQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWRlbnRpYWxzJywge1xuICAgICAgICAgIGNsaWVudDogdG9rZW4uY2xpZW50LFxuICAgICAgICAgIHNjb3BlOiB0b2tlbi5zY29wZVxuICAgICAgICB9KTtcblxuICAgICAgICBjYWxsYmFjayhudWxsLCB0cnVlLCB7XG4gICAgICAgICAgYWNjb3VudDogdG9rZW4uYWNjb3VudCxcbiAgICAgICAgICBjbGllbnQ6IHRva2VuLmNsaWVudCxcbiAgICAgICAgICBzY29wZTogdG9rZW4uc2NvcGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgdGhpbmt5LkVycm9ycy5Eb2N1bWVudE5vdEZvdW5kKSB7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9uJFxuICAgICAgfVxuICAgIH1cbiAgfVxufSwge1xuICBuYW1lOiAnb3duZXJzaGlwJyxcbiAgc2NoZW1lOiAnb3duZXJzaGlwLWFjY2VzcycsXG4gIG9wdGlvbnM6IHtcbiAgICBjb21wYW5pb25TdHJhdGVneTogJ2JlYXJlcicsXG4gICAgcnVsZXM6IHtcbiAgICAgIGFjY291bnQ6IGZ1bmN0aW9uKHJlcXVlc3QsIGNyZWRlbnRpYWxzLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBtYXRjaGVzVXNlcm5hbWUgPSByZXF1ZXN0LnBhcmFtcy5pZCA9PT0gY3JlZGVudGlhbHMuYWNjb3VudC51c2VybmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2hlc0lkID0gcmVxdWVzdC5wYXJhbXMuaWQgPT09IGNyZWRlbnRpYWxzLmFjY291bnQuaWQ7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoZXNVc2VybmFtZSB8fCBtYXRjaGVzSWQpO1xuICAgICAgfSxcbiAgICAgIHByb2ZpbGU6IGZ1bmN0aW9uKHJlcXVlc3QsIGNyZWRlbnRpYWxzLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBtYXRjaGVzRW1haWwgPSByZXF1ZXN0LnBhcmFtcy5pZCA9PT0gY3JlZGVudGlhbHMucHJvZmlsZS5lbWFpbDtcbiAgICAgICAgY29uc3QgbWF0Y2hlc0lkID0gcmVxdWVzdC5wYXJhbXMuaWQgPT09IGNyZWRlbnRpYWxzLnByb2ZpbGUuaWQ7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoZXNFbWFpbCB8fCBtYXRjaGVzSWQpO1xuICAgICAgfSxcbiAgICAgIGNvbW1lbnQ6IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3QsIGNyZWRlbnRpYWxzLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjb21tZW50SWQgPSByZXF1ZXN0LnBhcmFtcy5pZCB8fCByZXF1ZXN0LnBheWxvYWQuY29tbWVudElkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29tbWVudCA9IGF3YWl0IENvbW1lbnQuZ2V0KGNvbW1lbnRJZCkucnVuKCk7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgY29tbWVudC5wb3N0LmFjY291bnRJZCA9PT0gY3JlZGVudGlhbHMucHJvZmlsZS5pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBvc3Q6IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3QsIGNyZWRlbnRpYWxzLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBwb3N0SWQgPSByZXF1ZXN0LnBhcmFtcy5pZCB8fCByZXF1ZXN0LnBheWxvYWQucG9zdElkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZ2V0KHBvc3RJZCkucnVuKCk7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgcG9zdC5hY2NvdW50SWQgPT09IGNyZWRlbnRpYWxzLnByb2ZpbGUuaWQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1dO1xuXG5leHBvcnQgZGVmYXVsdCBzdHJhdGVnaWVzO1xuIl19