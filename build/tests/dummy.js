'use strict';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kdW1teS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBa0IsT0FBTzs7Ozs7Ozs7O3FCQU1WOztBQUViLFNBQU8sRUFBRSxtQkFBVztBQUNsQixXQUFPO0FBQ0wsV0FBSyxFQUFFLG1CQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUU7QUFDM0MsY0FBUSxFQUFFLG1CQUFNLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzlFLGNBQVEsRUFBRSxtQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ25DLGVBQVMsRUFBRSxtQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2pDLGNBQVEsRUFBRSxtQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO0tBQ2hDLENBQUM7R0FDSDs7Q0FFRiIsImZpbGUiOiJkdW1teS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWtlciBmcm9tICdmYWtlcic7XG5cbi8qKlxuICogR2VuZXJhdGVzIGR1bW15IG9iamVjdHMgdXNpbmcgZmFrZXIuXG4gKiBVc2VkIGluIHRlc3RzIHRvIGNyZWF0ZSByYW5kb20gZGIgZG9jdW1lbnRzLlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgYWNjb3VudDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVtYWlsOiBmYWtlci5pbnRlcm5ldC5lbWFpbCgpLnRvTG93ZXJDYXNlKCksXG4gICAgICB1c2VybmFtZTogZmFrZXIuaW50ZXJuZXQudXNlck5hbWUoKS5yZXBsYWNlKC9bXmEtekEtWjAtOV0vZywgJycpLnN1YnN0cigwLCAxMCksXG4gICAgICBwYXNzd29yZDogZmFrZXIuaW50ZXJuZXQucGFzc3dvcmQoKSxcbiAgICAgIGZpcnN0TmFtZTogZmFrZXIubmFtZS5maXJzdE5hbWUoKSxcbiAgICAgIGxhc3ROYW1lOiBmYWtlci5uYW1lLmxhc3ROYW1lKClcbiAgICB9O1xuICB9XG5cbn07XG4iXX0=