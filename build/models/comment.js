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
  postId: _helpersThinky.type.string().required(),
  body: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
});

exports['default'] = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY29tbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O0FBRWpELElBQU0sT0FBTyxHQUFHLDJCQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBRSxFQUFFLGVBSFUsSUFBSSxDQUdULE1BQU0sRUFBRTtBQUNqQixXQUFTLEVBQUUsZUFKRyxJQUFJLENBSUYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ25DLFFBQU0sRUFBRSxlQUxNLElBQUksQ0FLTCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDaEMsTUFBSSxFQUFFLGVBTlEsSUFBSSxDQU1QLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUM5QixXQUFTLEVBQUUsZUFQRyxJQUFJLENBT0YsSUFBSSxFQUFFLFdBQVEsQ0FBQyxlQVBYLENBQUMsQ0FPWSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxDQUFDLENBQUM7O3FCQUVZLE9BQU8iLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aGlua3ksIHt0eXBlLCByfSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5cbmNvbnN0IENvbW1lbnQgPSB0aGlua3kuY3JlYXRlTW9kZWwoJ0NvbW1lbnQnLCB7XG4gIGlkOiB0eXBlLnN0cmluZygpLFxuICBhY2NvdW50SWQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgcG9zdElkOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGJvZHk6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY3JlYXRlZEF0OiB0eXBlLmRhdGUoKS5kZWZhdWx0KHIubm93KCkpXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudDtcbiJdfQ==