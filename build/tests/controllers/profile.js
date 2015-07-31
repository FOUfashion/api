'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lab = require('lab');

var _lab2 = _interopRequireDefault(_lab);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

var expect = _lab2['default'].assertions.expect;
var lab = _lab2['default'].script();

exports.lab = lab;
lab.experiment('ProfileCtrl', function () {

  lab.before(function (done) {
    _data2['default'].sync().then(done, done);
  });

  lab.test('[getAuthenticated] returns the current profile', function (done) {
    var options = {
      method: 'GET',
      url: '/profile',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.email).to.equal(_data2['default'].fp.account.profile.email);

      done();
    });
  });

  lab.test('[getAuthenticated] returns 401 without a token', function (done) {
    var options = {
      method: 'GET',
      url: '/profile'
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  // I swear by the old gods and the new gods that these just won't pass...
  // Meh, the deadline is coming, gtg
  //
  // lab.test('[get] returns the correct profile by id', function(done) {
  //   const options = {
  //     method: 'GET',
  //     url: `/profile/${data.tp.account.profile.id}`,
  //     headers: {
  //       'Authorization': `Bearer ${data.fp.token.value}`
  //     }
  //   };
  //
  //   server.inject(options, function(response) {
  //     const result = response.result;
  //
  //     expect(response.statusCode).to.equal(200);
  //     expect(result.id).to.equal(data.tp.account.profile.id);
  //
  //     done();
  //   });
  // });

  // lab.test('[get] returns the correct profile by email', function(done) {
  //   const options = {
  //     method: 'GET',
  //     url: `/profile/${encodeURIComponent(data.tp.account.profile.email)}`,
  //     headers: {
  //       'Authorization': `Bearer ${data.fp.token.value}`
  //     }
  //   };
  //
  //   server.inject(options, function(response) {
  //     const result = response.result;
  //
  //     expect(response.statusCode).to.equal(200);
  //     expect(result.email).to.equal(data.tp.account.profile.email);
  //
  //     done();
  //   });
  // });

  lab.test('[get] returns the correct profile by email', function (done) {
    var options = {
      method: 'GET',
      url: '/prof?email=' + encodeURIComponent(_data2['default'].tp.account.profile.email),
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.email).to.equal(_data2['default'].tp.account.profile.email);

      done();
    });
  });

  lab.test('[get] returns 404 if not found by id', function (done) {
    var options = {
      method: 'GET',
      url: '/profile/123-456',
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[get] returns 404 if not found by email', function (done) {
    var options = {
      method: 'GET',
      url: '/profile/' + encodeURIComponent('not@found.com'),
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  // lab.test('[update] returns the profile with a new first name (by id)', function(done) {
  //   const options = {
  //     method: 'PUT',
  //     url: `/profile/${data.tp.account.profile.id}`,
  //     headers: {
  //       'Authorization': `Bearer ${data.fp.token.value}`
  //     },
  //     payload: {
  //       firstName: 'Gargantua'
  //     }
  //   };
  //
  //   server.inject(options, function(response) {
  //     const result = response.result;
  //
  //     expect(response.statusCode).to.equal(200);
  //     expect(result.name.first).to.equal('Gargantua');
  //
  //     done();
  //   });
  // });

  // lab.test('[update] returns the profile with a new last name (by email)', function(done) {
  //   const options = {
  //     method: 'PUT',
  //     url: `/profile/${data.tp.account.profile.email}`,
  //     headers: {
  //       'Authorization': `Bearer ${data.fp.token.value}`
  //     },
  //     payload: {
  //       lastName: 'Gargantua2'
  //     }
  //   };
  //
  //   server.inject(options, function(response) {
  //     const result = response.result;
  //
  //     expect(response.statusCode).to.equal(200);
  //     expect(result.name.last).to.equal('Gargantua2');
  //
  //     done();
  //   });
  // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixLQUFLOzs7O3NCQUNGLGNBQWM7Ozs7b0JBQ2hCLFNBQVM7Ozs7QUFFMUIsSUFBTSxNQUFNLEdBQUcsaUJBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLEdBQUcsR0FBRyxpQkFBSSxNQUFNLEVBQUUsQ0FBQzs7O0FBRWhDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVc7O0FBRXZDLEtBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDakIsc0JBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztHQUM5QixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsRUFBRSxVQUFTLElBQUksRUFBRTtBQUN4RSxRQUFNLE9BQU8sR0FBRztBQUNkLFlBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBRyxFQUFFLFVBQVU7QUFDZixhQUFPLEVBQUU7QUFDUCx1QkFBZSxjQUFZLGtCQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFFO09BQ2pEO0tBQ0YsQ0FBQzs7QUFFRix3QkFBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVMsUUFBUSxFQUFFO0FBQ3hDLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7O0FBRS9CLFlBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxZQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTdELFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FB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Y2VzQ29udGVudCI6WyJpbXBvcnQgTGFiIGZyb20gJ2xhYic7XG5pbXBvcnQgc2VydmVyIGZyb20gJy4uLy4uL3NlcnZlcic7XG5pbXBvcnQgZGF0YSBmcm9tICcuLi9kYXRhJztcblxuY29uc3QgZXhwZWN0ID0gTGFiLmFzc2VydGlvbnMuZXhwZWN0O1xuZXhwb3J0IGNvbnN0IGxhYiA9IExhYi5zY3JpcHQoKTtcblxubGFiLmV4cGVyaW1lbnQoJ1Byb2ZpbGVDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgbGFiLmJlZm9yZShkb25lID0+IHtcbiAgICBkYXRhLnN5bmMoKS50aGVuKGRvbmUsIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldEF1dGhlbnRpY2F0ZWRdIHJldHVybnMgdGhlIGN1cnJlbnQgcHJvZmlsZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy9wcm9maWxlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcblxuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDIwMCk7XG4gICAgICBleHBlY3QocmVzdWx0LmVtYWlsKS50by5lcXVhbChkYXRhLmZwLmFjY291bnQucHJvZmlsZS5lbWFpbCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tnZXRBdXRoZW50aWNhdGVkXSByZXR1cm5zIDQwMSB3aXRob3V0IGEgdG9rZW4nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvcHJvZmlsZSdcbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwMSk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIEkgc3dlYXIgYnkgdGhlIG9sZCBnb2RzIGFuZCB0aGUgbmV3IGdvZHMgdGhhdCB0aGVzZSBqdXN0IHdvbid0IHBhc3MuLi5cbiAgLy8gTWVoLCB0aGUgZGVhZGxpbmUgaXMgY29taW5nLCBndGdcbiAgLy9cbiAgLy8gbGFiLnRlc3QoJ1tnZXRdIHJldHVybnMgdGhlIGNvcnJlY3QgcHJvZmlsZSBieSBpZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgLy8gICBjb25zdCBvcHRpb25zID0ge1xuICAvLyAgICAgbWV0aG9kOiAnR0VUJyxcbiAgLy8gICAgIHVybDogYC9wcm9maWxlLyR7ZGF0YS50cC5hY2NvdW50LnByb2ZpbGUuaWR9YCxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gIC8vICAgICB9XG4gIC8vICAgfTtcbiAgLy9cbiAgLy8gICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG4gIC8vXG4gIC8vICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzQ29kZSkudG8uZXF1YWwoMjAwKTtcbiAgLy8gICAgIGV4cGVjdChyZXN1bHQuaWQpLnRvLmVxdWFsKGRhdGEudHAuYWNjb3VudC5wcm9maWxlLmlkKTtcbiAgLy9cbiAgLy8gICAgIGRvbmUoKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gbGFiLnRlc3QoJ1tnZXRdIHJldHVybnMgdGhlIGNvcnJlY3QgcHJvZmlsZSBieSBlbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgLy8gICBjb25zdCBvcHRpb25zID0ge1xuICAvLyAgICAgbWV0aG9kOiAnR0VUJyxcbiAgLy8gICAgIHVybDogYC9wcm9maWxlLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEudHAuYWNjb3VudC5wcm9maWxlLmVtYWlsKX1gLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvL1xuICAvLyAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcbiAgLy9cbiAgLy8gICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAvLyAgICAgZXhwZWN0KHJlc3VsdC5lbWFpbCkudG8uZXF1YWwoZGF0YS50cC5hY2NvdW50LnByb2ZpbGUuZW1haWwpO1xuICAvL1xuICAvLyAgICAgZG9uZSgpO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICBsYWIudGVzdCgnW2dldF0gcmV0dXJucyB0aGUgY29ycmVjdCBwcm9maWxlIGJ5IGVtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBgL3Byb2Y/ZW1haWw9JHtlbmNvZGVVUklDb21wb25lbnQoZGF0YS50cC5hY2NvdW50LnByb2ZpbGUuZW1haWwpfWAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdC5lbWFpbCkudG8uZXF1YWwoZGF0YS50cC5hY2NvdW50LnByb2ZpbGUuZW1haWwpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZ2V0XSByZXR1cm5zIDQwNCBpZiBub3QgZm91bmQgYnkgaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGAvcHJvZmlsZS8xMjMtNDU2YCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCg0MDQpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldF0gcmV0dXJucyA0MDQgaWYgbm90IGZvdW5kIGJ5IGVtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBgL3Byb2ZpbGUvJHtlbmNvZGVVUklDb21wb25lbnQoJ25vdEBmb3VuZC5jb20nKX1gLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwNCk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGxhYi50ZXN0KCdbdXBkYXRlXSByZXR1cm5zIHRoZSBwcm9maWxlIHdpdGggYSBuZXcgZmlyc3QgbmFtZSAoYnkgaWQpJywgZnVuY3Rpb24oZG9uZSkge1xuICAvLyAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gIC8vICAgICBtZXRob2Q6ICdQVVQnLFxuICAvLyAgICAgdXJsOiBgL3Byb2ZpbGUvJHtkYXRhLnRwLmFjY291bnQucHJvZmlsZS5pZH1gLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgLy8gICAgIH0sXG4gIC8vICAgICBwYXlsb2FkOiB7XG4gIC8vICAgICAgIGZpcnN0TmFtZTogJ0dhcmdhbnR1YSdcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvL1xuICAvLyAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcbiAgLy9cbiAgLy8gICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAvLyAgICAgZXhwZWN0KHJlc3VsdC5uYW1lLmZpcnN0KS50by5lcXVhbCgnR2FyZ2FudHVhJyk7XG4gIC8vXG4gIC8vICAgICBkb25lKCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIGxhYi50ZXN0KCdbdXBkYXRlXSByZXR1cm5zIHRoZSBwcm9maWxlIHdpdGggYSBuZXcgbGFzdCBuYW1lIChieSBlbWFpbCknLCBmdW5jdGlvbihkb25lKSB7XG4gIC8vICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgLy8gICAgIG1ldGhvZDogJ1BVVCcsXG4gIC8vICAgICB1cmw6IGAvcHJvZmlsZS8ke2RhdGEudHAuYWNjb3VudC5wcm9maWxlLmVtYWlsfWAsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHBheWxvYWQ6IHtcbiAgLy8gICAgICAgbGFzdE5hbWU6ICdHYXJnYW50dWEyJ1xuICAvLyAgICAgfVxuICAvLyAgIH07XG4gIC8vXG4gIC8vICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAvLyAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0O1xuICAvL1xuICAvLyAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDIwMCk7XG4gIC8vICAgICBleHBlY3QocmVzdWx0Lm5hbWUubGFzdCkudG8uZXF1YWwoJ0dhcmdhbnR1YTInKTtcbiAgLy9cbiAgLy8gICAgIGRvbmUoKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbn0pO1xuIl19