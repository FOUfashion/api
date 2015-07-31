'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsPost = require('../models/post');

var _modelsPost2 = _interopRequireDefault(_modelsPost);

var PostCtrl = (function () {
  function PostCtrl() {
    _classCallCheck(this, PostCtrl);
  }

  _createClass(PostCtrl, [{
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      reply((yield _modelsPost2['default'].get(request.params.id).getJoin().run()));
    })
  }, {
    key: 'create',
    value: _bluebird.coroutine(function* (request, reply) {
      var post = yield new _modelsPost2['default']({
        accountId: request.auth.credentials.account.id,
        body: request.payload.body
      }).save();

      reply(post).code(201);
    })
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var post = yield _modelsPost2['default'].get(request.params.id).run();

      if (request.payload.body) {
        post.body = request.payload.body;
      }

      reply((yield post.save()));
    })
  }, {
    key: 'delete',
    value: _bluebird.coroutine(function* (request, reply) {
      var post = yield _modelsPost2['default'].get(request.params.id).run();
      yield post.deleteAll();
      reply().status(204);
    })
  }]);

  return PostCtrl;
})();

exports['default'] = PostCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wb3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzBCQUFpQixnQkFBZ0I7Ozs7SUFFM0IsUUFBUTtXQUFSLFFBQVE7MEJBQVIsUUFBUTs7O2VBQVIsUUFBUTs7K0JBRUgsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFdBQUssRUFBQyxNQUFNLHdCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBLENBQUMsQ0FBQztLQUMxRDs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLElBQUksR0FBRyxNQUFNLDRCQUFTO0FBQzFCLGlCQUFTLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDOUMsWUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSTtPQUMzQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsV0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN2Qjs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLElBQUksR0FBRyxNQUFNLHdCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVyRCxVQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7T0FDbEM7O0FBRUQsV0FBSyxFQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQztLQUMxQjs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLElBQUksR0FBRyxNQUFNLHdCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JELFlBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3ZCLFdBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjs7O1NBN0JHLFFBQVE7OztxQkFpQ0MsUUFBUSIsImZpbGUiOiJwb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvc3QgZnJvbSAnLi4vbW9kZWxzL3Bvc3QnO1xuXG5jbGFzcyBQb3N0Q3RybCB7XG5cbiAgYXN5bmMgZ2V0KHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgcmVwbHkoYXdhaXQgUG9zdC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLmdldEpvaW4oKS5ydW4oKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBwb3N0ID0gYXdhaXQgbmV3IFBvc3Qoe1xuICAgICAgYWNjb3VudElkOiByZXF1ZXN0LmF1dGguY3JlZGVudGlhbHMuYWNjb3VudC5pZCxcbiAgICAgIGJvZHk6IHJlcXVlc3QucGF5bG9hZC5ib2R5XG4gICAgfSkuc2F2ZSgpO1xuXG4gICAgcmVwbHkocG9zdCkuY29kZSgyMDEpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZ2V0KHJlcXVlc3QucGFyYW1zLmlkKS5ydW4oKTtcblxuICAgIGlmIChyZXF1ZXN0LnBheWxvYWQuYm9keSkge1xuICAgICAgcG9zdC5ib2R5ID0gcmVxdWVzdC5wYXlsb2FkLmJvZHk7XG4gICAgfVxuXG4gICAgcmVwbHkoYXdhaXQgcG9zdC5zYXZlKCkpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZ2V0KHJlcXVlc3QucGFyYW1zLmlkKS5ydW4oKTtcbiAgICBhd2FpdCBwb3N0LmRlbGV0ZUFsbCgpO1xuICAgIHJlcGx5KCkuc3RhdHVzKDIwNCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3N0Q3RybDtcbiJdfQ==