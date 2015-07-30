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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OytCQUNqQixxQkFBcUI7Ozs7K0JBRXJCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7a0NBQ3hCLHdCQUF3Qjs7OztBQUVoRCxJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sSUFBSSxHQUFHLGtDQUFjLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7QUFDbEMsSUFBTSxPQUFPLEdBQUcscUNBQWlCLENBQUM7O0FBRWxDLElBQU0sTUFBTSxHQUFHOztBQUViO0FBQ0UsUUFBTSxFQUFFLEtBQUs7QUFDYixNQUFJLEVBQUUsR0FBRztBQUNULFNBQU8sRUFBRSxJQUFJLENBQUMsS0FBSztBQUNuQixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixVQUFJLEVBQUUsS0FBSztLQUNaO0dBQ0Y7Q0FDRjs7O0FBR0Q7QUFDRSxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxRQUFRO0FBQ2QsU0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ25CLFFBQU0sRUFBRTtBQUNOLFFBQUksRUFBRTtBQUNKLFlBQU0sRUFBRSw2QkFBUyxXQUFXO0tBQzdCO0FBQ0QsWUFBUSxFQUFFO0FBQ1IsYUFBTyxFQUFFO0FBQ1AsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDakMsZ0JBQVEsRUFBRSxpQkFBSSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7T0FDbEM7S0FDRjtHQUNGO0NBQ0YsRUFBRTtBQUNELFFBQU0sRUFBRSxNQUFNO0FBQ2QsTUFBSSxFQUFFLGtCQUFrQjtBQUN4QixTQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7QUFDdkIsUUFBTSxFQUFFO0FBQ04sUUFBSSxF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QUFRLEVBQUU7QUFDUixXQUFLLEVBQUU7QUFDTCxhQUFLLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtPQUNsRTtLQUNGO0dBQ0Y7Q0FDRixDQUNGLENBQUM7OztxQkFHYSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ2pDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDOUIsTUFBTSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7O0FBRWpELE9BQUssQ0FBQyxPQUFPLEdBQUcsVUFBUyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLFFBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRXZDLFFBQUksTUFBTSxJQUFJLE1BQU0sU0FBTSxFQUFFO0FBQzFCLFlBQU0sU0FBTSxDQUFDLFVBQUEsS0FBSyxFQUFJOztBQUVwQixZQUFJLEtBQUssWUFBWSwyQkFBTyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7QUFDbkQsY0FBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsY0FBTSxPQUFPLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUM7QUFDcEQsZUFBSyxDQUFDLGtCQUFLLFFBQVEsQ0FBSSxPQUFPLGdCQUFhLENBQUMsQ0FBQztTQUM5QyxNQUFNO0FBQ0wsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Q7O0FBQUEsT0FFRixDQUFDLENBQUM7S0FDSjtHQUNGLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7Q0FDZCxDQUFDIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb29tIGZyb20gJ2Jvb20nO1xuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuXG5pbXBvcnQgdGhpbmt5IGZyb20gJy4uL2hlbHBlcnMvdGhpbmt5JztcbmltcG9ydCBlbnRpdGllcyBmcm9tICcuLi9oZWxwZXJzL2VudGl0aWVzJztcblxuaW1wb3J0IEhvbWVDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2hvbWUnO1xuaW1wb3J0IEF1dGhDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2F1dGgnO1xuaW1wb3J0IEFjY291bnRDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FjY291bnQnO1xuaW1wb3J0IFByb2ZpbGVDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Byb2ZpbGUnO1xuXG5jb25zdCBob21lID0gbmV3IEhvbWVDdHJsKCk7XG5jb25zdCBhdXRoID0gbmV3IEF1dGhDdHJsKCk7XG5jb25zdCBhY2NvdW50ID0gbmV3IEFjY291bnRDdHJsKCk7XG5jb25zdCBwcm9maWxlID0gbmV3IFByb2ZpbGVDdHJsKCk7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgLy8gSG9tZVxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnLycsXG4gICAgaGFuZGxlcjogaG9tZS5pbmRleCxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgbW9kZTogJ3RyeSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gQXV0aFxuICB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9sb2dpbicsXG4gICAgaGFuZGxlcjogYXV0aC5sb2dJbixcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL29hdXRoL2F1dGhvcml6ZScsXG4gICAgaGFuZGxlcjogYXV0aC5hdXRob3JpemUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2NvcGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICBjbGllbnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvZXhjaGFuZ2UvY29kZScsXG4gICAgaGFuZGxlcjogYXV0aC5leGNoYW5nZUNvZGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY29kZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgY2xpZW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIGNsaWVudFNlY3JldDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvZXhjaGFuZ2UvY3JlZGVudGlhbHMnLFxuICAgIGhhbmRsZXI6IGF1dGguZXhjaGFuZ2VDcmVkZW50aWFscyxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgZW50aXR5OiBlbnRpdGllcy5GSVJTVF9QQVJUWVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gQWNjb3VudFxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL2FjY291bnQnLFxuICAgIGhhbmRsZXI6IGFjY291bnQuZ2V0QXV0aGVudGljYXRlZFxuICB9LCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL2FjY291bnQve2lkfScsXG4gICAgaGFuZGxlcjogYWNjb3VudC5nZXRcbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvYWNjb3VudCcsXG4gICAgaGFuZGxlcjogYWNjb3VudC5jcmVhdGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIGVudGl0eTogZW50aXRpZXMuRklSU1RfUEFSVFlcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLmVtYWlsKCkubWF4KDY0KS5sb3dlcmNhc2UoKS50cmltKCksXG4gICAgICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLmFscGhhbnVtKCkubWluKDQpLm1heCgxMikudHJpbSgpLFxuICAgICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5taW4oNikubWF4KDMyKS50cmltKCksXG4gICAgICAgICAgZmlyc3ROYW1lOiBKb2kuc3RyaW5nKCkubWluKDEpLm1heCgzMikudHJpbSgpLFxuICAgICAgICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkubWluKDEpLm1heCgzMikudHJpbSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gUHJvZmlsZVxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL3Byb2ZpbGUnLFxuICAgIGhhbmRsZXI6IHByb2ZpbGUuZ2V0LFxuICAgIGNvbmZpZzoge1xuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkuZW1haWwoKS5tYXgoNjQpLmxvd2VyY2FzZSgpLnRyaW0oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5dO1xuXG4vLyBDYXRjaCBlcnJvcnMgZm9yIGFzeW5jIGhhbmRsZXJzXG5leHBvcnQgZGVmYXVsdCByb3V0ZXMubWFwKHJvdXRlID0+IHtcbiAgY29uc3QgaGFuZGxlciA9IHJvdXRlLmhhbmRsZXI7XG4gIGNvbnN0IGRvY05hbWVSZWdleCA9IC8uKnJcXC50YWJsZVxcKFwiKC4rPylcIlxcKS4qL2dtO1xuXG4gIHJvdXRlLmhhbmRsZXIgPSBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY2F0Y2gpIHtcbiAgICAgIHJlc3VsdC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB0aGlua3kuRXJyb3JzLkRvY3VtZW50Tm90Rm91bmQpIHtcbiAgICAgICAgICBjb25zdCBtYXRjaGVzID0gZG9jTmFtZVJlZ2V4LmV4ZWMoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgY29uc3QgZG9jTmFtZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSB8fCAnRG9jdW1lbnQnO1xuICAgICAgICAgIHJlcGx5KEJvb20ubm90Rm91bmQoYCR7ZG9jTmFtZX0gbm90IGZvdW5kYCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGx5KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9uJFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiByb3V0ZTtcbn0pO1xuIl19