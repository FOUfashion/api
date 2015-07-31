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
      var comment = yield _modelsComment2['default'].get(request.params.id).getJoin().run();
      reply(comment);
    })
  }, {
    key: 'create',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield new _modelsComment2['default']({
        body: request.payload.body,
        postId: request.params.id,
        accountId: request.auth.credentials.account.id
      }).save();

      reply(comment).code(201);
    })
  }, {
    key: 'update',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield _modelsComment2['default'].get(request.params.id).run();

      if (request.payload.body) {
        comment.body = request.payload.body;
      }

      reply((yield comment.save()));
    })
  }, {
    key: 'delete',
    value: _bluebird.coroutine(function* (request, reply) {
      var comment = yield _modelsComment2['default'].get(request.params.id).run();
      yield comment.deleteAll();
      reply().code(204);
    })
  }]);

  return CommentCtrl;
})();

exports['default'] = CommentCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jb21tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7O2VBQVgsV0FBVzs7K0JBRU4sV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFVBQU0sT0FBTyxHQUFHLE1BQU0sMkJBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckUsV0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCOzs7K0JBRVcsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQzNCLFVBQU0sT0FBTyxHQUFHLE1BQU0sK0JBQVk7QUFDaEMsWUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSTtBQUMxQixjQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3pCLGlCQUFTLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7T0FDL0MsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVWLFdBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxPQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFM0QsVUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUN4QixlQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO09BQ3JDOztBQUVELFdBQUssRUFBQyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUM7S0FDN0I7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxPQUFPLEdBQUcsTUFBTSwyQkFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzRCxZQUFNLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUMxQixXQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7OztTQS9CRyxXQUFXOzs7cUJBbUNGLFdBQVciLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tZW50IGZyb20gJy4uL21vZGVscy9jb21tZW50JztcblxuY2xhc3MgQ29tbWVudEN0cmwge1xuXG4gIGFzeW5jIGdldChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IGNvbW1lbnQgPSBhd2FpdCBDb21tZW50LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIHJlcGx5KGNvbW1lbnQpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgY29tbWVudCA9IGF3YWl0IG5ldyBDb21tZW50KHtcbiAgICAgIGJvZHk6IHJlcXVlc3QucGF5bG9hZC5ib2R5LFxuICAgICAgcG9zdElkOiByZXF1ZXN0LnBhcmFtcy5pZCxcbiAgICAgIGFjY291bnRJZDogcmVxdWVzdC5hdXRoLmNyZWRlbnRpYWxzLmFjY291bnQuaWRcbiAgICB9KS5zYXZlKCk7XG5cbiAgICByZXBseShjb21tZW50KS5jb2RlKDIwMSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLnJ1bigpO1xuXG4gICAgaWYgKHJlcXVlc3QucGF5bG9hZC5ib2R5KSB7XG4gICAgICBjb21tZW50LmJvZHkgPSByZXF1ZXN0LnBheWxvYWQuYm9keTtcbiAgICB9XG5cbiAgICByZXBseShhd2FpdCBjb21tZW50LnNhdmUoKSk7XG4gIH1cblxuICBhc3luYyBkZWxldGUocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5nZXQocmVxdWVzdC5wYXJhbXMuaWQpLnJ1bigpO1xuICAgIGF3YWl0IGNvbW1lbnQuZGVsZXRlQWxsKCk7XG4gICAgcmVwbHkoKS5jb2RlKDIwNCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50Q3RybDtcbiJdfQ==