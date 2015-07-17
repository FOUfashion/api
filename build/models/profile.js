'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Profile = _helpersThinky2['default'].createModel('Profile', {
  id: _helpersThinky.type.string()['default'](_helpersThinky.r.uuid()),
  accountId: _helpersThinky.type.string(),
  email: _helpersThinky.type.string().required().email().max(64).lowercase(),
  name: _helpersThinky.type.object().schema({
    first: _helpersThinky.type.string(),
    last: _helpersThinky.type.string(),
    full: _helpersThinky.type.virtual()['default'](function () {
      return this.name.first + ' ' + this.name.last;
    })
  })
}, {
  pk: 'email'
});

exports['default'] = Profile;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O0FBRWpELElBQU0sT0FBTyxHQUFHLDJCQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBRSxFQUFFLGVBSFUsSUFBSSxDQUdULE1BQU0sRUFBRSxXQUFRLENBQUMsZUFITixDQUFDLENBR08sSUFBSSxFQUFFLENBQUM7QUFDbkMsV0FBUyxFQUFFLGVBSkcsSUFBSSxDQUlGLE1BQU0sRUFBRTtBQUN4QixPQUFLLEVBQUUsZUFMTyxJQUFJLENBS04sTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUMzRCxNQUFJLEVBQUUsZUFOUSxJQUFJLENBTVAsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ3pCLFNBQUssRUFBRSxlQVBLLElBQUksQ0FPSixNQUFNLEVBQUU7QUFDcEIsUUFBSSxFQUFFLGVBUk0sSUFBSSxDQVFMLE1BQU0sRUFBRTtBQUNuQixRQUFJLEVBQUUsZUFUTSxJQUFJLENBU0wsT0FBTyxFQUFFLFdBQVEsQ0FBQyxZQUFXO0FBQ3RDLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQy9DLENBQUM7R0FDSCxDQUFDO0NBQ0gsRUFBRTtBQUNELElBQUUsRUFBRSxPQUFPO0NBQ1osQ0FBQyxDQUFDOztxQkFFWSxPQUFPIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBQcm9maWxlID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdQcm9maWxlJywge1xuICBpZDogdHlwZS5zdHJpbmcoKS5kZWZhdWx0KHIudXVpZCgpKSxcbiAgYWNjb3VudElkOiB0eXBlLnN0cmluZygpLFxuICBlbWFpbDogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLmVtYWlsKCkubWF4KDY0KS5sb3dlcmNhc2UoKSxcbiAgbmFtZTogdHlwZS5vYmplY3QoKS5zY2hlbWEoe1xuICAgIGZpcnN0OiB0eXBlLnN0cmluZygpLFxuICAgIGxhc3Q6IHR5cGUuc3RyaW5nKCksXG4gICAgZnVsbDogdHlwZS52aXJ0dWFsKCkuZGVmYXVsdChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUuZmlyc3QgKyAnICcgKyB0aGlzLm5hbWUubGFzdDtcbiAgICB9KVxuICB9KVxufSwge1xuICBwazogJ2VtYWlsJ1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XG4iXX0=