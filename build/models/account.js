'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var Account = _helpersThinky2['default'].createModel('Account', {
  id: _helpersThinky.type.string()['default'](_helpersThinky.r.uuid()),
  username: _helpersThinky.type.string().required().alphanum().min(4).max(12),
  password: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
}, {
  pk: 'username'
});

Account.ensureIndex('id');
Account.hasOne(_profile2['default'], 'profile', 'id', 'accountId');

exports['default'] = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYWNjb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs2QkFBOEIsbUJBQW1COzs7O3VCQUU3QixXQUFXOzs7O0FBRS9CLElBQU0sT0FBTyxHQUFHLDJCQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBRSxFQUFFLGVBTFUsSUFBSSxDQUtULE1BQU0sRUFBRSxXQUFRLENBQUMsZUFMTixDQUFDLENBS08sSUFBSSxFQUFFLENBQUM7QUFDbkMsVUFBUSxFQUFFLGVBTkksSUFBSSxDQU1ILE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzVELFVBQVEsRUFBRSxlQVBJLElBQUksQ0FPSCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDbEMsV0FBUyxFQUFFLGVBUkcsSUFBSSxDQVFGLElBQUksRUFBRSxXQUFRLENBQUMsZUFSWCxDQUFDLENBUVksR0FBRyxFQUFFLENBQUM7Q0FDeEMsRUFBRTtBQUNELElBQUUsRUFBRSxVQUFVO0NBQ2YsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsT0FBTyxDQUFDLE1BQU0sdUJBQVUsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7cUJBRXZDLE9BQU8iLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aGlua3ksIHt0eXBlLCByfSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5cbmltcG9ydCBQcm9maWxlIGZyb20gJy4vcHJvZmlsZSc7XG5cbmNvbnN0IEFjY291bnQgPSB0aGlua3kuY3JlYXRlTW9kZWwoJ0FjY291bnQnLCB7XG4gIGlkOiB0eXBlLnN0cmluZygpLmRlZmF1bHQoci51dWlkKCkpLFxuICB1c2VybmFtZTogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLmFscGhhbnVtKCkubWluKDQpLm1heCgxMiksXG4gIHBhc3N3b3JkOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNyZWF0ZWRBdDogdHlwZS5kYXRlKCkuZGVmYXVsdChyLm5vdygpKVxufSwge1xuICBwazogJ3VzZXJuYW1lJ1xufSk7XG5cbkFjY291bnQuZW5zdXJlSW5kZXgoJ2lkJyk7XG5BY2NvdW50Lmhhc09uZShQcm9maWxlLCAncHJvZmlsZScsICdpZCcsICdhY2NvdW50SWQnKTtcblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcbiJdfQ==