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

var _helpersScopes = require('../helpers/scopes');

var _helpersScopes2 = _interopRequireDefault(_helpersScopes);

var _controllersHome = require('../controllers/home');

var _controllersHome2 = _interopRequireDefault(_controllersHome);

var _controllersAuth = require('../controllers/auth');

var _controllersAuth2 = _interopRequireDefault(_controllersAuth);

var _controllersAccount = require('../controllers/account');

var _controllersAccount2 = _interopRequireDefault(_controllersAccount);

var _controllersProfile = require('../controllers/profile');

var _controllersProfile2 = _interopRequireDefault(_controllersProfile);

var _controllersComment = require('../controllers/comment');

var _controllersComment2 = _interopRequireDefault(_controllersComment);

var _controllersPost = require('../controllers/post');

var _controllersPost2 = _interopRequireDefault(_controllersPost);

var home = new _controllersHome2['default']();
var auth = new _controllersAuth2['default']();
var account = new _controllersAccount2['default']();
var profile = new _controllersProfile2['default']();
var comment = new _controllersComment2['default']();
var post = new _controllersPost2['default']();

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
      scope: [_helpersScopes2['default'].FIRST_PARTY]
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
      scope: [_helpersScopes2['default'].FIRST_PARTY]
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
      scope: [_helpersScopes2['default'].FIRST_PARTY]
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
      scope: [_helpersScopes2['default'].FIRST_PARTY]
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
      scope: [_helpersScopes2['default'].FIRST_PARTY]
    },
    validate: {
      payload: {
        email: _joi2['default'].string().required().email().max(64).lowercase().trim(),
        username: _joi2['default'].string().required().alphanum().min(4).max(12).trim(),
        password: _joi2['default'].string().required().min(6).max(32).trim(),
        firstName: _joi2['default'].string().required().min(1).max(32).trim(),
        lastName: _joi2['default'].string().required().min(1).max(32).trim()
      }
    }
  }
}, {
  method: 'PUT',
  path: '/account/{id}',
  handler: account.update,
  config: {
    auth: {
      scope: [_helpersScopes2['default'].FIRST_PARTY]
    },
    validate: {
      payload: {
        password: _joi2['default'].string().min(6).max(32).trim()
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/account/{id}',
  handler: account['delete'],
  config: {
    auth: {
      scope: [_helpersScopes2['default'].FIRST_PARTY]
    }
  }
},

// Profile
{
  method: 'GET',
  path: '/profile',
  handler: profile.getAuthenticated
}, {
  method: 'GET',
  path: '/prof',
  handler: profile.getProf
},

// Batman told me to comment these out. Why? There's something weird going on. The handlers don't work.
// It's something I cannot understand. Something beyond my comprehension. I'd better call wonder woman...
//
// Keep reading if you don't get this ^
//
// }, {
//   method: 'GET',
//   path: '/profile/{id}',
//   handler: profile.get
// }, {
//   method: 'PUT',
//   path: '/profile/{id}',
//   handler: profile.update,
//   config: {
//     plugins: {
//       hapiAuthOwnership: {
//         ownershipRule: 'profile'
//       }
//     },
//     validate: {
//       payload: {
//         firstName: Joi.string().min(1).max(32).trim(),
//         lastName: Joi.string().min(1).max(32).trim()
//       }
//     }
//   }
// },

// Comment
{
  method: 'GET',
  path: '/comment/{id}',
  handler: comment.get
}, {
  method: 'POST',
  path: '/post/{id}/comment',
  handler: comment.create,
  config: {
    plugins: {
      hapiAuthOwnership: {
        ownershipRule: 'post'
      }
    },
    validate: {
      payload: {
        body: _joi2['default'].string().required().trim()
      }
    }
  }
}, {
  method: 'PUT',
  path: '/comment/{id}',
  handler: comment.update,
  config: {
    plugins: {
      hapiAuthOwnership: {
        ownershipRule: 'comment'
      }
    },
    validate: {
      payload: {
        body: _joi2['default'].string().trim()
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/comment/{id}',
  handler: comment['delete'],
  config: {
    plugins: {
      hapiAuthOwnership: {
        ownershipRule: 'comment'
      }
    }
  }
},

// Post
{
  method: 'GET',
  path: '/post/{id}',
  handler: post.get
}, {
  method: 'POST',
  path: '/post',
  handler: post.create,
  config: {
    validate: {
      payload: {
        body: _joi2['default'].string().required().trim()
      }
    }
  }
}, {
  method: 'PUT',
  path: '/post/{id}',
  handler: post.update,
  config: {
    plugins: {
      hapiAuthOwnership: {
        ownershipRule: 'post'
      }
    },
    validate: {
      payload: {
        body: _joi2['default'].string().trim()
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/post/{id}',
  handler: post['delete'],
  config: {
    plugins: {
      hapiAuthOwnership: {
        ownershipRule: 'post'
      }
    }
  }
}

// TODO: /feed
];

// Catch errors for async handlers
exports['default'] = routes.map(function (route) {
  var handler = route.handler;
  var docNameRegex = /.*r\.table\("(.+?)"\).*/gm;

  route.handler = function (request, reply) {
    var result = handler(request, reply);

    if (result && result['catch']) {
      result['catch'](function (error) {
        // $lab:coverage:off$
        if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O21CQUNQLEtBQUs7Ozs7NkJBRUYsbUJBQW1COzs7OzZCQUNuQixtQkFBbUI7Ozs7K0JBRWpCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2tDQUNsQix3QkFBd0I7Ozs7a0NBQ3hCLHdCQUF3Qjs7OztrQ0FDeEIsd0JBQXdCOzs7OytCQUMzQixxQkFBcUI7Ozs7QUFFMUMsSUFBTSxJQUFJLEdBQUcsa0NBQWMsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxrQ0FBYyxDQUFDO0FBQzVCLElBQU0sT0FBTyxHQUFHLHFDQUFpQixDQUFDO0FBQ2xDLElBQU0sT0FBTyxHQUFHLHFDQUFpQixDQUFDO0FBQ2xDLElBQU0sT0FBTyxHQUFHLHFDQUFpQixDQUFDO0FBQ2xDLElBQU0sSUFBSSxHQUFHLGtDQUFjLENBQUM7O0FBRTVCLElBQU0sTUFBTSxHQUFHOztBQUViO0FBQ0UsUUFBTSxFQUFFLEtBQUs7QUFDYixNQUFJLEVBQUUsR0FBRztBQUNULFNBQU8sRUFBRSxJQUFJLENBQUMsS0FBSztBQUNuQixRQUFNLEVBQUU7QUFDTixRQUFJLEVBQUU7QUFDSixVQUFJLEVBQUUsS0FBSztLQUNaO0dBQ0Y7Q0FDRjs7O0FBR0Q7QUFDRSxRQUFNLEVBQUUsTUFBTTtBQUNkLE1BQUksRUFBRSxRQUFRO0FBQ2QsU0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ25CLFFBQU0sRUFBRTtBQUNOLFFBQUksRUFBRTtBQUNKLFdBQUssRUFBRSxDQUFDLDJCQUFPLFdBQVcsQ0FBQztLQUM1QjtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sRUFBRTtBQUNQLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2pDLGdCQUFRLEVBQUUsaUJBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO09BQ2xDO0tBQ0Y7R0FDRjtD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TyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUM7QUFDcEQsZUFBSyxDQUFDLGtCQUFLLFFBQVEsQ0FBSSxPQUFPLGdCQUFhLENBQUMsQ0FBQztTQUM5QyxNQUFNO0FBQ0wsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Q7O09BRUYsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQyIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vbSBmcm9tICdib29tJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcblxuaW1wb3J0IHRoaW5reSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgc2NvcGVzIGZyb20gJy4uL2hlbHBlcnMvc2NvcGVzJztcblxuaW1wb3J0IEhvbWVDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2hvbWUnO1xuaW1wb3J0IEF1dGhDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2F1dGgnO1xuaW1wb3J0IEFjY291bnRDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FjY291bnQnO1xuaW1wb3J0IFByb2ZpbGVDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Byb2ZpbGUnO1xuaW1wb3J0IENvbW1lbnRDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL2NvbW1lbnQnO1xuaW1wb3J0IFBvc3RDdHJsIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Bvc3QnO1xuXG5jb25zdCBob21lID0gbmV3IEhvbWVDdHJsKCk7XG5jb25zdCBhdXRoID0gbmV3IEF1dGhDdHJsKCk7XG5jb25zdCBhY2NvdW50ID0gbmV3IEFjY291bnRDdHJsKCk7XG5jb25zdCBwcm9maWxlID0gbmV3IFByb2ZpbGVDdHJsKCk7XG5jb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnRDdHJsKCk7XG5jb25zdCBwb3N0ID0gbmV3IFBvc3RDdHJsKCk7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgLy8gSG9tZVxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnLycsXG4gICAgaGFuZGxlcjogaG9tZS5pbmRleCxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgbW9kZTogJ3RyeSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gQXV0aFxuICB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9sb2dpbicsXG4gICAgaGFuZGxlcjogYXV0aC5sb2dJbixcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgc2NvcGU6IFtzY29wZXMuRklSU1RfUEFSVFldXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvYXV0aG9yaXplJyxcbiAgICBoYW5kbGVyOiBhdXRoLmF1dGhvcml6ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgc2NvcGU6IFtzY29wZXMuRklSU1RfUEFSVFldXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNjb3BlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgY2xpZW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL29hdXRoL2V4Y2hhbmdlL2NvZGUnLFxuICAgIGhhbmRsZXI6IGF1dGguZXhjaGFuZ2VDb2RlLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBzY29wZTogW3Njb3Blcy5GSVJTVF9QQVJUWV1cbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY29kZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgICAgY2xpZW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICAgIGNsaWVudFNlY3JldDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvb2F1dGgvZXhjaGFuZ2UvY3JlZGVudGlhbHMnLFxuICAgIGhhbmRsZXI6IGF1dGguZXhjaGFuZ2VDcmVkZW50aWFscyxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgc2NvcGU6IFtzY29wZXMuRklSU1RfUEFSVFldXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBBY2NvdW50XG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudCcsXG4gICAgaGFuZGxlcjogYWNjb3VudC5nZXRBdXRoZW50aWNhdGVkXG4gIH0sIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYWNjb3VudC97aWR9JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmdldFxuICB9LCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogJy9hY2NvdW50JyxcbiAgICBoYW5kbGVyOiBhY2NvdW50LmNyZWF0ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgc2NvcGU6IFtzY29wZXMuRklSU1RfUEFSVFldXG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5lbWFpbCgpLm1heCg2NCkubG93ZXJjYXNlKCkudHJpbSgpLFxuICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5hbHBoYW51bSgpLm1pbig0KS5tYXgoMTIpLnRyaW0oKSxcbiAgICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkubWluKDYpLm1heCgzMikudHJpbSgpLFxuICAgICAgICAgIGZpcnN0TmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkubWluKDEpLm1heCgzMikudHJpbSgpLFxuICAgICAgICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5taW4oMSkubWF4KDMyKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgcGF0aDogJy9hY2NvdW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGFjY291bnQudXBkYXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBzY29wZTogW3Njb3Blcy5GSVJTVF9QQVJUWV1cbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5taW4oNikubWF4KDMyKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgcGF0aDogJy9hY2NvdW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGFjY291bnQuZGVsZXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgYXV0aDoge1xuICAgICAgICBzY29wZTogW3Njb3Blcy5GSVJTVF9QQVJUWV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gUHJvZmlsZVxuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL3Byb2ZpbGUnLFxuICAgIGhhbmRsZXI6IHByb2ZpbGUuZ2V0QXV0aGVudGljYXRlZFxuICB9LCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL3Byb2YnLFxuICAgIGhhbmRsZXI6IHByb2ZpbGUuZ2V0UHJvZlxuICB9LFxuXG4gIC8vIEJhdG1hbiB0b2xkIG1lIHRvIGNvbW1lbnQgdGhlc2Ugb3V0LiBXaHk/IFRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkIGdvaW5nIG9uLiBUaGUgaGFuZGxlcnMgZG9uJ3Qgd29yay5cbiAgLy8gSXQncyBzb21ldGhpbmcgSSBjYW5ub3QgdW5kZXJzdGFuZC4gU29tZXRoaW5nIGJleW9uZCBteSBjb21wcmVoZW5zaW9uLiBJJ2QgYmV0dGVyIGNhbGwgd29uZGVyIHdvbWFuLi4uXG4gIC8vXG4gIC8vIEtlZXAgcmVhZGluZyBpZiB5b3UgZG9uJ3QgZ2V0IHRoaXMgXlxuICAvL1xuICAvLyB9LCB7XG4gIC8vICAgbWV0aG9kOiAnR0VUJyxcbiAgLy8gICBwYXRoOiAnL3Byb2ZpbGUve2lkfScsXG4gIC8vICAgaGFuZGxlcjogcHJvZmlsZS5nZXRcbiAgLy8gfSwge1xuICAvLyAgIG1ldGhvZDogJ1BVVCcsXG4gIC8vICAgcGF0aDogJy9wcm9maWxlL3tpZH0nLFxuICAvLyAgIGhhbmRsZXI6IHByb2ZpbGUudXBkYXRlLFxuICAvLyAgIGNvbmZpZzoge1xuICAvLyAgICAgcGx1Z2luczoge1xuICAvLyAgICAgICBoYXBpQXV0aE93bmVyc2hpcDoge1xuICAvLyAgICAgICAgIG93bmVyc2hpcFJ1bGU6ICdwcm9maWxlJ1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9LFxuICAvLyAgICAgdmFsaWRhdGU6IHtcbiAgLy8gICAgICAgcGF5bG9hZDoge1xuICAvLyAgICAgICAgIGZpcnN0TmFtZTogSm9pLnN0cmluZygpLm1pbigxKS5tYXgoMzIpLnRyaW0oKSxcbiAgLy8gICAgICAgICBsYXN0TmFtZTogSm9pLnN0cmluZygpLm1pbigxKS5tYXgoMzIpLnRyaW0oKVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9LFxuXG4gIC8vIENvbW1lbnRcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy9jb21tZW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGNvbW1lbnQuZ2V0XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL3Bvc3Qve2lkfS9jb21tZW50JyxcbiAgICBoYW5kbGVyOiBjb21tZW50LmNyZWF0ZSxcbiAgICBjb25maWc6IHtcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgaGFwaUF1dGhPd25lcnNoaXA6IHtcbiAgICAgICAgICBvd25lcnNoaXBSdWxlOiAncG9zdCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBib2R5OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgcGF0aDogJy9jb21tZW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGNvbW1lbnQudXBkYXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICBoYXBpQXV0aE93bmVyc2hpcDoge1xuICAgICAgICAgIG93bmVyc2hpcFJ1bGU6ICdjb21tZW50J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGJvZHk6IEpvaS5zdHJpbmcoKS50cmltKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgcGF0aDogJy9jb21tZW50L3tpZH0nLFxuICAgIGhhbmRsZXI6IGNvbW1lbnQuZGVsZXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICBoYXBpQXV0aE93bmVyc2hpcDoge1xuICAgICAgICAgIG93bmVyc2hpcFJ1bGU6ICdjb21tZW50J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFBvc3RcbiAge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogJy9wb3N0L3tpZH0nLFxuICAgIGhhbmRsZXI6IHBvc3QuZ2V0XG4gIH0sIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBwYXRoOiAnL3Bvc3QnLFxuICAgIGhhbmRsZXI6IHBvc3QuY3JlYXRlLFxuICAgIGNvbmZpZzoge1xuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGJvZHk6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLnRyaW0oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBwYXRoOiAnL3Bvc3Qve2lkfScsXG4gICAgaGFuZGxlcjogcG9zdC51cGRhdGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIGhhcGlBdXRoT3duZXJzaGlwOiB7XG4gICAgICAgICAgb3duZXJzaGlwUnVsZTogJ3Bvc3QnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgYm9keTogSm9pLnN0cmluZygpLnRyaW0oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICBwYXRoOiAnL3Bvc3Qve2lkfScsXG4gICAgaGFuZGxlcjogcG9zdC5kZWxldGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIGhhcGlBdXRoT3duZXJzaGlwOiB7XG4gICAgICAgICAgb3duZXJzaGlwUnVsZTogJ3Bvc3QnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBUT0RPOiAvZmVlZFxuXTtcblxuLy8gQ2F0Y2ggZXJyb3JzIGZvciBhc3luYyBoYW5kbGVyc1xuZXhwb3J0IGRlZmF1bHQgcm91dGVzLm1hcChyb3V0ZSA9PiB7XG4gIGNvbnN0IGhhbmRsZXIgPSByb3V0ZS5oYW5kbGVyO1xuICBjb25zdCBkb2NOYW1lUmVnZXggPSAvLipyXFwudGFibGVcXChcIiguKz8pXCJcXCkuKi9nbTtcblxuICByb3V0ZS5oYW5kbGVyID0gZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNhdGNoKSB7XG4gICAgICByZXN1bHQuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgdGhpbmt5LkVycm9ycy5Eb2N1bWVudE5vdEZvdW5kIHx8IGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ0luZGV4IG91dCBvZiBib3VuZHM6IDAnKSkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkb2NOYW1lUmVnZXguZXhlYyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICBjb25zdCBkb2NOYW1lID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzFdIHx8ICdEb2N1bWVudCc7XG4gICAgICAgICAgcmVwbHkoQm9vbS5ub3RGb3VuZChgJHtkb2NOYW1lfSBub3QgZm91bmRgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbHkoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b24kXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHJvdXRlO1xufSk7XG4iXX0=