'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var HomeCtrl = (function () {
  function HomeCtrl() {
    _classCallCheck(this, HomeCtrl);
  }

  _createClass(HomeCtrl, [{
    key: 'index',
    value: function index(request, reply) {
      reply({
        name: _packageJson2['default'].description,
        version: _packageJson2['default'].version,
        authenticated: request.auth.isAuthenticated,
        received: request.info.received
      });
    }
  }]);

  return HomeCtrl;
})();

exports['default'] = HomeCtrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzsyQkFBcUIsb0JBQW9COzs7O0lBRW5DLFFBQVE7V0FBUixRQUFROzBCQUFSLFFBQVE7OztlQUFSLFFBQVE7O1dBRVAsZUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3BCLFdBQUssQ0FBQztBQUNKLFlBQUksRUFBRSx5QkFBUyxXQUFXO0FBQzFCLGVBQU8sRUFBRSx5QkFBUyxPQUFPO0FBQ3pCLHFCQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQzNDLGdCQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRO09BQ2hDLENBQUMsQ0FBQztLQUNKOzs7U0FURyxRQUFROzs7cUJBYUMsUUFBUSIsImZpbGUiOiJob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmNsYXNzIEhvbWVDdHJsIHtcblxuICBpbmRleChyZXF1ZXN0LCByZXBseSkge1xuICAgIHJlcGx5KHtcbiAgICAgIG5hbWU6IG1hbmlmZXN0LmRlc2NyaXB0aW9uLFxuICAgICAgdmVyc2lvbjogbWFuaWZlc3QudmVyc2lvbixcbiAgICAgIGF1dGhlbnRpY2F0ZWQ6IHJlcXVlc3QuYXV0aC5pc0F1dGhlbnRpY2F0ZWQsXG4gICAgICByZWNlaXZlZDogcmVxdWVzdC5pbmZvLnJlY2VpdmVkXG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lQ3RybDtcbiJdfQ==