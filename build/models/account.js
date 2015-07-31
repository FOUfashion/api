'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Account = _helpersThinky2['default'].createModel('Account', {
  id: _helpersThinky.type.string()['default'](_helpersThinky.r.uuid()),
  username: _helpersThinky.type.string().required().alphanum().min(4).max(12),
  password: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'username'
});

exports['default'] = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYWNjb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O0FBRWpELElBQU0sT0FBTyxHQUFHLDJCQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBRSxFQUFFLGVBSFUsSUFBSSxDQUdULE1BQU0sRUFBRSxXQUFRLENBQUMsZUFITixDQUFDLENBR08sSUFBSSxFQUFFLENBQUM7QUFDbkMsVUFBUSxFQUFFLGVBSkksSUFBSSxDQUlILE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzVELFVBQVEsRUFBRSxlQUxJLElBQUksQ0FLSCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDbEMsV0FBUyxFQUFFLGVBTkcsSUFBSSxDQU1GLElBQUksRUFBRSxXQUFRLENBQUMsZUFOWCxDQUFDLENBTVksR0FBRyxFQUFFLENBQUM7Q0FDeEMsRUFBRTtBQUNELElBQUUsRUFBRSxVQUFVO0NBQ2YsQ0FBQyxDQUFDOztxQkFFWSxPQUFPIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBBY2NvdW50ID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdBY2NvdW50Jywge1xuICBpZDogdHlwZS5zdHJpbmcoKS5kZWZhdWx0KHIudXVpZCgpKSxcbiAgdXNlcm5hbWU6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKS5hbHBoYW51bSgpLm1pbig0KS5tYXgoMTIpLFxuICBwYXNzd29yZDogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBjcmVhdGVkQXQ6IHR5cGUuZGF0ZSgpLmRlZmF1bHQoci5ub3coKSlcbn0sIHtcbiAgcGs6ICd1c2VybmFtZSdcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuIl19