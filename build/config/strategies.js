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
      // Yep, connected to the other magical weird Gandalf-knows-why stuff.
      // Keep reading if you don't understand this.
      //
      // profile: function(request, credentials, callback) {
      //   const matchesEmail = request.params.id === credentials.profile.email;
      //   const matchesId = request.params.id === credentials.account.profile.id;
      //   callback(null, matchesEmail || matchesId);
      // },

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3RyYXRlZ2llcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUFtQixtQkFBbUI7Ozs7b0JBQ3JCLE1BQU07Ozs7MkJBRUwsaUJBQWlCOzs7OzZCQUNmLG1CQUFtQjs7OzswQkFDdEIsZ0JBQWdCOzs7O0FBRWpDLElBQU0sVUFBVSxHQUFHLENBQUM7QUFDbEIsTUFBSSxFQUFFLFFBQVE7QUFDZCxRQUFNLEVBQUUscUJBQXFCO0FBQzdCLFNBQU8sRUFBRTtBQUNQLGdCQUFZLHNCQUFFLFdBQWUsV0FBVyxFQUFFLFFBQVEsRUFBRTtBQUNsRCxVQUFJO0FBQ0YsWUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBTSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZHLGVBQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0FBRTlCLGdCQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNuQixpQkFBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO0FBQ3RCLGdCQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDcEIsZUFBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ25CLENBQUMsQ0FBQztPQUNKLENBQUMsT0FBTyxLQUFLLEVBQUU7O0FBRWQsWUFBSSxLQUFLLFlBQVksMkJBQU8sTUFBTSxDQUFDLGdCQUFnQixFQUFFO0FBQ25ELGtCQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCLE1BQU07QUFDTCxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pCOztPQUVGO0tBQ0YsQ0FBQTtHQUNGO0NBQ0YsRUFBRTtBQUNELE1BQUksRUFBRSxXQUFXO0FBQ2pCLFFBQU0sRUFBRSxrQkFBa0I7QUFDMUIsU0FBTyxFQUFFO0FBQ1AscUJBQWlCLEVBQUUsUUFBUTtBQUMzQixTQUFLLEVBQUU7Ozs7Ozs7Ozs7QUFVTCxhQUFPLHNCQUFFLFdBQWUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7QUFDdEQsWUFBSTtBQUNGLGNBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkYsa0JBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRSxDQUFDLE9BQU8sS0FBSyxFQUFFOztBQUVkLGNBQUksS0FBSyxZQUFZLDJCQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO0FBQ3ZHLGdCQUFNLFlBQVksR0FBRywyQkFBMkIsQ0FBQztBQUNqRCxnQkFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsZ0JBQU0sT0FBTyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDO0FBQ3BELG9CQUFRLENBQUMsa0JBQUssUUFBUSxDQUFJLE9BQU8sZ0JBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztXQUN4RCxNQUFNO0FBQ0wsb0JBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FDeEI7O1NBRUY7T0FDRixDQUFBOztBQUVELFVBQUksc0JBQUUsV0FBZSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtBQUNuRCxZQUFJO0FBQ0YsY0FBTSxJQUFJLEdBQUcsTUFBTSx3QkFBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxrQkFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0QsQ0FBQyxPQUFPLEtBQUssRUFBRTs7QUFFZCxjQUFJLEtBQUssWUFBWSwyQkFBTyxNQUFNLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRTtBQUN2RyxnQkFBTSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7QUFDakQsZ0JBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELGdCQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQztBQUNwRCxvQkFBUSxDQUFDLGtCQUFLLFFBQVEsQ0FBSSxPQUFPLGdCQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FDeEQsTUFBTTtBQUNMLG9CQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1dBQ3hCOztTQUVGO09BQ0YsQ0FBQTtLQUNGO0dBQ0Y7Q0FDRixDQUFDLENBQUM7O3FCQUVZLFVBQVUiLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aGlua3kgZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuaW1wb3J0IEJvb20gZnJvbSAnYm9vbSc7XG5cbmltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vbW9kZWxzL2NvbW1lbnQnO1xuaW1wb3J0IFBvc3QgZnJvbSAnLi4vbW9kZWxzL3Bvc3QnO1xuXG5jb25zdCBzdHJhdGVnaWVzID0gW3tcbiAgbmFtZTogJ2JlYXJlcicsXG4gIHNjaGVtZTogJ2JlYXJlci1hY2Nlc3MtdG9rZW4nLFxuICBvcHRpb25zOiB7XG4gICAgdmFsaWRhdGVGdW5jOiBhc3luYyBmdW5jdGlvbihhY2Nlc3NUb2tlbiwgY2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgVG9rZW4uZ2V0KGFjY2Vzc1Rva2VuKS5nZXRKb2luKHsgYWNjb3VudDogeyBwcm9maWxlOiB0cnVlIH0sIGNsaWVudDogdHJ1ZSB9KS5ydW4oKTtcbiAgICAgICAgZGVsZXRlIHRva2VuLmFjY291bnQucGFzc3dvcmQ7XG5cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdHJ1ZSwge1xuICAgICAgICAgIGFjY291bnQ6IHRva2VuLmFjY291bnQsXG4gICAgICAgICAgY2xpZW50OiB0b2tlbi5jbGllbnQsXG4gICAgICAgICAgc2NvcGU6IHRva2VuLnNjb3BlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHRoaW5reS5FcnJvcnMuRG9jdW1lbnROb3RGb3VuZCkge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sIHtcbiAgbmFtZTogJ293bmVyc2hpcCcsXG4gIHNjaGVtZTogJ293bmVyc2hpcC1hY2Nlc3MnLFxuICBvcHRpb25zOiB7XG4gICAgY29tcGFuaW9uU3RyYXRlZ3k6ICdiZWFyZXInLFxuICAgIHJ1bGVzOiB7XG4gICAgICAvLyBZZXAsIGNvbm5lY3RlZCB0byB0aGUgb3RoZXIgbWFnaWNhbCB3ZWlyZCBHYW5kYWxmLWtub3dzLXdoeSBzdHVmZi5cbiAgICAgIC8vIEtlZXAgcmVhZGluZyBpZiB5b3UgZG9uJ3QgdW5kZXJzdGFuZCB0aGlzLlxuICAgICAgLy9cbiAgICAgIC8vIHByb2ZpbGU6IGZ1bmN0aW9uKHJlcXVlc3QsIGNyZWRlbnRpYWxzLCBjYWxsYmFjaykge1xuICAgICAgLy8gICBjb25zdCBtYXRjaGVzRW1haWwgPSByZXF1ZXN0LnBhcmFtcy5pZCA9PT0gY3JlZGVudGlhbHMucHJvZmlsZS5lbWFpbDtcbiAgICAgIC8vICAgY29uc3QgbWF0Y2hlc0lkID0gcmVxdWVzdC5wYXJhbXMuaWQgPT09IGNyZWRlbnRpYWxzLmFjY291bnQucHJvZmlsZS5pZDtcbiAgICAgIC8vICAgY2FsbGJhY2sobnVsbCwgbWF0Y2hlc0VtYWlsIHx8IG1hdGNoZXNJZCk7XG4gICAgICAvLyB9LFxuXG4gICAgICBjb21tZW50OiBhc3luYyBmdW5jdGlvbihyZXF1ZXN0LCBjcmVkZW50aWFscywgY2FsbGJhY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLmdldEpvaW4oeyBwb3N0OiB0cnVlIH0pLnJ1bigpO1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGNvbW1lbnQucG9zdC5hY2NvdW50SWQgPT09IGNyZWRlbnRpYWxzLmFjY291bnQuaWQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHRoaW5reS5FcnJvcnMuRG9jdW1lbnROb3RGb3VuZCB8fCBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCdJbmRleCBvdXQgb2YgYm91bmRzOiAwJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY05hbWVSZWdleCA9IC8uKnJcXC50YWJsZVxcKFwiKC4rPylcIlxcKS4qL2dtO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRvY05hbWVSZWdleC5leGVjKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc3QgZG9jTmFtZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSB8fCAnRG9jdW1lbnQnO1xuICAgICAgICAgICAgY2FsbGJhY2soQm9vbS5ub3RGb3VuZChgJHtkb2NOYW1lfSBub3QgZm91bmRgKSwgZmFsc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9uJFxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBwb3N0OiBhc3luYyBmdW5jdGlvbihyZXF1ZXN0LCBjcmVkZW50aWFscywgY2FsbGJhY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwb3N0ID0gYXdhaXQgUG9zdC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLnJ1bigpO1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHBvc3QuYWNjb3VudElkID09PSBjcmVkZW50aWFscy5hY2NvdW50LmlkKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB0aGlua3kuRXJyb3JzLkRvY3VtZW50Tm90Rm91bmQgfHwgZXJyb3IubWVzc2FnZS5pbmNsdWRlcygnSW5kZXggb3V0IG9mIGJvdW5kczogMCcpKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NOYW1lUmVnZXggPSAvLipyXFwudGFibGVcXChcIiguKz8pXCJcXCkuKi9nbTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkb2NOYW1lUmVnZXguZXhlYyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnN0IGRvY05hbWUgPSBtYXRjaGVzICYmIG1hdGNoZXNbMV0gfHwgJ0RvY3VtZW50JztcbiAgICAgICAgICAgIGNhbGxiYWNrKEJvb20ubm90Rm91bmQoYCR7ZG9jTmFtZX0gbm90IGZvdW5kYCksIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufV07XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmF0ZWdpZXM7XG4iXX0=