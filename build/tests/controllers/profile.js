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
      url: '/profile?email=' + encodeURIComponent(_data2['default'].profile.email),
      headers: {
        'Authorization': 'Bearer ' + _data2['default'].fp.token.value
      }
    };

    _server2['default'].inject(options, function (response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.email).to.equal(_data2['default'].profile.email);

      done();
    });
  });

  lab.test('[get] returns 404 if not found by email', function (done) {
    var options = {
      method: 'GET',
      url: '/profile?email=' + encodeURIComponent('not@found.com'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixLQUFLOzs7O3NCQUNGLGNBQWM7Ozs7b0JBQ2hCLFNBQVM7Ozs7QUFFMUIsSUFBTSxNQUFNLEdBQUcsaUJBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLEdBQUcsR0FBRyxpQkFBSSxNQUFNLEVBQUUsQ0FBQzs7UUFBbkIsR0FBRyxHQUFILEdBQUc7QUFFaEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsWUFBVzs7QUFFdkMsS0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNqQixzQkFBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQzlCLENBQUMsQ0FBQzs7QUFFSCxLQUFHLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLFVBQVMsSUFBSSxFQUFFO0FBQ3BFLFFBQU0sT0FBTyxHQUFHO0FBQ2QsWUFBTSxFQUFFLEtBQUs7QUFDYixTQUFHLHNCQUFvQixrQkFBa0IsQ0FBQyxrQkFBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEFBQUU7QUFDL0QsYUFBTyxFQUFFO0FBQ1AsdUJBQWUsY0FBWSxrQkFBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBRTtPQUNqRDtLQUNGLENBQUM7O0FBRUYsd0JBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFTLFFBQVEsRUFBRTtBQUN4QyxVQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDOztBQUUvQixZQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsWUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFbEQsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFTLElBQUksRUFBRTtBQUNqRSxRQUFNLE9BQU8sR0FBRztBQUNkLFlBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBRyxzQkFBb0Isa0JBQWtCLENBQUMsZUFBZSxDQUFDLEFBQUU7QUFDNUQsYUFBTyxFQUFFO0FBQ1AsdUJBQWUsY0FBWSxrQkFBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBRTtPQUNqRDtLQUNGLENBQUM7O0FBRUYsd0JBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFTLFFBQVEsRUFBRTtBQUN4QyxZQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsVUFBSSxFQUFFLENBQUM7S0FDUixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYWIgZnJvbSAnbGFiJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSAnLi4vLi4vc2VydmVyJztcbmltcG9ydCBkYXRhIGZyb20gJy4uL2RhdGEnO1xuXG5jb25zdCBleHBlY3QgPSBMYWIuYXNzZXJ0aW9ucy5leHBlY3Q7XG5leHBvcnQgY29uc3QgbGFiID0gTGFiLnNjcmlwdCgpO1xuXG5sYWIuZXhwZXJpbWVudCgnUHJvZmlsZUN0cmwnLCBmdW5jdGlvbigpIHtcblxuICBsYWIuYmVmb3JlKGRvbmUgPT4ge1xuICAgIGRhdGEuc3luYygpLnRoZW4oZG9uZSwgZG9uZSk7XG4gIH0pO1xuXG4gIGxhYi50ZXN0KCdbZ2V0XSByZXR1cm5zIHRoZSBjb3JyZWN0IHByb2ZpbGUgYnkgZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGAvcHJvZmlsZT9lbWFpbD0ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLnByb2ZpbGUuZW1haWwpfWAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2RhdGEuZnAudG9rZW4udmFsdWV9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXJ2ZXIuaW5qZWN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5yZXN1bHQ7XG5cbiAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXNDb2RlKS50by5lcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdC5lbWFpbCkudG8uZXF1YWwoZGF0YS5wcm9maWxlLmVtYWlsKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dldF0gcmV0dXJucyA0MDQgaWYgbm90IGZvdW5kIGJ5IGVtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBgL3Byb2ZpbGU/ZW1haWw9JHtlbmNvZGVVUklDb21wb25lbnQoJ25vdEBmb3VuZC5jb20nKX1gLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtkYXRhLmZwLnRva2VuLnZhbHVlfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VydmVyLmluamVjdChvcHRpb25zLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpLnRvLmVxdWFsKDQwNCk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG59KTtcbiJdfQ==