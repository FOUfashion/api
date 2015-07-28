'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

exports['default'] = {
  bearer: _bluebird.coroutine(function* (accessToken, callback) {
    try {
      var token = yield _modelsToken2['default'].get(accessToken).getJoin().run();

      callback(null, true, {
        user: token.entity === _entities2['default'].FIRST_PARTY,
        account: token.account,
        client: token.client,
        scope: token.scope,
        entity: token.entity
      });
    } catch (error) {
      // $lab:coverage:off$
      if (error instanceof _helpersThinky2['default'].Errors.DocumentNotFound) {
        callback(null, false);
      } else {
        callback(error);
      }
      // $lab:coverage:on$
    }
  })
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3ZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7MkJBQWtCLGlCQUFpQjs7Ozs2QkFDaEIsbUJBQW1COzs7O3dCQUNqQixZQUFZOzs7O3FCQUVsQjtBQUNiLFFBQU0sc0JBQUUsV0FBZSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQzVDLFFBQUk7QUFDRixVQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFM0QsY0FBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbkIsWUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEtBQUssc0JBQVMsV0FBVztBQUMzQyxlQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDdEIsY0FBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ3BCLGFBQUssRUFBRSxLQUFLLENBQUMsS0FBSztBQUNsQixjQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07T0FDckIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxPQUFPLEtBQUssRUFBRTs7QUFFZCxVQUFJLEtBQUssWUFBWSwyQkFBTyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7QUFDbkQsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDdkIsTUFBTTtBQUNMLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDakI7O0FBQUEsS0FFRjtHQUNGLENBQUE7Q0FDRiIsImZpbGUiOiJ2YWxpZGF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb2tlbiBmcm9tICcuLi9tb2RlbHMvdG9rZW4nO1xuaW1wb3J0IHRoaW5reSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi9lbnRpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmVhcmVyOiBhc3luYyBmdW5jdGlvbihhY2Nlc3NUb2tlbiwgY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBUb2tlbi5nZXQoYWNjZXNzVG9rZW4pLmdldEpvaW4oKS5ydW4oKTtcblxuICAgICAgY2FsbGJhY2sobnVsbCwgdHJ1ZSwge1xuICAgICAgICB1c2VyOiB0b2tlbi5lbnRpdHkgPT09IGVudGl0aWVzLkZJUlNUX1BBUlRZLFxuICAgICAgICBhY2NvdW50OiB0b2tlbi5hY2NvdW50LFxuICAgICAgICBjbGllbnQ6IHRva2VuLmNsaWVudCxcbiAgICAgICAgc2NvcGU6IHRva2VuLnNjb3BlLFxuICAgICAgICBlbnRpdHk6IHRva2VuLmVudGl0eVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgdGhpbmt5LkVycm9ycy5Eb2N1bWVudE5vdEZvdW5kKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIC8vICRsYWI6Y292ZXJhZ2U6b24kXG4gICAgfVxuICB9XG59O1xuIl19