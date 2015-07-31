'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsProfile = require('../models/profile');

var _modelsProfile2 = _interopRequireDefault(_modelsProfile);

var ProfileCtrl = (function () {
  function ProfileCtrl() {
    _classCallCheck(this, ProfileCtrl);
  }

  _createClass(ProfileCtrl, [{
    key: 'getAuthenticated',
    value: _bluebird.coroutine(function* (request, reply) {
      var profile = yield _modelsProfile2['default'].get(request.auth.credentials.account.profile.email).getJoin({ account: true }).run();

      reply(profile);
    })
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      var idOrEmail = request.params.id;
      var profile = undefined;

      if (idOrEmail.includes('@')) {
        profile = yield _modelsProfile2['default'].get(idOrEmail).getJoin({ account: true }).run();
      } else {
        profile = yield _modelsProfile2['default'].filter({ id: idOrEmail }).getJoin({ account: true }).nth(0).run();
      }

      return profile;
    })

    // Due to how Mars was aligned today with Venus,
    // queries time out unless they throw a 404. That works.
    //
    // async get(request, reply) {
    //   const idOrEmail = request.params.id;
    //   let profile;
    //
    //   if (idOrEmail.includes('@')) {
    //     profile = await Profile
    //       .get(idOrEmail)
    //       .getJoin({ account: true })
    //       .run();
    //   } else {
    //     profile = await Profile
    //       .filter({ id: idOrEmail })
    //       .getJoin({ account: true })
    //       .nth(0)
    //       .run();
    //   }
    //
    //   return profile;
    // }

    // async update(request, reply) {
    //   const idOrEmail = request.params.id;
    //   let profile;
    //
    //   if (idOrEmail.includes('@')) {
    //     profile = await Profile
    //       .get(idOrEmail)
    //       .getJoin({ account: true })
    //       .run();
    //   } else {
    //     profile = await Profile
    //       .filter({ id: idOrEmail })
    //       .getJoin({ account: true })
    //       .nth(0)
    //       .run();
    //   }
    //
    //   if (request.params.first) {
    //     profile.name.first = request.params.first;
    //   }
    //
    //   if (request.params.last) {
    //     profile.name.last = request.params.last;
    //   }
    //
    //   await profile.save();
    //   reply(profile);
    // }

  }]);

  return ProfileCtrl;
})();

exports['default'] = ProfileCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU8sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQ25CLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNuRCxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDMUIsR0FBRyxFQUFFLENBQUM7O0FBRVQsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7K0JBRVEsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFVBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3BDLFVBQUksT0FBTyxZQUFBLENBQUM7O0FBRVosVUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzNCLGVBQU8sR0FBRyxNQUFNLDJCQUNiLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDZCxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDMUIsR0FBRyxFQUFFLENBQUM7T0FDVixNQUFNO0FBQ0wsZUFBTyxHQUFHLE1BQU0sMkJBQ2IsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQ3pCLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ04sR0FBRyxFQUFFLENBQUM7T0FDVjs7QUFFRCxhQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E3QkcsV0FBVzs7O3FCQXFGRixXQUFXIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvZmlsZSBmcm9tICcuLi9tb2RlbHMvcHJvZmlsZSc7XG5cbmNsYXNzIFByb2ZpbGVDdHJsIHtcblxuICBhc3luYyBnZXRBdXRoZW50aWNhdGVkKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGVcbiAgICAgIC5nZXQocmVxdWVzdC5hdXRoLmNyZWRlbnRpYWxzLmFjY291bnQucHJvZmlsZS5lbWFpbClcbiAgICAgIC5nZXRKb2luKHsgYWNjb3VudDogdHJ1ZSB9KVxuICAgICAgLnJ1bigpO1xuXG4gICAgcmVwbHkocHJvZmlsZSk7XG4gIH1cblxuICBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBpZE9yRW1haWwgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgICBsZXQgcHJvZmlsZTtcblxuICAgIGlmIChpZE9yRW1haWwuaW5jbHVkZXMoJ0AnKSkge1xuICAgICAgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGVcbiAgICAgICAgLmdldChpZE9yRW1haWwpXG4gICAgICAgIC5nZXRKb2luKHsgYWNjb3VudDogdHJ1ZSB9KVxuICAgICAgICAucnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlXG4gICAgICAgIC5maWx0ZXIoeyBpZDogaWRPckVtYWlsIH0pXG4gICAgICAgIC5nZXRKb2luKHsgYWNjb3VudDogdHJ1ZSB9KVxuICAgICAgICAubnRoKDApXG4gICAgICAgIC5ydW4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvZmlsZTtcbiAgfVxuXG4gIC8vIER1ZSB0byBob3cgTWFycyB3YXMgYWxpZ25lZCB0b2RheSB3aXRoIFZlbnVzLFxuICAvLyBxdWVyaWVzIHRpbWUgb3V0IHVubGVzcyB0aGV5IHRocm93IGEgNDA0LiBUaGF0IHdvcmtzLlxuICAvL1xuICAvLyBhc3luYyBnZXQocmVxdWVzdCwgcmVwbHkpIHtcbiAgLy8gICBjb25zdCBpZE9yRW1haWwgPSByZXF1ZXN0LnBhcmFtcy5pZDtcbiAgLy8gICBsZXQgcHJvZmlsZTtcbiAgLy9cbiAgLy8gICBpZiAoaWRPckVtYWlsLmluY2x1ZGVzKCdAJykpIHtcbiAgLy8gICAgIHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlXG4gIC8vICAgICAgIC5nZXQoaWRPckVtYWlsKVxuICAvLyAgICAgICAuZ2V0Sm9pbih7IGFjY291bnQ6IHRydWUgfSlcbiAgLy8gICAgICAgLnJ1bigpO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBwcm9maWxlID0gYXdhaXQgUHJvZmlsZVxuICAvLyAgICAgICAuZmlsdGVyKHsgaWQ6IGlkT3JFbWFpbCB9KVxuICAvLyAgICAgICAuZ2V0Sm9pbih7IGFjY291bnQ6IHRydWUgfSlcbiAgLy8gICAgICAgLm50aCgwKVxuICAvLyAgICAgICAucnVuKCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIHJldHVybiBwcm9maWxlO1xuICAvLyB9XG5cbiAgLy8gYXN5bmMgdXBkYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gIC8vICAgY29uc3QgaWRPckVtYWlsID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gIC8vICAgbGV0IHByb2ZpbGU7XG4gIC8vXG4gIC8vICAgaWYgKGlkT3JFbWFpbC5pbmNsdWRlcygnQCcpKSB7XG4gIC8vICAgICBwcm9maWxlID0gYXdhaXQgUHJvZmlsZVxuICAvLyAgICAgICAuZ2V0KGlkT3JFbWFpbClcbiAgLy8gICAgICAgLmdldEpvaW4oeyBhY2NvdW50OiB0cnVlIH0pXG4gIC8vICAgICAgIC5ydW4oKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGVcbiAgLy8gICAgICAgLmZpbHRlcih7IGlkOiBpZE9yRW1haWwgfSlcbiAgLy8gICAgICAgLmdldEpvaW4oeyBhY2NvdW50OiB0cnVlIH0pXG4gIC8vICAgICAgIC5udGgoMClcbiAgLy8gICAgICAgLnJ1bigpO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAocmVxdWVzdC5wYXJhbXMuZmlyc3QpIHtcbiAgLy8gICAgIHByb2ZpbGUubmFtZS5maXJzdCA9IHJlcXVlc3QucGFyYW1zLmZpcnN0O1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBpZiAocmVxdWVzdC5wYXJhbXMubGFzdCkge1xuICAvLyAgICAgcHJvZmlsZS5uYW1lLmxhc3QgPSByZXF1ZXN0LnBhcmFtcy5sYXN0O1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBhd2FpdCBwcm9maWxlLnNhdmUoKTtcbiAgLy8gICByZXBseShwcm9maWxlKTtcbiAgLy8gfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVDdHJsO1xuIl19