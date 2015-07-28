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
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      var profile = yield _modelsProfile2['default'].get(request.query.email).run();
      reply(profile);
    })
  }]);

  return ProfileCtrl;
})();

exports['default'] = ProfileCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU4sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0QsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7U0FMRyxXQUFXOzs7cUJBU0YsV0FBVyIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vbW9kZWxzL3Byb2ZpbGUnO1xuXG5jbGFzcyBQcm9maWxlQ3RybCB7XG5cbiAgYXN5bmMgZ2V0KHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGUuZ2V0KHJlcXVlc3QucXVlcnkuZW1haWwpLnJ1bigpO1xuICAgIHJlcGx5KHByb2ZpbGUpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZUN0cmw7XG4iXX0=