'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Client = _helpersThinky2['default'].createModel('Client', {
  id: _helpersThinky.type.string(),
  name: _helpersThinky.type.string().required(),
  secret: _helpersThinky.type.string().required(),
  accountId: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
});

exports['default'] = Client;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OzZCQUE4QixtQkFBbUI7Ozs7QUFFakQsSUFBTSxNQUFNLEdBQUcsMkJBQU8sV0FBVyxDQUFDLFFBQVEsRUFBRTtBQUMxQyxJQUFFLEVBQUUsZUFIVSxJQUFJLENBR1QsTUFBTSxFQUFFO0FBQ2pCLE1BQUksRUFBRSxlQUpRLElBQUksQ0FJUCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDOUIsUUFBTSxFQUFFLGVBTE0sSUFBSSxDQUtMLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNoQyxXQUFTLEVBQUUsZUFORyxJQUFJLENBTUYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ25DLFdBQVMsRUFBRSxlQVBHLElBQUksQ0FPRixJQUFJLEVBQUUsV0FBUSxDQUFDLGVBUFgsQ0FBQyxDQU9ZLEdBQUcsRUFBRSxDQUFDO0NBQ3hDLENBQUMsQ0FBQzs7cUJBRVksTUFBTSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBDbGllbnQgPSB0aGlua3kuY3JlYXRlTW9kZWwoJ0NsaWVudCcsIHtcbiAgaWQ6IHR5cGUuc3RyaW5nKCksXG4gIG5hbWU6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgc2VjcmV0OiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGFjY291bnRJZDogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBjcmVhdGVkQXQ6IHR5cGUuZGF0ZSgpLmRlZmF1bHQoci5ub3coKSlcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnQ7XG4iXX0=