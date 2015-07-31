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
      var post = yield _modelsPost2['default'].get(request.params.id).getJoin().run();
      reply(post);
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
      reply().code(204);
    })
  }]);

  return PostCtrl;
})();

exports['default'] = PostCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wb3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzBCQUFpQixnQkFBZ0I7Ozs7SUFFM0IsUUFBUTtXQUFSLFFBQVE7MEJBQVIsUUFBUTs7O2VBQVIsUUFBUTs7K0JBRUgsV0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLE1BQU0sd0JBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDL0QsV0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2I7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxJQUFJLEdBQUcsTUFBTSw0QkFBUztBQUMxQixpQkFBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQzlDLFlBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUk7T0FDM0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVWLFdBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFckQsVUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUN4QixZQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO09BQ2xDOztBQUVELFdBQUssRUFBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUM7S0FDMUI7OzsrQkFFVyxXQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxZQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN2QixXQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7OztTQTlCRyxRQUFROzs7cUJBa0NDLFFBQVEiLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3N0IGZyb20gJy4uL21vZGVscy9wb3N0JztcblxuY2xhc3MgUG9zdEN0cmwge1xuXG4gIGFzeW5jIGdldChyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBQb3N0LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkuZ2V0Sm9pbigpLnJ1bigpO1xuICAgIHJlcGx5KHBvc3QpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IG5ldyBQb3N0KHtcbiAgICAgIGFjY291bnRJZDogcmVxdWVzdC5hdXRoLmNyZWRlbnRpYWxzLmFjY291bnQuaWQsXG4gICAgICBib2R5OiByZXF1ZXN0LnBheWxvYWQuYm9keVxuICAgIH0pLnNhdmUoKTtcblxuICAgIHJlcGx5KHBvc3QpLmNvZGUoMjAxKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBQb3N0LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkucnVuKCk7XG5cbiAgICBpZiAocmVxdWVzdC5wYXlsb2FkLmJvZHkpIHtcbiAgICAgIHBvc3QuYm9keSA9IHJlcXVlc3QucGF5bG9hZC5ib2R5O1xuICAgIH1cblxuICAgIHJlcGx5KGF3YWl0IHBvc3Quc2F2ZSgpKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShyZXF1ZXN0LCByZXBseSkge1xuICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBQb3N0LmdldChyZXF1ZXN0LnBhcmFtcy5pZCkucnVuKCk7XG4gICAgYXdhaXQgcG9zdC5kZWxldGVBbGwoKTtcbiAgICByZXBseSgpLmNvZGUoMjA0KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RDdHJsO1xuIl19