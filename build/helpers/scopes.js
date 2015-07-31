'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var scopes = (0, _keymirror2['default'])({
  FIRST_PARTY: null,
  THIRD_PARTY: null
});

scopes.ALL = _Object$keys(scopes);
scopes = _Object$freeze(scopes);

exports['default'] = scopes;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3Njb3Blcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7eUJBQXNCLFdBQVc7Ozs7QUFFakMsSUFBSSxNQUFNLEdBQUcsNEJBQVU7QUFDckIsYUFBVyxFQUFFLElBQUk7QUFDakIsYUFBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFBOztBQUVGLE1BQU0sQ0FBQyxHQUFHLEdBQUcsYUFBWSxNQUFNLENBQUMsQ0FBQztBQUNqQyxNQUFNLEdBQUcsZUFBYyxNQUFNLENBQUMsQ0FBQzs7cUJBRWhCLE1BQU0iLCJmaWxlIjoic2NvcGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtleW1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuXG5sZXQgc2NvcGVzID0ga2V5bWlycm9yKHtcbiAgRklSU1RfUEFSVFk6IG51bGwsXG4gIFRISVJEX1BBUlRZOiBudWxsXG59KVxuXG5zY29wZXMuQUxMID0gT2JqZWN0LmtleXMoc2NvcGVzKTtcbnNjb3BlcyA9IE9iamVjdC5mcmVlemUoc2NvcGVzKTtcblxuZXhwb3J0IGRlZmF1bHQgc2NvcGVzO1xuIl19