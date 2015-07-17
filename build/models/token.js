'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _helpersEntities = require('../helpers/entities');

var _helpersEntities2 = _interopRequireDefault(_helpersEntities);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var Token = _helpersThinky2['default'].createModel('Token', {
  value: _helpersThinky.type.string().required(),
  accountId: _helpersThinky.type.string().required(),
  clientId: _helpersThinky.type.string().required(),
  scope: _helpersThinky.type.array().schema(_helpersThinky.type.string()).required(),
  entity: _helpersThinky.type.string()['enum'](_helpersEntities2['default'].FIRST_PARTY, _helpersEntities2['default'].THIRD_PARTY)['default'](_helpersEntities2['default'].THIRD_PARTY),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'value'
});

Token.belongsTo(_account2['default'], 'account', 'accountId', 'id');
Token.belongsTo(_client2['default'], 'client', 'clientId', 'id');

exports['default'] = Token;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdG9rZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NkJBQThCLG1CQUFtQjs7OzsrQkFDNUIscUJBQXFCOzs7O3VCQUV0QixXQUFXOzs7O3NCQUNaLFVBQVU7Ozs7QUFFN0IsSUFBTSxLQUFLLEdBQUcsMkJBQU8sV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN4QyxPQUFLLEVBQUUsZUFQTyxJQUFJLENBT04sTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQy9CLFdBQVMsRUFBRSxlQVJHLElBQUksQ0FRRixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDbkMsVUFBUSxFQUFFLGVBVEksSUFBSSxDQVNILE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNsQyxPQUFLLEVBQUUsZUFWTyxJQUFJLENBVU4sS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBVmIsSUFBSSxDQVVjLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO0FBQ3BELFFBQU0sRUFBRSxlQVhNLElBQUksQ0FXTCxNQUFNLEVBQUUsUUFBSyxDQUFDLDZCQUFTLFdBQVcsRUFBRSw2QkFBUyxXQUFXLENBQUMsV0FBUSxDQUFDLDZCQUFTLFdBQVcsQ0FBQztBQUNwRyxXQUFTLEVBQUUsZUFaRyxJQUFJLENBWUYsSUFBSSxFQUFFLFdBQVEsQ0FBQyxlQVpYLENBQUMsQ0FZWSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxFQUFFO0FBQ0QsSUFBRSxFQUFFLE9BQU87Q0FDWixDQUFDLENBQUM7O0FBRUgsS0FBSyxDQUFDLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RCxLQUFLLENBQUMsU0FBUyxzQkFBUyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztxQkFFckMsS0FBSyIsImZpbGUiOiJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aGlua3ksIHt0eXBlLCByfSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi4vaGVscGVycy9lbnRpdGllcyc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCc7XG5pbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50JztcblxuY29uc3QgVG9rZW4gPSB0aGlua3kuY3JlYXRlTW9kZWwoJ1Rva2VuJywge1xuICB2YWx1ZTogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBhY2NvdW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY2xpZW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgc2NvcGU6IHR5cGUuYXJyYXkoKS5zY2hlbWEodHlwZS5zdHJpbmcoKSkucmVxdWlyZWQoKSxcbiAgZW50aXR5OiB0eXBlLnN0cmluZygpLmVudW0oZW50aXRpZXMuRklSU1RfUEFSVFksIGVudGl0aWVzLlRISVJEX1BBUlRZKS5kZWZhdWx0KGVudGl0aWVzLlRISVJEX1BBUlRZKSxcbiAgY3JlYXRlZEF0OiB0eXBlLmRhdGUoKS5kZWZhdWx0KHIubm93KCkpXG59LCB7XG4gIHBrOiAndmFsdWUnXG59KTtcblxuVG9rZW4uYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuVG9rZW4uYmVsb25nc1RvKENsaWVudCwgJ2NsaWVudCcsICdjbGllbnRJZCcsICdpZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBUb2tlbjtcbiJdfQ==