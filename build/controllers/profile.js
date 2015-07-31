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
      console.log('profil getauth', request.auth.credentials.account);
      reply((yield _modelsProfile2['default'].find(request.auth.credentials.account.profile.email)));
    })
  }, {
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      reply((yield _modelsProfile2['default'].find(request.params.id)));
    })
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var profile = yield _modelsProfile2['default'].find(request.params.id, false);

      if (request.params.first) {
        profile.name.first = request.params.first;
      }

      if (request.params.last) {
        profile.name.last = request.params.last;
      }

      yield profile.save();
      reply(profile);
    })
  }]);

  return ProfileCtrl;
})();

exports['default'] = ProfileCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU8sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLGFBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEUsV0FBSyxFQUFDLE1BQU0sMkJBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQzNFOzs7K0JBRVEsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFdBQUssRUFBQyxNQUFNLDJCQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUM5Qzs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFN0QsVUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtBQUN4QixlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUMzQzs7QUFFRCxVQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO09BQ3pDOztBQUVELFlBQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQjs7O1NBeEJHLFdBQVc7OztxQkE0QkYsV0FBVyIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vbW9kZWxzL3Byb2ZpbGUnO1xuXG5jbGFzcyBQcm9maWxlQ3RybCB7XG5cbiAgYXN5bmMgZ2V0QXV0aGVudGljYXRlZChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnNvbGUubG9nKCdwcm9maWwgZ2V0YXV0aCcsIHJlcXVlc3QuYXV0aC5jcmVkZW50aWFscy5hY2NvdW50KTtcbiAgICByZXBseShhd2FpdCBQcm9maWxlLmZpbmQocmVxdWVzdC5hdXRoLmNyZWRlbnRpYWxzLmFjY291bnQucHJvZmlsZS5lbWFpbCkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgcmVwbHkoYXdhaXQgUHJvZmlsZS5maW5kKHJlcXVlc3QucGFyYW1zLmlkKSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgUHJvZmlsZS5maW5kKHJlcXVlc3QucGFyYW1zLmlkLCBmYWxzZSk7XG5cbiAgICBpZiAocmVxdWVzdC5wYXJhbXMuZmlyc3QpIHtcbiAgICAgIHByb2ZpbGUubmFtZS5maXJzdCA9IHJlcXVlc3QucGFyYW1zLmZpcnN0O1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0LnBhcmFtcy5sYXN0KSB7XG4gICAgICBwcm9maWxlLm5hbWUubGFzdCA9IHJlcXVlc3QucGFyYW1zLmxhc3Q7XG4gICAgfVxuXG4gICAgYXdhaXQgcHJvZmlsZS5zYXZlKCk7XG4gICAgcmVwbHkocHJvZmlsZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlQ3RybDtcbiJdfQ==