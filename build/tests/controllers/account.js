'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lab = require('lab');

var _lab2 = _interopRequireDefault(_lab);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

var _modelsAccount = require('../../models/account');

var _modelsAccount2 = _interopRequireDefault(_modelsAccount);

var _dummy = require('../dummy');

var _dummy2 = _interopRequireDefault(_dummy);

var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

var expect = _lab2['default'].assertions.expect;
var lab = _lab2['default'].script();

exports.lab = lab;
lab.experiment('AccountCtrl', function () {

  lab.before(function (done) {
    _data2['default'].sync().then(done, done);
  });

  lab.test('[getAuthenticated] returns the current account', function (done) {
    var options = {
      method: 'GET',
      url: '/account',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.profile.email).to.equal(_data2['default'].fp.account.profile.email);
      expect(result.username).to.equal(_data2['default'].fp.account.username);
      expect(result.password).to.be.undefined();

      done();
    });
  });

  lab.test('[getAuthenticated] returns 401 without a token', function (done) {
    var options = {
      method: 'GET',
      url: '/account'
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[get] returns the correct account by id', function (done) {
    var options = {
      method: 'GET',
      url: '/account/' + _data2['default'].tp.account.id,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.id).to.equal(_data2['default'].tp.account.id);

      done();
    });
  });

  lab.test('[get] returns the correct account by username', function (done) {
    var options = {
      method: 'GET',
      url: '/account/' + _data2['default'].tp.account.username,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.equal(_data2['default'].tp.account.username);

      done();
    });
  });

  lab.test('[get] returns 404 if not found', function (done) {
    var options = {
      method: 'GET',
      url: '/account/000000',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[create] returns the account object', function (done) {
    var options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: _dummy2['default'].accountProfile()
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.username).to.equal(options.payload.username);
      expect(result.password).to.be.undefined();
      expect(result.id).to.exist();

      done();
    });
  });

  lab.test('[create] returns the profile too', function (done) {
    var options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: _dummy2['default'].accountProfile()
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.profile.email).to.equal(options.payload.email);
      expect(result.profile.id).to.exist();

      done();
    });
  });

  lab.test('[create] returns 401 for third parties', function (done) {
    var options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].tp.token.value
      },
      payload: _dummy2['default'].accountProfile()
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(403);
      done();
    });
  });

  lab.test('[update] returns 200 even if update is empty', function (done) {
    var options = {
      method: 'PUT',
      url: '/account/' + _data2['default'].tp.account.id,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('[update] returns the new password when updated by id', function (done) {
    _data2['default'].tp.account.unencryptedPassword = 'tp_myNewPass';

    var options = {
      method: 'PUT',
      url: '/account/' + _data2['default'].tp.account.id,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        password: _data2['default'].tp.account.unencryptedPassword
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.exist();

      _modelsAccount2['default'].get(result.username).run().then(function (account) {
        expect(account.password).not.to.equal(_data2['default'].tp.account.password);
        _data2['default'].tp.account.password = account.password;
        done();
      })['catch'](done);
    });
  });

  lab.test('[update] returns the new password when updated by username', function (done) {
    _data2['default'].tp.account.unencryptedPassword = 'tp_myNewPass';

    var options = {
      method: 'PUT',
      url: '/account/' + _data2['default'].tp.account.username,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      },
      payload: {
        password: _data2['default'].tp.account.unencryptedPassword
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.exist();

      _modelsAccount2['default'].get(result.username).run().then(function (account) {
        expect(account.password).not.to.equal(_data2['default'].tp.account.password);
        _data2['default'].tp.account.password = account.password;
        done();
      })['catch'](done);
    });
  });

  lab.test('[delete] returns 204 when deleted by id', function (done) {
    var options = {
      method: 'DELETE',
      url: '/account/' + _data2['default'].tempAccount1.id,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });

  lab.test('[delete] returns 204 when deleted by username', function (done) {
    var options = {
      method: 'DELETE',
      url: '/account/' + _data2['default'].tempAccount2.username,
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9jb250cm9sbGVycy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixLQUFLOzs7O3NCQUNGLGNBQWM7Ozs7NkJBRWIsc0JBQXNCOzs7O3FCQUV4QixVQUFVOzs7O29CQUNYLFNBQVM7Ozs7QUFFMUIsSUFBTSxNQUFNLEdBQUcsaUJBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLEdBQUcsR0FBRyxpQkFBSSxNQUFNLEVBQUUsQ0FBQzs7O0FBRWhDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVc7O0FBRXZDLEtBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDakIsc0JBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztHQUM5QixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsRUFBRSxVQUFTLElBQUksRUFBRTtBQUN4RSxRQUFNLE9BQU8sR0FBRztBQUNkLFlBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBRyxFQUFFLFVBQVU7QUFDZixhQUFPLEVBQUU7QUFDUCx1QkFBZSxjQUFZLGtCQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFFO09BQ2pEO0tBQ0YsQ0FBQzs7QUFFRix3QkFBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVMsUUFBUSxFQUFFO0FBQ3hDLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7O0FBRS9CLFlBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxZQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUss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QUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxVQUFTLElBQUksRUFBRTtBQUN2RSxRQUFNLE9BQU8sR0FBRztBQUNkLFlBQU0sRUFBRSxRQUFRO0FBQ2hCLFNBQUcsZ0JBQWMsa0JBQUssWUFBWSxDQUFDLFFBQVEsQUFBRTtBQUM3QyxhQUFPLEVBQUU7QUFDUCx1QkFBZSxjQUFZLGtCQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFFO09BQ2pEO0tBQ0YsQ0FBQzs7QUFFRix3QkFBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVMsUUFBUSxFQUFFO0FBQ3hDLFlBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExhYiBmcm9tICdsYWInO1xuaW1wb3J0IHNlcnZlciBmcm9tICcuLi8uLi9zZXJ2ZXInO1xuXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuLi8uLi9tb2RlbHMvYWNjb3VudCc7XG5cbmltcG9ydCBkdW1teSBmcm9tICcuLi9kdW1teSc7XG5pbXBvcnQgZGF0YSBmcm9tICcuLi9kYXRhJztcblxuY29uc3QgZXhwZWN0ID0gTGFiLmFzc2VydGlvbnMuZXhwZWN0O1xuZXhwb3J0IGNvbnN0IGxhYiA9IExhYi5zY3JpcHQoKTtcblxubGFiLmV4cGVyaW1lbnQoJ0FjY291bnRDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgbGFiLmJlZm9yZShkb25lID0+IHtcbiAgICBkYXRhLnN5bmMoKS50aGVuKGRvbmUsIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldEF1dGhlbnRpY2F0ZWRdIHJldHVybnMgdGhlIGN1cnJlbnQgYWNjb3VudCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9hY2NvdW50JyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcblxuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDIwMCk7XG4gICAgICBleHBlY3QocmVzdWx0LnByb2ZpbGUuZW1haWwpLnRvLmVxdWFsKGRhdGEuZnAuYWNjb3VudC5wcm9maWxlLmVtYWlsKTtcbiAgICAgIGV4cGVjdChyZXN1bHQudXNlcm5hbWUpLnRvLmVxdWFsKGRhdGEuZnAuYWNjb3VudC51c2VybmFtZSk7XG4gICAgICBleHBlY3QocmVzdWx0LnBhc3N3b3JkKS50by5iZS51bmRlZmluZWQoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldEF1dGhlbnRpY2F0ZWRdIHJldHVybnMgNDAxIHdpdGhvdXQgYSB0b2tlbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9hY2NvdW50J1xuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoNDAxKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tnZXRdIHJldHVybnMgdGhlIGNvcnJlY3QgYWNjb3VudCBieSBpZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9hY2NvdW50LycgKyBkYXRhLnRwLmFjY291bnQuaWQsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdC5pZCkudG8uZXF1YWwoZGF0YS50cC5hY2NvdW50LmlkKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldF0gcmV0dXJucyB0aGUgY29ycmVjdCBhY2NvdW50IGJ5IHVzZXJuYW1lJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnL2FjY291bnQvJyArIGRhdGEudHAuYWNjb3VudC51c2VybmFtZSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcblxuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDIwMCk7XG4gICAgICBleHBlY3QocmVzdWx0LnVzZXJuYW1lKS50by5lcXVhbChkYXRhLnRwLmFjY291bnQudXNlcm5hbWUpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZ2V0XSByZXR1cm5zIDQwNCBpZiBub3QgZm91bmQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvYWNjb3VudC8wMDAwMDAnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwNCk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbY3JlYXRlXSByZXR1cm5zIHRoZSBhY2NvdW50IG9iamVjdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvYWNjb3VudCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6IGR1bW15LmFjY291bnRQcm9maWxlKClcbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuXG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAxKTtcbiAgICAgIGV4cGVjdChyZXN1bHQudXNlcm5hbWUpLnRvLmVxdWFsKG9wdGlvbnMucGF5bG9hZC51c2VybmFtZSk7XG4gICAgICBleHBlY3QocmVzdWx0LnBhc3N3b3JkKS50by5iZS51bmRlZmluZWQoKTtcbiAgICAgIGV4cGVjdChyZXN1bHQuaWQpLnRvLmV4aXN0KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tjcmVhdGVdIHJldHVybnMgdGhlIHByb2ZpbGUgdG9vJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogJy9hY2NvdW50JyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDogZHVtbXkuYWNjb3VudFByb2ZpbGUoKVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDEpO1xuICAgICAgZXhwZWN0KHJlc3VsdC5wcm9maWxlLmVtYWlsKS50by5lcXVhbChvcHRpb25zLnBheWxvYWQuZW1haWwpO1xuICAgICAgZXhwZWN0KHJlc3VsdC5wcm9maWxlLmlkKS50by5leGlzdCgpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbY3JlYXRlXSByZXR1cm5zIDQwMSBmb3IgdGhpcmQgcGFydGllcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvYWNjb3VudCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEudHAudG9rZW4udmFsdWV9YFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6IGR1bW15LmFjY291bnRQcm9maWxlKClcbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwMyk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbdXBkYXRlXSByZXR1cm5zIDIwMCBldmVuIGlmIHVwZGF0ZSBpcyBlbXB0eScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogYC9hY2NvdW50LyR7ZGF0YS50cC5hY2NvdW50LmlkfWAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1t1cGRhdGVdIHJldHVybnMgdGhlIG5ldyBwYXNzd29yZCB3aGVuIHVwZGF0ZWQgYnkgaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgZGF0YS50cC5hY2NvdW50LnVuZW5jcnlwdGVkUGFzc3dvcmQgPSAndHBfbXlOZXdQYXNzJztcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgdXJsOiBgL2FjY291bnQvJHtkYXRhLnRwLmFjY291bnQuaWR9YCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwYXNzd29yZDogZGF0YS50cC5hY2NvdW50LnVuZW5jcnlwdGVkUGFzc3dvcmRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuXG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgICAgIGV4cGVjdChyZXN1bHQudXNlcm5hbWUpLnRvLmV4aXN0KCk7XG5cbiAgICAgIEFjY291bnQuZ2V0KHJlc3VsdC51c2VybmFtZSkucnVuKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oYWNjb3VudCkge1xuICAgICAgICAgIGV4cGVjdChhY2NvdW50LnBhc3N3b3JkKS5ub3QudG8uZXF1YWwoZGF0YS50cC5hY2NvdW50LnBhc3N3b3JkKTtcbiAgICAgICAgICBkYXRhLnRwLmFjY291bnQucGFzc3dvcmQgPSBhY2NvdW50LnBhc3N3b3JkO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW3VwZGF0ZV0gcmV0dXJucyB0aGUgbmV3IHBhc3N3b3JkIHdoZW4gdXBkYXRlZCBieSB1c2VybmFtZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBkYXRhLnRwLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZCA9ICd0cF9teU5ld1Bhc3MnO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICB1cmw6IGAvYWNjb3VudC8ke2RhdGEudHAuYWNjb3VudC51c2VybmFtZX1gLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHBhc3N3b3JkOiBkYXRhLnRwLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdC51c2VybmFtZSkudG8uZXhpc3QoKTtcblxuICAgICAgQWNjb3VudC5nZXQocmVzdWx0LnVzZXJuYW1lKS5ydW4oKVxuICAgICAgICAudGhlbihmdW5jdGlvbihhY2NvdW50KSB7XG4gICAgICAgICAgZXhwZWN0KGFjY291bnQucGFzc3dvcmQpLm5vdC50by5lcXVhbChkYXRhLnRwLmFjY291bnQucGFzc3dvcmQpO1xuICAgICAgICAgIGRhdGEudHAuYWNjb3VudC5wYXNzd29yZCA9IGFjY291bnQucGFzc3dvcmQ7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZGVsZXRlXSByZXR1cm5zIDIwNCB3aGVuIGRlbGV0ZWQgYnkgaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICB1cmw6IGAvYWNjb3VudC8ke2RhdGEudGVtcEFjY291bnQxLmlkfWAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjA0KTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tkZWxldGVdIHJldHVybnMgMjA0IHdoZW4gZGVsZXRlZCBieSB1c2VybmFtZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIHVybDogYC9hY2NvdW50LyR7ZGF0YS50ZW1wQWNjb3VudDIudXNlcm5hbWV9YCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDQpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iXX0=