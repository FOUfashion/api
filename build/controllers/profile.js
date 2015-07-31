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

      reply(profile);
    })
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var idOrEmail = request.params.id;
      var profile = undefined;

      if (idOrEmail.includes('@')) {
        profile = yield _modelsProfile2['default'].get(idOrEmail).getJoin({ account: true }).run();
      } else {
        profile = yield _modelsProfile2['default'].filter({ id: idOrEmail }).getJoin({ account: true }).nth(0).run();
      }

      if (request.payload.firstName) {
        profile.name.first = request.payload.firstName;
      }

      if (request.payload.lastName) {
        profile.name.last = request.payload.lastName;
      }

      reply(profile);
    })
  }]);

  return ProfileCtrl;
})();

exports['default'] = ProfileCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU8sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQ25CLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNuRCxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDMUIsR0FBRyxFQUFFLENBQUM7O0FBRVQsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7K0JBRVEsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFVBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ3BDLFVBQUksT0FBTyxZQUFBLENBQUM7O0FBRVosVUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzNCLGVBQU8sR0FBRyxNQUFNLDJCQUNiLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDZCxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDMUIsR0FBRyxFQUFFLENBQUM7T0FDVixNQUFNO0FBQ0wsZUFBTyxHQUFHLE1BQU0sMkJBQ2IsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQ3pCLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ04sR0FBRyxFQUFFLENBQUM7T0FDVjs7QUFFRCxXQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDcEMsVUFBSSxPQUFPLFlBQUEsQ0FBQzs7QUFFWixVQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDM0IsZUFBTyxHQUFHLE1BQU0sMkJBQ2IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUNkLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUMxQixHQUFHLEVBQUUsQ0FBQztPQUNWLE1BQU07QUFDTCxlQUFPLEdBQUcsTUFBTSwyQkFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FDekIsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQzFCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDTixHQUFHLEVBQUUsQ0FBQztPQUNWOztBQUVELFVBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDN0IsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7T0FDaEQ7O0FBRUQsVUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUM1QixlQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztPQUM5Qzs7QUFFRCxXQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7OztTQXpERyxXQUFXOzs7cUJBNkRGLFdBQVciLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9maWxlIGZyb20gJy4uL21vZGVscy9wcm9maWxlJztcblxuY2xhc3MgUHJvZmlsZUN0cmwge1xuXG4gIGFzeW5jIGdldEF1dGhlbnRpY2F0ZWQocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgUHJvZmlsZVxuICAgICAgLmdldChyZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudC5wcm9maWxlLmVtYWlsKVxuICAgICAgLmdldEpvaW4oeyBhY2NvdW50OiB0cnVlIH0pXG4gICAgICAucnVuKCk7XG5cbiAgICByZXBseShwcm9maWxlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGlkT3JFbWFpbCA9IHJlcXVlc3QucGFyYW1zLmlkO1xuICAgIGxldCBwcm9maWxlO1xuXG4gICAgaWYgKGlkT3JFbWFpbC5pbmNsdWRlcygnQCcpKSB7XG4gICAgICBwcm9maWxlID0gYXdhaXQgUHJvZmlsZVxuICAgICAgICAuZ2V0KGlkT3JFbWFpbClcbiAgICAgICAgLmdldEpvaW4oeyBhY2NvdW50OiB0cnVlIH0pXG4gICAgICAgIC5ydW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGVcbiAgICAgICAgLmZpbHRlcih7IGlkOiBpZE9yRW1haWwgfSlcbiAgICAgICAgLmdldEpvaW4oeyBhY2NvdW50OiB0cnVlIH0pXG4gICAgICAgIC5udGgoMClcbiAgICAgICAgLnJ1bigpO1xuICAgIH1cblxuICAgIHJlcGx5KHByb2ZpbGUpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgaWRPckVtYWlsID0gcmVxdWVzdC5wYXJhbXMuaWQ7XG4gICAgbGV0IHByb2ZpbGU7XG5cbiAgICBpZiAoaWRPckVtYWlsLmluY2x1ZGVzKCdAJykpIHtcbiAgICAgIHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlXG4gICAgICAgIC5nZXQoaWRPckVtYWlsKVxuICAgICAgICAuZ2V0Sm9pbih7IGFjY291bnQ6IHRydWUgfSlcbiAgICAgICAgLnJ1bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9maWxlID0gYXdhaXQgUHJvZmlsZVxuICAgICAgICAuZmlsdGVyKHsgaWQ6IGlkT3JFbWFpbCB9KVxuICAgICAgICAuZ2V0Sm9pbih7IGFjY291bnQ6IHRydWUgfSlcbiAgICAgICAgLm50aCgwKVxuICAgICAgICAucnVuKCk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QucGF5bG9hZC5maXJzdE5hbWUpIHtcbiAgICAgIHByb2ZpbGUubmFtZS5maXJzdCA9IHJlcXVlc3QucGF5bG9hZC5maXJzdE5hbWU7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QucGF5bG9hZC5sYXN0TmFtZSkge1xuICAgICAgcHJvZmlsZS5uYW1lLmxhc3QgPSByZXF1ZXN0LnBheWxvYWQubGFzdE5hbWU7XG4gICAgfVxuXG4gICAgcmVwbHkocHJvZmlsZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlQ3RybDtcbiJdfQ==