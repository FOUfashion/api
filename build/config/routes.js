'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _helpersEntities = require('../helpers/entities');

var _helpersEntities2 = _interopRequireDefault(_helpersEntities);

var _controllersHome = require('../controllers/home');

var _controllersHome2 = _interopRequireDefault(_controllersHome);

var _controllersAuth = require('../controllers/auth');

var _controllersAuth2 = _interopRequireDefault(_controllersAuth);

var _controllersAccount = require('../controllers/account');

var _controllersAccount2 = _interopRequireDefault(_controllersAccount);

var home = new _controllersHome2['default']();
var auth = new _controllersAuth2['default']();
var account = new _controllersAccount2['default']();

var routes = [
// Home
{
  method: 'GET',
  path: '/',
  handler: home.index,
  config: {
    auth: {
      mode: 'try'
    }
  }
},

// Auth
{
  method: 'POST',
  path: '/oauth/authorize',
  handler: auth.authorize,
  config: {
    auth: {
      entity: _helpersEntities2['default'].FIRST_PARTY
    },
    validate: {
      payload: {
        scope: _joi2['default'].string(),
        clientId: _joi2['default'].string().required()
      }
    }
  }
}, {
  method: 'POST',
  path: '/oauth/exchange/code',
  handler: auth.exchangeCode,
  config: {
    auth: {
      entity: _helpersEntities2['default'].FIRST_PARTY
    },
    validate: {
      payload: {
        code: _joi2['default'].string().required(),
        clientId: _joi2['default'].string().required(),
        clientSecret: _joi2['default'].string().required()
      }
    }
  }
}, {
  method: 'POST',
  path: '/oauth/exchange/credentials',
  handler: auth.exchangeCredentials,
  config: {
    auth: {
      entity: _helpersEntities2['default'].FIRST_PARTY
    },
    validate: {
      payload: {
        username: _joi2['default'].string().required(),
        password: _joi2['default'].string().required()
      }
    }
  }
},

// Account
{
  method: 'GET',
  path: '/account',
  handler: account.getAuthenticated
}, {
  method: 'GET',
  path: '/account/{id}',
  handler: account.get
}, {
  method: 'POST',
  path: '/account',
  handler: account.create,
  config: {
    auth: {
      entity: _helpersEntities2['default'].FIRST_PARTY
    },
    validate: {
      payload: {
        email: _joi2['default'].string().required().email().max(64).lowercase().trim(),
        username: _joi2['default'].string().required().alphanum().min(4).max(12).trim(),
        password: _joi2['default'].string().required().min(6).max(32).trim(),
        firstName: _joi2['default'].string().min(1).max(32).trim(),
        lastName: _joi2['default'].string().min(1).max(32).trim()
      }
    }
  }
}];

// Catch errors for async handlers
exports['default'] = routes.map(function (route) {
  var handler = route.handler;
  var docNameRegex = /.*r\.table\("(.+?)"\).*/gm;

  route.handler = function (request, reply) {
    var result = handler(request, reply);

    if (result && result['catch']) {
      result['catch'](function (error) {
        // $lab:coverage:off$
        if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound) {
          var docName = docNameRegex.exec(error.message)[1];
          reply(_boom2['default'].notFound(docName + ' not found'));
        } else {
          reply(error);
        }
        // $lab:coverage:on$
      });
    }
  };

  return route;
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OytCQUNqQixxQkFBcUI7Ozs7K0JBRXJCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7QUFFaEQsSUFBTSxJQUFJLEdBQUcsa0NBQWMsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sT0FBTyxHQUFHLHFDQUFpQixDQUFDOztBQUVsQyxJQUFNLE1BQU0sR0FBRzs7QUFFYjtBQUNFLFFBQU0sRUFBRSxLQUFLO0FBQ2IsTUFBSSxFQUFFLEdBQUc7QUFDVCxTQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDbkIsUUFBTSxFQUFFO0FBQ04sUUFBSSxFQUFFO0FBQ0osVUFBSSxFQUFFLEtBQUs7S0FDWjtHQUNGO0NBQ0Y7OztBQUdEO0FBQ0UsUUFBTSxFQUFFLE1BQU07QUFDZCxNQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFNBQU8sRUFBRSxJQUFJLENBQUMsU0FBUztBQUN2QixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixZQUFNLEVBQUUsNkJBQVMsV0FBVztLQUM3QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGFBQUssRUFBRSxpQkFBSSxNQUFNLEVBQUU7QUFDbkIsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7T0FDbEM7S0FDRjtHQUNGO0NBQ0YsRUFBRTtBQUNELFFBQU0sRUFBRSxNQUFNO0FBQ2QsTUFBSSxFQUFFLHNCQUFzQjtBQUM1QixTQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDMUIsUUFBTSxFQUFFO0FBQ04sUUFBSSxFQUFFO0FBQ0osWUFBTSxFQUFFLDZCQUFTLFdBQVc7S0FDN0I7QUFDRCxZQUFRLEVBQUU7QUFDUixhQUFPLEVB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Q0FBQztBQUNwRCxlQUFLLENBQUMsa0JBQUssUUFBUSxDQUFJLE9BQU8sZ0JBQWEsQ0FBQyxDQUFDO1NBQzlDLE1BQU07QUFDTCxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZDs7QUFBQSxPQUVGLENBQUMsQ0FBQztLQUNKO0dBQ0YsQ0FBQzs7QUFFRixTQUFPLEtBQUssQ0FBQztDQUNkLENBQUMiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvb20gZnJvbSAnYm9vbSc7XG5pbXBvcnQgSm9pIGZyb20gJ2pvaSc7XG5cbmltcG9ydCB0aGlua3kgZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuaW1wb3J0IGVudGl0aWVzIGZyb20gJy4uL2hlbHBlcnMvZW50aXRpZXMnO1xuXG5pbXBvcnQgSG9tZUN0cmwgZnJvbSAnLi4vY29udHJvbGxlcnMvaG9tZSc7XG5pbXBvcnQgQXV0aEN0cmwgZnJvbSAnLi4vY29udHJvbGxlcnMvYXV0aCc7XG5pbXBvcnQgQWNjb3VudEN0cmwgZnJvbSAnLi4vY29udHJvbGxlcnMvYWNjb3VudCc7XG5cbmNvbnN0IGhvbWUgPSBuZXcgSG9tZUN0cmwoKTtcbmNvbnN0IGF1dGggPSBuZXcgQXV0aEN0cmwoKTtcbmNvbnN0IGFjY291bnQgPSBuZXcgQWNjb3VudEN0cmwoKTtcblxuY29uc3Qgcm91dGVzID0gW1xuICAvLyBIb21lXG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvJyxcbiAgICBoYW5kbGVyOiBob21lLmluZGV4LFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBtb2RlOiAndHJ5J1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBBdXRoXG4gIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL29hdXRoL2F1dGhvcml6ZScsXG4gICAgaGFuZGxlcjogYXV0aC5hdXRob3JpemUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2NvcGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICBjbGllbnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvZXhjaGFuZ2UvY29kZScsXG4gICAgaGFuZGxlcjogYXV0aC5leGNoYW5nZUNvZGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY29kZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgY2xpZW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIGNsaWVudFNlY3JldDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvZXhjaGFuZ2UvY3JlZGVudGlhbHMnLFxuICAgIGhhbmRsZXI6IGF1dGguZXhjaGFuZ2VDcmVkZW50aWFscyxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gQWNjb3VudFxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL2FjY291bnQnLFxuICAgIGhhbmRsZXI6IGFjY291bnQuZ2V0QXV0aGVudGljYXRlZFxuICB9LCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL2FjY291bnQve2lkfScsXG4gICAgaGFuZGxlcjogYWNjb3VudC5nZXRcbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvYWNjb3VudCcsXG4gICAgaGFuZGxlcjogYWNjb3VudC5jcmVhdGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLmVtYWlsKCkubWF4KDY0KS5sb3dlcmNhc2UoKS50cmltKCksXG4gICAgICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLmFscGhhbnVtKCkubWluKDQpLm1heCgxMikudHJpbSgpLFxuICAgICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5taW4oNikubWF4KDMyKS50cmltKCksXG4gICAgICAgICAgZmlyc3ROYW1lOiBKb2kuc3RyaW5nKCkubWluKDEpLm1heCgzMikudHJpbSgpLFxuICAgICAgICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkubWluKDEpLm1heCgzMikudHJpbSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbl07XG5cbi8vIENhdGNoIGVycm9ycyBmb3IgYXN5bmMgaGFuZGxlcnNcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcy5tYXAocm91dGUgPT4ge1xuICBjb25zdCBoYW5kbGVyID0gcm91dGUuaGFuZGxlcjtcbiAgY29uc3QgZG9jTmFtZVJlZ2V4ID0gLy4qclxcLnRhYmxlXFwoXCIoLis/KVwiXFwpLiovZ207XG5cbiAgcm91dGUuaGFuZGxlciA9IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gaGFuZGxlcihyZXF1ZXN0LCByZXBseSk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jYXRjaCkge1xuICAgICAgcmVzdWx0LmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHRoaW5reS5FcnJvcnMuRG9jdW1lbnROb3RGb3VuZCkge1xuICAgICAgICAgIGNvbnN0IGRvY05hbWUgPSBkb2NOYW1lUmVnZXguZXhlYyhlcnJvci5tZXNzYWdlKVsxXTtcbiAgICAgICAgICByZXBseShCb29tLm5vdEZvdW5kKGAke2RvY05hbWV9IG5vdCBmb3VuZGApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBseShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gcm91dGU7XG59KTtcbiJdfQ==