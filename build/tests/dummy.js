'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _faker = require('faker');

/**
 * Generates dummy objects using faker.
 * Used in tests to create random db documents.
 */

var _faker2 = _interopRequireDefault(_faker);

exports['default'] = {

  account: function account(extra) {
    return _Object$assign({
      username: _faker2['default'].internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: _faker2['default'].internet.password(),
      profile: {
        email: _faker2['default'].internet.email().toLowerCase(),
        name: {
          first: _faker2['default'].name.firstName(),
          last: _faker2['default'].name.lastName()
        }
      }
    }, extra);
  },

  accountProfile: function accountProfile(extra) {
    return _Object$assign({
      email: _faker2['default'].internet.email().toLowerCase(),
      username: _faker2['default'].internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: _faker2['default'].internet.password(),
      firstName: _faker2['default'].name.firstName(),
      lastName: _faker2['default'].name.lastName()
    }, extra);
  },

  post: function post(extra) {
    return _Object$assign({
      body: _faker2['default'].lorem.sentence()
    }, extra);
  },

  comment: function comment(extra) {
    return _Object$assign({
      body: _faker2['default'].lorem.sentence()
    }, extra);
  }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kdW1teS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FCQUFrQixPQUFPOzs7Ozs7Ozs7cUJBTVY7O0FBRWIsU0FBTyxFQUFFLGlCQUFTLEtBQUssRUFBRTtBQUN2QixXQUFPLGVBQWM7QUFDbkIsY0FBUSxFQUFFLG1CQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzlFLGNBQVEsRUFBRSxtQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ25DLGFBQU8sRUFBRTtBQUNQLGFBQUssRUFBRSxtQkFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFO0FBQzNDLFlBQUksRUFBRTtBQUNKLGVBQUssRUFBRSxtQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzdCLGNBQUksRUFBRSxtQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzVCO09BQ0Y7S0FDRixFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsZ0JBQWMsRUFBRSx3QkFBUyxLQUFLLEVBQUU7QUFDOUIsV0FBTyxlQUFjO0FBQ25CLFdBQUssRUFBRSxtQkFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFO0FBQzNDLGNBQVEsRUFBRSxtQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM5RSxjQUFRLEVBQUUsbUJBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUNuQyxlQUFTLEVBQUUsbUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNqQyxjQUFRLEVBQUUsbUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtLQUNoQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsTUFBSSxFQUFFLGNBQVMsS0FBSyxFQUFFO0FBQ3BCLFdBQU8sZUFBYztBQUNuQixVQUFJLEVBQUUsbUJBQU0sS0FBSyxDQUFDLFFBQVEsRUFBRTtLQUM3QixFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsU0FBTyxFQUFFLGlCQUFTLEtBQUssRUFBRTtBQUN2QixXQUFPLGVBQWM7QUFDbkIsVUFBSSxFQUFFLG1CQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUU7S0FDN0IsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNYOztDQUVGIiwiZmlsZSI6ImR1bW15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZha2VyIGZyb20gJ2Zha2VyJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgZHVtbXkgb2JqZWN0cyB1c2luZyBmYWtlci5cbiAqIFVzZWQgaW4gdGVzdHMgdG8gY3JlYXRlIHJhbmRvbSBkYiBkb2N1bWVudHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBhY2NvdW50OiBmdW5jdGlvbihleHRyYSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgIHVzZXJuYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCAnJykuc3Vic3RyKDAsIDEwKSxcbiAgICAgIHBhc3N3b3JkOiBmYWtlci5pbnRlcm5ldC5wYXNzd29yZCgpLFxuICAgICAgcHJvZmlsZToge1xuICAgICAgICBlbWFpbDogZmFrZXIuaW50ZXJuZXQuZW1haWwoKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZmlyc3Q6IGZha2VyLm5hbWUuZmlyc3ROYW1lKCksXG4gICAgICAgICAgbGFzdDogZmFrZXIubmFtZS5sYXN0TmFtZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBleHRyYSk7XG4gIH0sXG5cbiAgYWNjb3VudFByb2ZpbGU6IGZ1bmN0aW9uKGV4dHJhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgICAgZW1haWw6IGZha2VyLmludGVybmV0LmVtYWlsKCkudG9Mb3dlckNhc2UoKSxcbiAgICAgIHVzZXJuYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCAnJykuc3Vic3RyKDAsIDEwKSxcbiAgICAgIHBhc3N3b3JkOiBmYWtlci5pbnRlcm5ldC5wYXNzd29yZCgpLFxuICAgICAgZmlyc3ROYW1lOiBmYWtlci5uYW1lLmZpcnN0TmFtZSgpLFxuICAgICAgbGFzdE5hbWU6IGZha2VyLm5hbWUubGFzdE5hbWUoKVxuICAgIH0sIGV4dHJhKTtcbiAgfSxcblxuICBwb3N0OiBmdW5jdGlvbihleHRyYSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgIGJvZHk6IGZha2VyLmxvcmVtLnNlbnRlbmNlKClcbiAgICB9LCBleHRyYSk7XG4gIH0sXG5cbiAgY29tbWVudDogZnVuY3Rpb24oZXh0cmEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7XG4gICAgICBib2R5OiBmYWtlci5sb3JlbS5zZW50ZW5jZSgpXG4gICAgfSwgZXh0cmEpO1xuICB9XG5cbn07XG4iXX0=