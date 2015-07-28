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
      delete token.account.password;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3ZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7MkJBQWtCLGlCQUFpQjs7Ozs2QkFDaEIsbUJBQW1COzs7O3dCQUNqQixZQUFZOzs7O3FCQUVsQjtBQUNiLFFBQU0sc0JBQUUsV0FBZSxXQUFXLEVBQUUsUUFBUSxFQUFFO0FBQzVDLFFBQUk7QUFDRixVQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzRCxhQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDOztBQUU5QixjQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNuQixZQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sS0FBSyxzQkFBUyxXQUFXO0FBQzNDLGVBQU8sRUFBRSxLQUFLLENBQUMsT0FBTztBQUN0QixjQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDcEIsYUFBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO0FBQ2xCLGNBQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtPQUNyQixDQUFDLENBQUM7S0FDSixDQUFDLE9BQU8sS0FBSyxFQUFFOztBQUVkLFVBQUksS0FBSyxZQUFZLDJCQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuRCxnQkFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztPQUN2QixNQUFNO0FBQ0wsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNqQjs7QUFBQSxLQUVGO0dBQ0YsQ0FBQTtDQUNGIiwiZmlsZSI6InZhbGlkYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRva2VuIGZyb20gJy4uL21vZGVscy90b2tlbic7XG5pbXBvcnQgdGhpbmt5IGZyb20gJy4uL2hlbHBlcnMvdGhpbmt5JztcbmltcG9ydCBlbnRpdGllcyBmcm9tICcuL2VudGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiZWFyZXI6IGFzeW5jIGZ1bmN0aW9uKGFjY2Vzc1Rva2VuLCBjYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IFRva2VuLmdldChhY2Nlc3NUb2tlbikuZ2V0Sm9pbigpLnJ1bigpO1xuICAgICAgZGVsZXRlIHRva2VuLmFjY291bnQucGFzc3dvcmQ7XG5cbiAgICAgIGNhbGxiYWNrKG51bGwsIHRydWUsIHtcbiAgICAgICAgdXNlcjogdG9rZW4uZW50aXR5ID09PSBlbnRpdGllcy5GSVJTVF9QQVJUWSxcbiAgICAgICAgYWNjb3VudDogdG9rZW4uYWNjb3VudCxcbiAgICAgICAgY2xpZW50OiB0b2tlbi5jbGllbnQsXG4gICAgICAgIHNjb3BlOiB0b2tlbi5zY29wZSxcbiAgICAgICAgZW50aXR5OiB0b2tlbi5lbnRpdHlcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyAkbGFiOmNvdmVyYWdlOm9mZiRcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHRoaW5reS5FcnJvcnMuRG9jdW1lbnROb3RGb3VuZCkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICAvLyAkbGFiOmNvdmVyYWdlOm9uJFxuICAgIH1cbiAgfVxufTtcbiJdfQ==