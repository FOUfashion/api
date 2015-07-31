'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsComment = require('../models/comment');

var _modelsComment2 = _interopRequireDefault(_modelsComment);

var CommentCtrl = (function () {
  function CommentCtrl() {
    _classCallCheck(this, CommentCtrl);
  }

  _createClass(CommentCtrl, [{
    key: 'get',
    value: _bluebird.coroutine(function* (request, reply) {
      reply((yield _modelsComment2['default'].get(request.params.id).getJoin().run()));
    })
  }, {
    key: 'create',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield new _modelsComment2['default']({
        body: request.payload.body,
        postId: request.payload.postId
      }).save();

      reply(comment).code(201);
    })
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield _modelsComment2['default'].get(request.params.id).run();

      if (request.payload.body) {
        post.body = request.payload.body;
      }

      reply((yield comment.save()));
    })
  }, {
    key: 'delete',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield _modelsComment2['default'].get(request.params.id).run();
      yield comment.deleteAll();
      reply().status(204);
    })
  }]);

  return CommentCtrl;
})();

exports['default'] = CommentCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jb21tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU4sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFdBQUssRUFBQyxNQUFNLDJCQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBLENBQUMsQ0FBQztLQUM3RDs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLE9BQU8sR0FBRyxNQUFNLCtCQUFZO0FBQ2hDLFlBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDMUIsY0FBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTTtPQUMvQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVYsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUUzRCxVQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7T0FDbEM7O0FBRUQsV0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQztLQUM3Qjs7OytCQUVXLFdBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMzQixVQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzNELFlBQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzFCLFdBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjs7O1NBN0JHLFdBQVc7OztxQkFpQ0YsV0FBVyIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vbW9kZWxzL2NvbW1lbnQnO1xuXG5jbGFzcyBDb21tZW50Q3RybCB7XG5cbiAgYXN5bmMgZ2V0KHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgcmVwbHkoYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLmdldEpvaW4oKS5ydW4oKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgbmV3IENvbW1lbnQoe1xuICAgICAgYm9keTogcmVxdWVzdC5wYXlsb2FkLmJvZHksXG4gICAgICBwb3N0SWQ6IHJlcXVlc3QucGF5bG9hZC5wb3N0SWRcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXBseShjb21tZW50KS5jb2RlKDIwMSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLnJ1bigpO1xuXG4gICAgaWYgKHJlcXVlc3QucGF5bG9hZC5ib2R5KSB7XG4gICAgICBwb3N0LmJvZHkgPSByZXF1ZXN0LnBheWxvYWQuYm9keTtcbiAgICB9XG5cbiAgICByZXBseShhd2FpdCBjb21tZW50LnNhdmUoKSk7XG4gIH1cblxuICBhc3luYyBkZWxldGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLnJ1bigpO1xuICAgIGF3YWl0IGNvbW1lbnQuZGVsZXRlQWxsKCk7XG4gICAgcmVwbHkoKS5zdGF0dXMoMjA0KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRDdHJsO1xuIl19