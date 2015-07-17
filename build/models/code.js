'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var Code = _helpersThinky2['default'].createModel('Code', {
  value: _helpersThinky.type.string().required(),
  accountId: _helpersThinky.type.string().required(),
  clientId: _helpersThinky.type.string().required(),
  scope: _helpersThinky.type.array().schema(_helpersThinky.type.string()).required(),
  used: _helpersThinky.type.boolean()['default'](false),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'value'
});

Code.belongsTo(_account2['default'], 'account', 'accountId', 'id');
Code.belongsTo(_client2['default'], 'client', 'clientId', 'id');

exports['default'] = Code;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY29kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O3VCQUU3QixXQUFXOzs7O3NCQUNaLFVBQVU7Ozs7QUFFN0IsSUFBTSxJQUFJLEdBQUcsMkJBQU8sV0FBVyxDQUFDLE1BQU0sRUFBRTtBQUN0QyxPQUFLLEVBQUUsZUFOTyxJQUFJLENBTU4sTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQy9CLFdBQVMsRUFBRSxlQVBHLElBQUksQ0FPRixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDbkMsVUFBUSxFQUFFLGVBUkksSUFBSSxDQVFILE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNsQyxPQUFLLEVBQUUsZUFUTyxJQUFJLENBU04sS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBVGIsSUFBSSxDQVNjLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO0FBQ3BELE1BQUksRUFBRSxlQVZRLElBQUksQ0FVUCxPQUFPLEVBQUUsV0FBUSxDQUFDLEtBQUssQ0FBQztBQUNuQyxXQUFTLEVBQUUsZUFYRyxJQUFJLENBV0YsSUFBSSxFQUFFLFdBQVEsQ0FBQyxlQVhYLENBQUMsQ0FXWSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxFQUFFO0FBQ0QsSUFBRSxFQUFFLE9BQU87Q0FDWixDQUFDLENBQUM7O0FBRUgsSUFBSSxDQUFDLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxJQUFJLENBQUMsU0FBUyxzQkFBUyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztxQkFFcEMsSUFBSSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRoaW5reSwge3R5cGUsIHJ9IGZyb20gJy4uL2hlbHBlcnMvdGhpbmt5JztcblxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50JztcbmltcG9ydCBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuXG5jb25zdCBDb2RlID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdDb2RlJywge1xuICB2YWx1ZTogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBhY2NvdW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY2xpZW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgc2NvcGU6IHR5cGUuYXJyYXkoKS5zY2hlbWEodHlwZS5zdHJpbmcoKSkucmVxdWlyZWQoKSxcbiAgdXNlZDogdHlwZS5ib29sZWFuKCkuZGVmYXVsdChmYWxzZSksXG4gIGNyZWF0ZWRBdDogdHlwZS5kYXRlKCkuZGVmYXVsdChyLm5vdygpKVxufSwge1xuICBwazogJ3ZhbHVlJ1xufSk7XG5cbkNvZGUuYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuQ29kZS5iZWxvbmdzVG8oQ2xpZW50LCAnY2xpZW50JywgJ2NsaWVudElkJywgJ2lkJyk7XG5cbmV4cG9ydCBkZWZhdWx0IENvZGU7XG4iXX0=