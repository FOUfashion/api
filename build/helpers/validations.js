'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsToken = require('../models/token');

var _modelsToken2 = _interopRequireDefault(_modelsToken);

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
    } catch (ex) {
      callback(ex);
    }
  })
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3ZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7MkJBQWtCLGlCQUFpQjs7Ozt3QkFDZCxZQUFZOzs7O3FCQUVsQjtBQUNiLFFBQU0sc0JBQUUsV0FBZSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQzVDLFFBQUk7QUFDRixVQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFM0QsY0FBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbkIsWUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEtBQUssc0JBQVMsV0FBVztBQUMzQyxlQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDdEIsY0FBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ3BCLGFBQUssRUFBRSxLQUFLLENBQUMsS0FBSztBQUNsQixjQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07T0FDckIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNYLGNBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNkO0dBQ0YsQ0FBQTtDQUNGIiwiZmlsZSI6InZhbGlkYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRva2VuIGZyb20gJy4uL21vZGVscy90b2tlbic7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi9lbnRpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmVhcmVyOiBhc3luYyBmdW5jdGlvbihhY2Nlc3NUb2tlbiwgY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBUb2tlbi5nZXQoYWNjZXNzVG9rZW4pLmdldEpvaW4oKS5ydW4oKTtcblxuICAgICAgY2FsbGJhY2sobnVsbCwgdHJ1ZSwge1xuICAgICAgICB1c2VyOiB0b2tlbi5lbnRpdHkgPT09IGVudGl0aWVzLkZJUlNUX1BBUlRZLFxuICAgICAgICBhY2NvdW50OiB0b2tlbi5hY2NvdW50LFxuICAgICAgICBjbGllbnQ6IHRva2VuLmNsaWVudCxcbiAgICAgICAgc2NvcGU6IHRva2VuLnNjb3BlLFxuICAgICAgICBlbnRpdHk6IHRva2VuLmVudGl0eVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNhbGxiYWNrKGV4KTtcbiAgICB9XG4gIH1cbn07XG4iXX0=