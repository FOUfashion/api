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

  lab.test('[get] returns the correct profile by email', function (done) {
    var options = {
      method: 'GET',
      url: '/profile/' + encodeURIComponent(_data2['default'].tp.account.profile.email),
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixLQUFLOzs7O3NCQUNGLGNBQWM7Ozs7b0JBQ2hCLFNBQVM7Ozs7QUFFMUIsSUFBTSxNQUFNLEdBQUcsaUJBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLEdBQUcsR0FBRyxpQkFBSSxNQUFNLEVBQUUsQ0FBQzs7O0FBRWhDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVc7O0FBRXZDLEtBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDakIsc0JBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztHQUM5QixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxVQUFTLElBQUksRUFBRTtBQUNwRSxRQUFNLE9BQU8sR0FBRztBQUNkLFlBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBRyxnQkFBYyxrQkFBa0IsQ0FBQyxrQkFBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQUFBRTtBQUNwRSxhQUFPLEVBQUU7QUFDUCx1QkFBZSxjQUFZLGtCQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFFO09BQ2pEO0tBQ0YsQ0FBQzs7QUFFRix3QkFBTyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVMsUUFBUSxFQUFFO0FBQ3hDLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7O0FBRS9CLFlBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxZQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTdELFVBQUksRUFBRSxDQUFDO0tBQ1IsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILEtBQUcsQ0FBQyxJQUFJLENBQUMseUNBQXlDLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDakUsUUFBTSxPQUFPLEdBQUc7QUFDZCxZQUFNLEVBQUUsS0FBSztBQUNiLFNBQUcsZ0JBQWMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLEFBQUU7QUFDdEQsYUFBTyxFQUFFO0FBQ1AsdUJBQWUsY0FBWSxrQkFBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBRTtPQUNqRDtLQUNGLENBQUM7O0FBRUYsd0JBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFTLFFBQVEsRUFBRTtBQUN4QyxZQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYWIgZnJvbSAnbGFiJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSAnLi4vLi4vc2VydmVyJztcbmltcG9ydCBkYXRhIGZyb20gJy4uL2RhdGEnO1xuXG5jb25zdCBleHBlY3QgPSBMYWIuYXNzZXJ0aW9ucy5leHBlY3Q7XG5leHBvcnQgY29uc3QgbGFiID0gTGFiLnNjcmlwdCgpO1xuXG5sYWIuZXhwZXJpbWVudCgnUHJvZmlsZUN0cmwnLCBmdW5jdGlvbigpIHtcblxuICBsYWIuYmVmb3JlKGRvbmUgPT4ge1xuICAgIGRhdGEuc3luYygpLnRoZW4oZG9uZSwgZG9uZSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZ2V0XSByZXR1cm5zIHRoZSBjb3JyZWN0IHByb2ZpbGUgYnkgZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGAvcHJvZmlsZS8ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLnRwLmFjY291bnQucHJvZmlsZS5lbWFpbCl9YCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdDtcblxuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDIwMCk7XG4gICAgICBleHBlY3QocmVzdWx0LmVtYWlsKS50by5lcXVhbChkYXRhLnRwLmFjY291bnQucHJvZmlsZS5lbWFpbCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1tnZXRdIHJldHVybnMgNDA0IGlmIG5vdCBmb3VuZCBieSBlbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogYC9wcm9maWxlLyR7ZW5jb2RlVVJJQ29tcG9uZW50KCdub3RAZm91bmQuY29tJyl9YCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7ZGF0YS5mcC50b2tlbi52YWx1ZX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlcnZlci5pbmplY3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCg0MDQpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iXX0=