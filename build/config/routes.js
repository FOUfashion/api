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

var _controllersProfile = require('../controllers/profile');

var _controllersProfile2 = _interopRequireDefault(_controllersProfile);

var home = new _controllersHome2['default']();
var auth = new _controllersAuth2['default']();
var account = new _controllersAccount2['default']();
var profile = new _controllersProfile2['default']();

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
  path: '/login',
  handler: auth.logIn,
  config: {
    validate: {
      payload: {
        username: _joi2['default'].string().required(),
        password: _joi2['default'].string().required()
      }
    }
  }
}, {
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
},

// Profile
{
  method: 'GET',
  path: '/profile',
  handler: profile.get,
  config: {
    validate: {
      query: {
        email: _joi2['default'].string().required().email().max(64).lowercase().trim()
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
          var matches = docNameRegex.exec(error.message);
          var docName = matches && matches[1] || 'Document';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OytCQUNqQixxQkFBcUI7Ozs7K0JBRXJCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7a0NBQ3hCLHdCQUF3Qjs7OztBQUVoRCxJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sSUFBSSxHQUFHLGtDQUFjLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7QUFDbEMsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7O0FBRWxDLElBQU0sTUFBTSxHQUFHOztBQUViO0FBQ0UsUUFBTSxFQUFFLEtBQUs7QUFDYixNQUFJLEVBQUUsR0FBRztBQUNULFNBQU8sRUFBRSxJQUFJLENBQUMsS0FBSztBQUNuQixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixVQUFJLEVBQUUsS0FBSztLQUNaO0dBQ0Y7Q0FDRjs7O0FBR0Q7QUFDRSxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxRQUFRO0FBQ2QsU0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ25CLFFBQU0sRUFBRTtBQUNOLFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2pDLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO09BQ2xDO0tBQ0Y7R0FDRjtDQUNGLEVBQUU7QUFDRCxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxrQkFBa0I7QUFDeEIsU0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO0FBQ3ZCLFFBQU0sRUFBRTtBQUNOLFFBQUksRUFBRTtBQUNKLFlBQU0sRUFBRSw2QkFBUyxXQUFXO0tBQzdCO0FBQ0QsWUFBUSxF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QU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUU7T0FDbEU7S0FDRjtHQUNGO0NBQ0YsQ0FDRixDQUFDOzs7cUJBR2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNqQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzlCLE1BQU0sWUFBWSxHQUFHLDJCQUEyQixDQUFDOztBQUVqRCxPQUFLLENBQUMsT0FBTyxHQUFHLFVBQVMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN2QyxRQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV2QyxRQUFJLE1BQU0sSUFBSSxNQUFNLFNBQU0sRUFBRTtBQUMxQixZQUFNLFNBQU0sQ0FBQyxVQUFBLEtBQUssRUFBSTs7QUFFcEIsWUFBSSxLQUFLLFlBQVksMkJBQU8sTUFBTSxDQUFDLGdCQUFnQixFQUFFO0FBQ25ELGNBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELGNBQU0sT0FBTyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDO0FBQ3BELGVBQUssQ0FBQyxrQkFBSyxRQUFRLENBQUksT0FBTyxnQkFBYSxDQUFDLENBQUM7U0FDOUMsTUFBTTtBQUNMLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNkOztBQUFBLE9BRUYsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQyIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vbSBmcm9tICdib29tJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcblxuaW1wb3J0IHRoaW5reSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi4vaGVscGVycy9lbnRpdGllcyc7XG5cbmltcG9ydCBIb21lQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9ob21lJztcbmltcG9ydCBBdXRoQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hdXRoJztcbmltcG9ydCBBY2NvdW50Q3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9wcm9maWxlJztcblxuY29uc3QgaG9tZSA9IG5ldyBIb21lQ3RybCgpO1xuY29uc3QgYXV0aCA9IG5ldyBBdXRoQ3RybCgpO1xuY29uc3QgYWNjb3VudCA9IG5ldyBBY2NvdW50Q3RybCgpO1xuY29uc3QgcHJvZmlsZSA9IG5ldyBQcm9maWxlQ3RybCgpO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIC8vIEhvbWVcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy8nLFxuICAgIGhhbmRsZXI6IGhvbWUuaW5kZXgsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIG1vZGU6ICd0cnknXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEF1dGhcbiAge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvbG9naW4nLFxuICAgIGhhbmRsZXI6IGF1dGgubG9nSW4sXG4gICAgY29uZmlnOiB7XG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9vYXV0aC9hdXRob3JpemUnLFxuICAgIGhhbmRsZXI6IGF1dGguYXV0aG9yaXplLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBlbnRpdHk6IGVudGl0aWVzLkZJUlNUX1BBUlRZXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNjb3BlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgY2xpZW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL29hdXRoL2V4Y2hhbmdlL2NvZGUnLFxuICAgIGhhbmRsZXI6IGF1dGguZXhjaGFuZ2VDb2RlLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBlbnRpdHk6IGVudGl0aWVzLkZJUlNUX1BBUlRZXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGNvZGU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIGNsaWVudElkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBjbGllbnRTZWNyZXQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL29hdXRoL2V4Y2hhbmdlL2NyZWRlbnRpYWxzJyxcbiAgICBoYW5kbGVyOiBhdXRoLmV4Y2hhbmdlQ3JlZGVudGlhbHMsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEFjY291bnRcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy9hY2NvdW50JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmdldEF1dGhlbnRpY2F0ZWRcbiAgfSwge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy9hY2NvdW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGFjY291bnQuZ2V0XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL2FjY291bnQnLFxuICAgIGhhbmRsZXI6IGFjY291bnQuY3JlYXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBlbnRpdHk6IGVudGl0aWVzLkZJUlNUX1BBUlRZXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5lbWFpbCgpLm1heCg2NCkubG93ZXJjYXNlKCkudHJpbSgpLFxuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5hbHBoYW51bSgpLm1pbig0KS5tYXgoMTIpLnRyaW0oKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkubWluKDYpLm1heCgzMikudHJpbSgpLFxuICAgICAgICAgIGZpcnN0TmFtZTogSm9pLnN0cmluZygpLm1pbigxKS5tYXgoMzIpLnRyaW0oKSxcbiAgICAgICAgICBsYXN0TmFtZTogSm9pLnN0cmluZygpLm1pbigxKS5tYXgoMzIpLnRyaW0oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFByb2ZpbGVcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy9wcm9maWxlJyxcbiAgICBoYW5kbGVyOiBwcm9maWxlLmdldCxcbiAgICBjb25maWc6IHtcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLmVtYWlsKCkubWF4KDY0KS5sb3dlcmNhc2UoKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXTtcblxuLy8gQ2F0Y2ggZXJyb3JzIGZvciBhc3luYyBoYW5kbGVyc1xuZXhwb3J0IGRlZmF1bHQgcm91dGVzLm1hcChyb3V0ZSA9PiB7XG4gIGNvbnN0IGhhbmRsZXIgPSByb3V0ZS5oYW5kbGVyO1xuICBjb25zdCBkb2NOYW1lUmVnZXggPSAvLipyXFwudGFibGVcXChcIiguKz8pXCJcXCkuKi9nbTtcblxuICByb3V0ZS5oYW5kbGVyID0gZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNhdGNoKSB7XG4gICAgICByZXN1bHQuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgdGhpbmt5LkVycm9ycy5Eb2N1bWVudE5vdEZvdW5kKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRvY05hbWVSZWdleC5leGVjKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIGNvbnN0IGRvY05hbWUgPSBtYXRjaGVzICYmIG1hdGNoZXNbMV0gfHwgJ0RvY3VtZW50JztcbiAgICAgICAgICByZXBseShCb29tLm5vdEZvdW5kKGAke2RvY05hbWV9IG5vdCBmb3VuZGApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBseShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gcm91dGU7XG59KTtcbiJdfQ==