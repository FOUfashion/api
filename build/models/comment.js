'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var Comment = _helpersThinky2['default'].createModel('Comment', {
  id: _helpersThinky.type.string(),
  accountId: _helpersThinky.type.string().required(),
  body: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
});

exports['default'] = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY29tbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O0FBRWpELElBQU0sT0FBTyxHQUFHLDJCQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBRSxFQUFFLGVBSFUsSUFBSSxDQUdULE1BQU0sRUFBRTtBQUNqQixXQUFTLEVBQUUsZUFKRyxJQUFJLENBSUYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ25DLE1BQUksRUFBRSxlQUxRLElBQUksQ0FLUCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDOUIsV0FBUyxFQUFFLGVBTkcsSUFBSSxDQU1GLElBQUksRUFBRSxXQUFRLENBQUMsZUFOWCxDQUFDLENBTVksR0FBRyxFQUFFLENBQUM7Q0FDeEMsQ0FBQyxDQUFDOztxQkFFWSxPQUFPIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBDb21tZW50ID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdDb21tZW50Jywge1xuICBpZDogdHlwZS5zdHJpbmcoKSxcbiAgYWNjb3VudElkOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGJvZHk6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY3JlYXRlZEF0OiB0eXBlLmRhdGUoKS5kZWZhdWx0KHIubm93KCkpXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudDtcbiJdfQ==