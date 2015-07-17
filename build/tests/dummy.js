'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

/**
 * Generates dummy objects using faker.
 * Used in tests to create random db documents.
 */
exports['default'] = {

  account: function account() {
    return {
      email: _faker2['default'].internet.email().toLowerCase(),
      username: _faker2['default'].internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: _faker2['default'].internet.password(),
      firstName: _faker2['default'].name.firstName(),
      lastName: _faker2['default'].name.lastName()
    };
  }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kdW1teS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBa0IsT0FBTzs7Ozs7Ozs7cUJBTVY7O0FBRWIsU0FBTyxFQUFFLG1CQUFXO0FBQ2xCLFdBQU87QUFDTCxXQUFLLEVBQUUsbUJBQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRTtBQUMzQyxjQUFRLEVBQUUsbUJBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDOUUsY0FBUSxFQUFFLG1CQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUU7QUFDbkMsZUFBUyxFQUFFLG1CQUFNLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDakMsY0FBUSxFQUFFLG1CQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7S0FDaEMsQ0FBQztHQUNIOztDQUVGIiwiZmlsZSI6ImR1bW15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZha2VyIGZyb20gJ2Zha2VyJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgZHVtbXkgb2JqZWN0cyB1c2luZyBmYWtlci5cbiAqIFVzZWQgaW4gdGVzdHMgdG8gY3JlYXRlIHJhbmRvbSBkYiBkb2N1bWVudHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBhY2NvdW50OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW1haWw6IGZha2VyLmludGVybmV0LmVtYWlsKCkudG9Mb3dlckNhc2UoKSxcbiAgICAgIHVzZXJuYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCAnJykuc3Vic3RyKDAsIDEwKSxcbiAgICAgIHBhc3N3b3JkOiBmYWtlci5pbnRlcm5ldC5wYXNzd29yZCgpLFxuICAgICAgZmlyc3ROYW1lOiBmYWtlci5uYW1lLmZpcnN0TmFtZSgpLFxuICAgICAgbGFzdE5hbWU6IGZha2VyLm5hbWUubGFzdE5hbWUoKVxuICAgIH07XG4gIH1cblxufTtcbiJdfQ==