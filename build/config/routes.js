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
        if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound) {
          var docName = docNameRegex.exec(error.message)[1];
          reply(_boom2['default'].notFound(docName + ' not found'));
        } else {
          reply(error);
        }
      });
    }
  };

  return route;
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OytCQUNqQixxQkFBcUI7Ozs7K0JBRXJCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7QUFFaEQsSUFBTSxJQUFJLEdBQUcsa0NBQWMsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sT0FBTyxHQUFHLHFDQUFpQixDQUFDOztBQUVsQyxJQUFNLE1BQU0sR0FBRzs7QUFFYjtBQUNFLFFBQU0sRUFBRSxLQUFLO0FBQ2IsTUFBSSxFQUFFLEdBQUc7QUFDVCxTQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDbkIsUUFBTSxFQUFFO0FBQ04sUUFBSSxFQUFFO0FBQ0osVUFBSSxFQUFFLEtBQUs7S0FDWjtHQUNGO0NBQ0Y7OztBQUdEO0FBQ0UsUUFBTSxFQUFFLE1BQU07QUFDZCxNQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFNBQU8sRUFBRSxJQUFJLENBQUMsU0FBUztBQUN2QixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixZQUFNLEVBQUUsNkJBQVMsV0FBVztLQUM3QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGFBQUssRUFBRSxpQkFBSSxNQUFNLEVBQUU7QUFDbkIsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7T0FDbEM7S0FDRjtHQUNGO0NBQ0YsRUFBRTtBQUNELFFBQU0sRUFBRSxNQUFNO0FBQ2QsTUFBSSxFQUFFLHNCQUFzQjtBQUM1QixTQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDMUIsUUFBTSxFQUFFO0FBQ04sUUFBSSxFQUFFO0FBQ0osWUFBTSxFQUFFLDZCQUFTLFdBQVc7S0FDN0I7QUFDRCxZQUFRLEVBQUU7QUFDUixhQUFPLEVB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QUFDO0FBQ3BELGVBQUssQ0FBQyxrQkFBSyxRQUFRLENBQUksT0FBTyxnQkFBYSxDQUFDLENBQUM7U0FDOUMsTUFBTTtBQUNMLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNkO09BQ0YsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQyIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vbSBmcm9tICdib29tJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcblxuaW1wb3J0IHRoaW5reSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi4vaGVscGVycy9lbnRpdGllcyc7XG5cbmltcG9ydCBIb21lQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9ob21lJztcbmltcG9ydCBBdXRoQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hdXRoJztcbmltcG9ydCBBY2NvdW50Q3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hY2NvdW50JztcblxuY29uc3QgaG9tZSA9IG5ldyBIb21lQ3RybCgpO1xuY29uc3QgYXV0aCA9IG5ldyBBdXRoQ3RybCgpO1xuY29uc3QgYWNjb3VudCA9IG5ldyBBY2NvdW50Q3RybCgpO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIC8vIEhvbWVcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy8nLFxuICAgIGhhbmRsZXI6IGhvbWUuaW5kZXgsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIG1vZGU6ICd0cnknXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEF1dGhcbiAge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvYXV0aG9yaXplJyxcbiAgICBoYW5kbGVyOiBhdXRoLmF1dGhvcml6ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzY29wZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgIGNsaWVudElkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9vYXV0aC9leGNoYW5nZS9jb2RlJyxcbiAgICBoYW5kbGVyOiBhdXRoLmV4Y2hhbmdlQ29kZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBjb2RlOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBjbGllbnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgY2xpZW50U2VjcmV0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9vYXV0aC9leGNoYW5nZS9jcmVkZW50aWFscycsXG4gICAgaGFuZGxlcjogYXV0aC5leGNoYW5nZUNyZWRlbnRpYWxzLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBlbnRpdHk6IGVudGl0aWVzLkZJUlNUX1BBUlRZXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBBY2NvdW50XG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudCcsXG4gICAgaGFuZGxlcjogYWNjb3VudC5nZXRBdXRoZW50aWNhdGVkXG4gIH0sIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudC97aWR9JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmdldFxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9hY2NvdW50JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmNyZWF0ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkuZW1haWwoKS5tYXgoNjQpLmxvd2VyY2FzZSgpLnRyaW0oKSxcbiAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkuYWxwaGFudW0oKS5taW4oNCkubWF4KDEyKS50cmltKCksXG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLm1pbig2KS5tYXgoMzIpLnRyaW0oKSxcbiAgICAgICAgICBmaXJzdE5hbWU6IEpvaS5zdHJpbmcoKS5taW4oMSkubWF4KDMyKS50cmltKCksXG4gICAgICAgICAgbGFzdE5hbWU6IEpvaS5zdHJpbmcoKS5taW4oMSkubWF4KDMyKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXTtcblxuLy8gQ2F0Y2ggZXJyb3JzIGZvciBhc3luYyBoYW5kbGVyc1xuZXhwb3J0IGRlZmF1bHQgcm91dGVzLm1hcChyb3V0ZSA9PiB7XG4gIGNvbnN0IGhhbmRsZXIgPSByb3V0ZS5oYW5kbGVyO1xuICBjb25zdCBkb2NOYW1lUmVnZXggPSAvLipyXFwudGFibGVcXChcIiguKz8pXCJcXCkuKi9nbTtcblxuICByb3V0ZS5oYW5kbGVyID0gZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNhdGNoKSB7XG4gICAgICByZXN1bHQuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB0aGlua3kuRXJyb3JzLkRvY3VtZW50Tm90Rm91bmQpIHtcbiAgICAgICAgICBjb25zdCBkb2NOYW1lID0gZG9jTmFtZVJlZ2V4LmV4ZWMoZXJyb3IubWVzc2FnZSlbMV07XG4gICAgICAgICAgcmVwbHkoQm9vbS5ub3RGb3VuZChgJHtkb2NOYW1lfSBub3QgZm91bmRgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbHkoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHJvdXRlO1xufSk7XG4iXX0=