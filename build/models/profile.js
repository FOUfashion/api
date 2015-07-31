'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Profile = _helpersThinky2['default'].createModel('Profile', {
  id: _helpersThinky.type.string()['default'](_helpersThinky.r.uuid()),
  accountId: _helpersThinky.type.string().required(),
  email: _helpersThinky.type.string().required().email().max(64).lowercase(),
  name: _helpersThinky.type.object().schema({
    first: _helpersThinky.type.string().required(),
    last: _helpersThinky.type.string().required(),
    full: _helpersThinky.type.virtual()['default'](function () {
      return this.name.first + ' ' + this.name.last;
    })
  }),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'email'
});

// Query by id or email
Profile.defineStatic('find', _bluebird.coroutine(function* (idOrEmail) {
  var join = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  if (!idOrEmail.includes('@')) {
    var _query = Profile.filter({ id: idOrEmail });

    if (join) {
      _query = _query.getJoin();
    }

    var profiles = yield _query.run();

    if (profiles.length > 0) {
      return profiles[0];
    }
  }

  // Must be a username
  var query = Profile.get(idOrEmail);

  if (join) {
    query = query.getJoin();
  }

  return yield query.run();
}));

exports['default'] = Profile;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUE4QixtQkFBbUI7Ozs7QUFFakQsSUFBTSxPQUFPLEdBQUcsMkJBQU8sV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUM1QyxJQUFFLEVBQUUsZUFIVSxJQUFJLENBR1QsTUFBTSxFQUFFLFdBQVEsQ0FBQyxlQUhOLENBQUMsQ0FHTyxJQUFJLEVBQUUsQ0FBQztBQUNuQyxXQUFTLEVBQUUsZUFKRyxJQUFJLENBSUYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ25DLE9BQUssRUFBRSxlQUxPLElBQUksQ0FLTixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQzNELE1BQUksRUFBRSxlQU5RLElBQUksQ0FNUCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDekIsU0FBSyxFQUFFLGVBUEssSUFBSSxDQU9KLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUMvQixRQUFJLEVBQUUsZUFSTSxJQUFJLENBUUwsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQzlCLFFBQUksRUFBRSxlQVRNLElBQUksQ0FTTCxPQUFPLEVBQUUsV0FBUSxDQUFDLFlBQVc7QUFDdEMsYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDL0MsQ0FBQztHQUNILENBQUM7QUFDRixXQUFTLEVBQUUsZUFiRyxJQUFJLENBYUYsSUFBSSxFQUFFLFdBQVEsQ0FBQyxlQWJYLENBQUMsQ0FhWSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxFQUFFO0FBQ0QsSUFBRSxFQUFFLE9BQU87Q0FDWixDQUFDLENBQUM7OztBQUdILE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxzQkFBRSxXQUFlLFNBQVMsRUFBZTtNQUFiLElBQUkseURBQUcsSUFBSTs7QUFDaEUsTUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDNUIsUUFBSSxNQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOztBQUU5QyxRQUFJLElBQUksRUFBRTtBQUNSLFlBQUssR0FBRyxNQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekI7O0FBRUQsUUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRW5DLFFBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdkIsYUFBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDcEI7R0FDRjs7O0FBR0QsTUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbkMsTUFBSSxJQUFJLEVBQUU7QUFDUixTQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3pCOztBQUVELFNBQU8sTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDMUIsRUFBQyxDQUFDOztxQkFFWSxPQUFPIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBQcm9maWxlID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdQcm9maWxlJywge1xuICBpZDogdHlwZS5zdHJpbmcoKS5kZWZhdWx0KHIudXVpZCgpKSxcbiAgYWNjb3VudElkOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGVtYWlsOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCkuZW1haWwoKS5tYXgoNjQpLmxvd2VyY2FzZSgpLFxuICBuYW1lOiB0eXBlLm9iamVjdCgpLnNjaGVtYSh7XG4gICAgZmlyc3Q6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICBsYXN0OiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgZnVsbDogdHlwZS52aXJ0dWFsKCkuZGVmYXVsdChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUuZmlyc3QgKyAnICcgKyB0aGlzLm5hbWUubGFzdDtcbiAgICB9KVxuICB9KSxcbiAgY3JlYXRlZEF0OiB0eXBlLmRhdGUoKS5kZWZhdWx0KHIubm93KCkpXG59LCB7XG4gIHBrOiAnZW1haWwnXG59KTtcblxuLy8gUXVlcnkgYnkgaWQgb3IgZW1haWxcblByb2ZpbGUuZGVmaW5lU3RhdGljKCdmaW5kJywgYXN5bmMgZnVuY3Rpb24oaWRPckVtYWlsLCBqb2luID0gdHJ1ZSkge1xuICBpZiAoIWlkT3JFbWFpbC5pbmNsdWRlcygnQCcpKSB7XG4gICAgbGV0IHF1ZXJ5ID0gUHJvZmlsZS5maWx0ZXIoeyBpZDogaWRPckVtYWlsIH0pO1xuXG4gICAgaWYgKGpvaW4pIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuZ2V0Sm9pbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgcXVlcnkucnVuKCk7XG5cbiAgICBpZiAocHJvZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHByb2ZpbGVzWzBdO1xuICAgIH1cbiAgfVxuXG4gIC8vIE11c3QgYmUgYSB1c2VybmFtZVxuICBsZXQgcXVlcnkgPSBQcm9maWxlLmdldChpZE9yRW1haWwpO1xuXG4gIGlmIChqb2luKSB7XG4gICAgcXVlcnkgPSBxdWVyeS5nZXRKb2luKCk7XG4gIH1cblxuICByZXR1cm4gYXdhaXQgcXVlcnkucnVuKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZTtcbiJdfQ==