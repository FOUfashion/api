'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lab = require('lab');

var _lab2 = _interopRequireDefault(_lab);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

var expect = _lab2['default'].assertions.expect;
var lab = _lab2['default'].script();

exports.lab = lab;
lab.experiment('AuthCtrl', function () {

  var oauthScope = 'test';
  var oauthCode = null;

  lab.before(function (done) {
    _data2['default'].sync().then(done, done);
  });

  lab.test('[logIn] returns the account on success', function (done) {
    var options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        username: _data2['default'].tp.account.username,
        password: _data2['default'].tp.account.unencryptedPassword
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.equal(_data2['default'].tp.account.username);

      done();
    });
  });

  lab.test('[logIn] returns 404 for invalid username', function (done) {
    var options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        username: '133744',
        password: _data2['default'].tp.account.unencryptedPassword
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[logIn] returns 401 for invalid password', function (done) {
    var options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        username: _data2['default'].tp.account.username,
        password: '133744'
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[authorize] returns an oauth code for exchange', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/authorize',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        scope: oauthScope,
        clientId: _data2['default'].tp.client.id
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;
      oauthCode = result.value;

      expect(response.statusCode).to.equal(200);
      expect(result.clientId).to.equal(_data2['default'].tp.client.id);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the secret is invalid', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        code: oauthCode,
        clientId: _data2['default'].tp.client.id,
        clientSecret: 'ItsNotASecretIfYouToldEverybody'
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('[exchangeCode] returns a bearer token if the code is valid', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        code: oauthCode,
        clientId: _data2['default'].tp.client.id,
        clientSecret: _data2['default'].tp.client.secret
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.scope).to.equal(oauthScope);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the code is invalid', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        code: '10240',
        clientId: _data2['default'].tp.client.id,
        clientSecret: _data2['default'].tp.client.secret
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the code has already been used', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        code: oauthCode,
        clientId: _data2['default'].tp.client.id,
        clientSecret: _data2['default'].tp.client.secret
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('[exchangeCredentials] returns a bearer token for valid credentials', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/credentials',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        username: _data2['default'].tp.account.username,
        password: _data2['default'].tp.account.unencryptedPassword
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCredentials] returns 401 for invalid password', function (done) {
    var options = {
      method: 'POST',
      url: '/oauth/exchange/credentials',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        username: _data2['default'].tp.account.username,
        password: '1337'
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9jb250cm9sbGVycy9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixLQUFLOzs7O3NCQUNGLGNBQWM7Ozs7cUJBRWYsT0FBTzs7OztvQkFDUixTQUFTOzs7O0FBRTFCLElBQU0sTUFBTSxHQUFHLGlCQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDOUIsSUFBTSxHQUFHLEdBQUcsaUJBQUksTUFBTSxFQUFFLENBQUM7OztBQUVoQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFXOztBQUVwQyxNQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDeEIsTUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUVyQixLQUFHLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2pCLHNCQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDOUIsQ0FBQyxDQUFDOztBQUVILEtBQUcsQ0FBQyxJQUFJLENBQUMsd0NBQXdDLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDaEUsUUFBTSxPQUFPLEdBQUc7QUFDZCxZQUFNLEVBQUUsTUFBTTtBQUNkLFNBQUcsRUFBRSxRQUFRO0FBQ2IsYUFBTyxFQUFFO0FBQ1AsdUJBQWUsY0FBWSxrQkFBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBRTtPQUNqRDtBQUNELGFBQU8sRUFBRTtBQUNQLGdCQUFRLEVBQUUsa0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRO0FBQ2xDLGdCQUFRLEVBQUUsa0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUI7T0FDOUM7S0FDRixDQUFDOztBQUVGLHdCQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBUyxRQUFRLEVBQUU7QUFDeEMsVUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQzs7QUFFL0IsWUFBTSxDQUFDLFFBQVEsQ0FBQyxV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LENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsWUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRWhDLFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILEtBQUcsQ0FBQyxJQUFJLENBQUMsd0RBQXdELEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDaEYsUUFBTSxPQUFPLEdBQUc7QUFDZCxZQUFNLEVBQUUsTUFBTTtBQUNkLFNBQUcsRUFBRSw2QkFBNkI7QUFDbEMsYUFBTyxFQUFFO0FBQ1AsdUJBQWUsY0FBWSxrQkFBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBRTtPQUNqRDtBQUNELGFBQU8sRUFBRTtBQUNQLGdCQUFRLEVBQUUsa0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRO0FBQ2xDLGdCQUFRLEVBQUUsTUFBTTtPQUNqQjtLQUNGLENBQUM7O0FBRUYsd0JBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFTLFFBQVEsRUFBRTtBQUN4QyxZQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYWIgZnJvbSAnbGFiJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSAnLi4vLi4vc2VydmVyJztcblxuaW1wb3J0IGZha2VyIGZyb20gJ2Zha2VyJztcbmltcG9ydCBkYXRhIGZyb20gJy4uL2RhdGEnO1xuXG5jb25zdCBleHBlY3QgPSBMYWIuYXNzZXJ0aW9ucy5leHBlY3Q7XG5leHBvcnQgY29uc3QgbGFiID0gTGFiLnNjcmlwdCgpO1xuXG5sYWIuZXhwZXJpbWVudCgnQXV0aEN0cmwnLCBmdW5jdGlvbigpIHtcblxuICBsZXQgb2F1dGhTY29wZSA9ICd0ZXN0JztcbiAgbGV0IG9hdXRoQ29kZSA9IG51bGw7XG5cbiAgbGFiLmJlZm9yZShkb25lID0+IHtcbiAgICBkYXRhLnN5bmMoKS50aGVuKGRvbmUsIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2xvZ0luXSByZXR1cm5zIHRoZSBhY2NvdW50IG9uIHN1Y2Nlc3MnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICB1c2VybmFtZTogZGF0YS50cC5hY2NvdW50LnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogZGF0YS50cC5hY2NvdW50LnVuZW5jcnlwdGVkUGFzc3dvcmRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuXG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgICAgIGV4cGVjdChyZXN1bHQudXNlcm5hbWUpLnRvLmVxdWFsKGRhdGEudHAuYWNjb3VudC51c2VybmFtZSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tsb2dJbl0gcmV0dXJucyA0MDQgZm9yIGludmFsaWQgdXNlcm5hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICB1c2VybmFtZTogJzEzMzc0NCcsXG4gICAgICAgIHBhc3N3b3JkOiBkYXRhLnRwLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoNDA0KTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tsb2dJbl0gcmV0dXJucyA0MDEgZm9yIGludmFsaWQgcGFzc3dvcmQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICB1c2VybmFtZTogZGF0YS50cC5hY2NvdW50LnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogJzEzMzc0NCdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwMSk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbYXV0aG9yaXplXSByZXR1cm5zIGFuIG9hdXRoIGNvZGUgZm9yIGV4Y2hhbmdlJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9vYXV0aC9hdXRob3JpemUnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHNjb3BlOiBvYXV0aFNjb3BlLFxuICAgICAgICBjbGllbnRJZDogZGF0YS50cC5jbGllbnQuaWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuICAgICAgb2F1dGhDb2RlID0gcmVzdWx0LnZhbHVlO1xuXG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgICAgIGV4cGVjdChyZXN1bHQuY2xpZW50SWQpLnRvLmVxdWFsKGRhdGEudHAuY2xpZW50LmlkKTtcbiAgICAgIGV4cGVjdChyZXN1bHQudmFsdWUpLnRvLmV4aXN0KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tleGNoYW5nZUNvZGVdIHJldHVybnMgYW4gZXJyb3IgaWYgdGhlIHNlY3JldCBpcyBpbnZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9vYXV0aC9leGNoYW5nZS9jb2RlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjb2RlOiBvYXV0aENvZGUsXG4gICAgICAgIGNsaWVudElkOiBkYXRhLnRwLmNsaWVudC5pZCxcbiAgICAgICAgY2xpZW50U2VjcmV0OiAnSXRzTm90QVNlY3JldElmWW91VG9sZEV2ZXJ5Ym9keSdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwMCk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZXhjaGFuZ2VDb2RlXSByZXR1cm5zIGEgYmVhcmVyIHRva2VuIGlmIHRoZSBjb2RlIGlzIHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9vYXV0aC9leGNoYW5nZS9jb2RlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjb2RlOiBvYXV0aENvZGUsXG4gICAgICAgIGNsaWVudElkOiBkYXRhLnRwLmNsaWVudC5pZCxcbiAgICAgICAgY2xpZW50U2VjcmV0OiBkYXRhLnRwLmNsaWVudC5zZWNyZXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuXG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgICAgIGV4cGVjdChyZXN1bHQuc2NvcGUpLnRvLmVxdWFsKG9hdXRoU2NvcGUpO1xuICAgICAgZXhwZWN0KHJlc3VsdC52YWx1ZSkudG8uZXhpc3QoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2V4Y2hhbmdlQ29kZV0gcmV0dXJucyBhbiBlcnJvciBpZiB0aGUgY29kZSBpcyBpbnZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9vYXV0aC9leGNoYW5nZS9jb2RlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjb2RlOiAnMTAyNDAnLFxuICAgICAgICBjbGllbnRJZDogZGF0YS50cC5jbGllbnQuaWQsXG4gICAgICAgIGNsaWVudFNlY3JldDogZGF0YS50cC5jbGllbnQuc2VjcmV0XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCg0MDQpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2V4Y2hhbmdlQ29kZV0gcmV0dXJucyBhbiBlcnJvciBpZiB0aGUgY29kZSBoYXMgYWxyZWFkeSBiZWVuIHVzZWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAnL29hdXRoL2V4Y2hhbmdlL2NvZGUnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGNvZGU6IG9hdXRoQ29kZSxcbiAgICAgICAgY2xpZW50SWQ6IGRhdGEudHAuY2xpZW50LmlkLFxuICAgICAgICBjbGllbnRTZWNyZXQ6IGRhdGEudHAuY2xpZW50LnNlY3JldFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoNDAwKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tleGNoYW5nZUNyZWRlbnRpYWxzXSByZXR1cm5zIGEgYmVhcmVyIHRva2VuIGZvciB2YWxpZCBjcmVkZW50aWFscycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvb2F1dGgvZXhjaGFuZ2UvY3JlZGVudGlhbHMnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHVzZXJuYW1lOiBkYXRhLnRwLmFjY291bnQudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBkYXRhLnRwLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdC52YWx1ZSkudG8uZXhpc3QoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2V4Y2hhbmdlQ3JlZGVudGlhbHNdIHJldHVybnMgNDAxIGZvciBpbnZhbGlkIHBhc3N3b3JkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9vYXV0aC9leGNoYW5nZS9jcmVkZW50aWFscycsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgdXNlcm5hbWU6IGRhdGEudHAuYWNjb3VudC51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6ICcxMzM3J1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoNDAxKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuIl19