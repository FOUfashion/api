'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Token = _helpersThinky2['default'].createModel('Token', {
  value: _helpersThinky.type.string().required(),
  accountId: _helpersThinky.type.string().required(),
  clientId: _helpersThinky.type.string().required(),
  scope: _helpersThinky.type.array().schema(_helpersThinky.type.string()).required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'value'
});

exports['default'] = Token;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdG9rZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NkJBQThCLG1CQUFtQjs7OztBQUVqRCxJQUFNLEtBQUssR0FBRywyQkFBTyxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3hDLE9BQUssRUFBRSxlQUhPLElBQUksQ0FHTixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDL0IsV0FBUyxFQUFFLGVBSkcsSUFBSSxDQUlGLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNuQyxVQUFRLEVBQUUsZUFMSSxJQUFJLENBS0gsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2xDLE9BQUssRUFBRSxlQU5PLElBQUksQ0FNTixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFOYixJQUFJLENBTWMsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFDcEQsV0FBUyxFQUFFLGVBUEcsSUFBSSxDQU9GLElBQUksRUFBRSxXQUFRLENBQUMsZUFQWCxDQUFDLENBT1ksR0FBRyxFQUFFLENBQUM7Q0FDeEMsRUFBRTtBQUNELElBQUUsRUFBRSxPQUFPO0NBQ1osQ0FBQyxDQUFDOztxQkFFWSxLQUFLIiwiZmlsZSI6InRva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRoaW5reSwge3R5cGUsIHJ9IGZyb20gJy4uL2hlbHBlcnMvdGhpbmt5JztcblxuY29uc3QgVG9rZW4gPSB0aGlua3kuY3JlYXRlTW9kZWwoJ1Rva2VuJywge1xuICB2YWx1ZTogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBhY2NvdW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY2xpZW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgc2NvcGU6IHR5cGUuYXJyYXkoKS5zY2hlbWEodHlwZS5zdHJpbmcoKSkucmVxdWlyZWQoKSxcbiAgY3JlYXRlZEF0OiB0eXBlLmRhdGUoKS5kZWZhdWx0KHIubm93KCkpXG59LCB7XG4gIHBrOiAndmFsdWUnXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVG9rZW47XG4iXX0=