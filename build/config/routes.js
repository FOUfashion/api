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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OytCQUNqQixxQkFBcUI7Ozs7K0JBRXJCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7a0NBQ3hCLHdCQUF3Qjs7OztBQUVoRCxJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sSUFBSSxHQUFHLGtDQUFjLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7QUFDbEMsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7O0FBRWxDLElBQU0sTUFBTSxHQUFHOztBQUViO0FBQ0UsUUFBTSxFQUFFLEtBQUs7QUFDYixNQUFJLEVBQUUsR0FBRztBQUNULFNBQU8sRUFBRSxJQUFJLENBQUMsS0FBSztBQUNuQixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixVQUFJLEVBQUUsS0FBSztLQUNaO0dBQ0Y7Q0FDRjs7O0FBR0Q7QUFDRSxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxrQkFBa0I7QUFDeEIsU0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO0FBQ3ZCLFFBQU0sRUFBRTtBQUNOLFFBQUksRUFBRTtBQUNKLFlBQU0sRUFBRSw2QkFBUyxXQUFXO0tBQzdCO0FBQ0QsWUFBUSxFQUFFO0FBQ1IsYUFBTyxFQUFFO0FBQ1AsYUFBSyxFQUFFLGlCQUFJLE1BQU0sRUFBRTtBQUNuQixnQkFBUSxFQUFFLGlCQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtPQUNsQztLQUNGO0dBQ0Y7Q0FDRixFQUFFO0FBQ0QsUUFBTSxFQUFFLE1BQU07QUFDZCxNQUFJLEVBQUUsc0JBQXNCO0FBQzVCLFNBQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtBQUMxQixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixZQUFNLEVBQUUsNkJBQVMsV0FBVztLQUM3QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLFlBQUksRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDN0IsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDakMsb0JBQVksRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7T0FDdEM7S0FDRjtHQUNGO0NBQ0YsRUFBRTtBQUNELFFBQU0sRUFBRSxNQUFNO0FBQ2QsTUFBSSxFQUFFLDZCQUE2QjtBQUNuQyxTQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtBQUNqQyxRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixZQUFNLEVBQUUsNkJBQVMsV0FBVztLQUM3QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2pDLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO09BQ2xDO0tBQ0Y7R0FDRjtDQUNGOzs7QUFHRDtBQUNFLFFBQU0sRUFBRSxLQUFLO0FBQ2IsTUFBSSxFQUFFLFVBQVU7QUFDaEIsU0FBTyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0I7Q0FDbEMsRUFBRTtBQUNELFFBQU0sRUFBRSxLQUFLO0FBQ2IsTUFBSSxFQUFFLGVBQWU7QUFDckIsU0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHO0NBQ3JCLEVBQUU7QUFDRCxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxVQUFVO0FBQ2hCLFNBQU8sRUFBRSxPQUFPLENBQUMsTUFBTTtBQUN2QixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixZQUFNLEVBQUUsNkJBQVMsV0FBVztLQUM3QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGFBQUssRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFO0FBQ2pFLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDbEUsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUN2RCxpQkFBUyxFQUFFLGlCQUFJLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzdDLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7T0FDN0M7S0FDRjtHQUNGO0NBQ0Y7OztBQUdEO0FBQ0UsUUFBTSxFQUFFLEtBQUs7QUFDYixNQUFJLEVBQUUsVUFBVTtBQUNoQixTQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUc7QUFDcEIsUUFBTSxFQUFFO0FBQ04sWUFBUSxFQUFFO0FBQ1IsV0FBSyxFQUFFO0FBQ0wsYUFBSyxFQUFFLGlCQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUU7T0FDbEU7S0FDRjtHQUNGO0NBQ0YsQ0FDRixDQUFDOzs7cUJBR2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNqQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzlCLE1BQU0sWUFBWSxHQUFHLDJCQUEyQixDQUFDOztBQUVqRCxPQUFLLENBQUMsT0FBTyxHQUFHLFVBQVMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN2QyxRQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV2QyxRQUFJLE1BQU0sSUFBSSxNQUFNLFNBQU0sRUFBRTtBQUMxQixZQUFNLFNBQU0sQ0FBQyxVQUFBLEtBQUssRUFBSTs7QUFFcEIsWUFBSSxLQUFLLFlBQVksMkJBQU8sTUFBTSxDQUFDLGdCQUFnQixFQUFFO0FBQ25ELGNBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELGNBQU0sT0FBTyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDO0FBQ3BELGVBQUssQ0FBQyxrQkFBSyxRQUFRLENBQUksT0FBTyxnQkFBYSxDQUFDLENBQUM7U0FDOUMsTUFBTTtBQUNMLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNkOztBQUFBLE9BRUYsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQyIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vbSBmcm9tICdib29tJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcblxuaW1wb3J0IHRoaW5reSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi4vaGVscGVycy9lbnRpdGllcyc7XG5cbmltcG9ydCBIb21lQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9ob21lJztcbmltcG9ydCBBdXRoQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hdXRoJztcbmltcG9ydCBBY2NvdW50Q3RybCBmcm9tICcuLi9jb250cm9sbGVycy9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlQ3RybCBmcm9tICcuLi9jb250cm9sbGVycy9wcm9maWxlJztcblxuY29uc3QgaG9tZSA9IG5ldyBIb21lQ3RybCgpO1xuY29uc3QgYXV0aCA9IG5ldyBBdXRoQ3RybCgpO1xuY29uc3QgYWNjb3VudCA9IG5ldyBBY2NvdW50Q3RybCgpO1xuY29uc3QgcHJvZmlsZSA9IG5ldyBQcm9maWxlQ3RybCgpO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gIC8vIEhvbWVcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy8nLFxuICAgIGhhbmRsZXI6IGhvbWUuaW5kZXgsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIG1vZGU6ICd0cnknXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEF1dGhcbiAge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvYXV0aG9yaXplJyxcbiAgICBoYW5kbGVyOiBhdXRoLmF1dGhvcml6ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzY29wZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgIGNsaWVudElkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9vYXV0aC9leGNoYW5nZS9jb2RlJyxcbiAgICBoYW5kbGVyOiBhdXRoLmV4Y2hhbmdlQ29kZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBjb2RlOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBjbGllbnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgY2xpZW50U2VjcmV0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9vYXV0aC9leGNoYW5nZS9jcmVkZW50aWFscycsXG4gICAgaGFuZGxlcjogYXV0aC5leGNoYW5nZUNyZWRlbnRpYWxzLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBlbnRpdHk6IGVudGl0aWVzLkZJUlNUX1BBUlRZXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBBY2NvdW50XG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudCcsXG4gICAgaGFuZGxlcjogYWNjb3VudC5nZXRBdXRoZW50aWNhdGVkXG4gIH0sIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudC97aWR9JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmdldFxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9hY2NvdW50JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmNyZWF0ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkuZW1haWwoKS5tYXgoNjQpLmxvd2VyY2FzZSgpLnRyaW0oKSxcbiAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkuYWxwaGFudW0oKS5taW4oNCkubWF4KDEyKS50cmltKCksXG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLm1pbig2KS5tYXgoMzIpLnRyaW0oKSxcbiAgICAgICAgICBmaXJzdE5hbWU6IEpvaS5zdHJpbmcoKS5taW4oMSkubWF4KDMyKS50cmltKCksXG4gICAgICAgICAgbGFzdE5hbWU6IEpvaS5zdHJpbmcoKS5taW4oMSkubWF4KDMyKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBQcm9maWxlXG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvcHJvZmlsZScsXG4gICAgaGFuZGxlcjogcHJvZmlsZS5nZXQsXG4gICAgY29uZmlnOiB7XG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5lbWFpbCgpLm1heCg2NCkubG93ZXJjYXNlKCkudHJpbSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbl07XG5cbi8vIENhdGNoIGVycm9ycyBmb3IgYXN5bmMgaGFuZGxlcnNcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcy5tYXAocm91dGUgPT4ge1xuICBjb25zdCBoYW5kbGVyID0gcm91dGUuaGFuZGxlcjtcbiAgY29uc3QgZG9jTmFtZVJlZ2V4ID0gLy4qclxcLnRhYmxlXFwoXCIoLis/KVwiXFwpLiovZ207XG5cbiAgcm91dGUuaGFuZGxlciA9IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gaGFuZGxlcihyZXF1ZXN0LCByZXBseSk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jYXRjaCkge1xuICAgICAgcmVzdWx0LmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHRoaW5reS5FcnJvcnMuRG9jdW1lbnROb3RGb3VuZCkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkb2NOYW1lUmVnZXguZXhlYyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICBjb25zdCBkb2NOYW1lID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzFdIHx8ICdEb2N1bWVudCc7XG4gICAgICAgICAgcmVwbHkoQm9vbS5ub3RGb3VuZChgJHtkb2NOYW1lfSBub3QgZm91bmRgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbHkoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b24kXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHJvdXRlO1xufSk7XG4iXX0=