'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersThinky = require('../helpers/thinky');

var _helpersThinky2 = _interopRequireDefault(_helpersThinky);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var Client = _helpersThinky2['default'].createModel('Client', {
  id: _helpersThinky.type.string(),
  name: _helpersThinky.type.string().required(),
  secret: _helpersThinky.type.string().required(),
  accountId: _helpersThinky.type.string().required(),
  createdAt: _helpersThinky.type.date()['default'](_helpersThinky.r.now())
});

Client.ensureIndex('id');
Client.belongsTo(_account2['default'], 'account', 'accountId', 'id');

exports['default'] = Client;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OzZCQUE4QixtQkFBbUI7Ozs7dUJBRTdCLFdBQVc7Ozs7QUFFL0IsSUFBTSxNQUFNLEdBQUcsMkJBQU8sV0FBVyxDQUFDLFFBQVEsRUFBRTtBQUMxQyxJQUFFLEVBQUUsZUFMVSxJQUFJLENBS1QsTUFBTSxFQUFFO0FBQ2pCLE1BQUksRUFBRSxlQU5RLElBQUksQ0FNUCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7QUFDOUIsUUFBTSxFQUFFLGVBUE0sSUFBSSxDQU9MLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNoQyxXQUFTLEVBQUUsZUFSRyxJQUFJLENBUUYsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ25DLFdBQVMsRUFBRSxlQVRHLElBQUksQ0FTRixJQUFJLEVBQUUsV0FBUSxDQUFDLGVBVFgsQ0FBQyxDQVNZLEdBQUcsRUFBRSxDQUFDO0NBQ3hDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxTQUFTLHVCQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O3FCQUV6QyxNQUFNIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aGlua3ksIHt0eXBlLCByfSBmcm9tICcuLi9oZWxwZXJzL3RoaW5reSc7XG5cbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCc7XG5cbmNvbnN0IENsaWVudCA9IHRoaW5reS5jcmVhdGVNb2RlbCgnQ2xpZW50Jywge1xuICBpZDogdHlwZS5zdHJpbmcoKSxcbiAgbmFtZTogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBzZWNyZXQ6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgYWNjb3VudElkOiB0eXBlLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNyZWF0ZWRBdDogdHlwZS5kYXRlKCkuZGVmYXVsdChyLm5vdygpKVxufSk7XG5cbkNsaWVudC5lbnN1cmVJbmRleCgnaWQnKTtcbkNsaWVudC5iZWxvbmdzVG8oQWNjb3VudCwgJ2FjY291bnQnLCAnYWNjb3VudElkJywgJ2lkJyk7XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudDtcbiJdfQ==