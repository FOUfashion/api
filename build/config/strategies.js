'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersValidations = require('../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

exports['default'] = [{
  name: 'bearer',
  scheme: 'bearer-access-token',
  mode: 'required',
  options: {
    validateFunc: _helpersValidations2['default'].bearer
  }
}];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3RyYXRlZ2llcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQ0FBd0Isd0JBQXdCOzs7O3FCQUVqQyxDQUFDO0FBQ2QsTUFBSSxFQUFFLFFBQVE7QUFDZCxRQUFNLEVBQUUscUJBQXFCO0FBQzdCLE1BQUksRUFBRSxVQUFVO0FBQ2hCLFNBQU8sRUFBRTtBQUNQLGdCQUFZLEVBQUUsZ0NBQVksTUFBTTtHQUNqQztDQUNGLENBQUMiLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB2YWxpZGF0aW9ucyBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgW3tcbiAgbmFtZTogJ2JlYXJlcicsXG4gIHNjaGVtZTogJ2JlYXJlci1hY2Nlc3MtdG9rZW4nLFxuICBtb2RlOiAncmVxdWlyZWQnLFxuICBvcHRpb25zOiB7XG4gICAgdmFsaWRhdGVGdW5jOiB2YWxpZGF0aW9ucy5iZWFyZXJcbiAgfVxufV07XG4iXX0=