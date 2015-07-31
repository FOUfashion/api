'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _post = require('./post');

// Account

var _post2 = _interopRequireDefault(_post);

_account2['default'].ensureIndex('id');

_account2['default'].hasOne(_profile2['default'], 'profile', 'id', 'accountId');
_account2['default'].hasMany(_post2['default'], 'posts', 'id', 'accountId');

_account2['default'].hasMany(_client2['default'], 'clients', 'id', 'accountId');
_account2['default'].hasMany(_token2['default'], 'tokens', 'id', 'accountId');
_account2['default'].hasMany(_code2['default'], 'codes', 'id', 'accountId');

// Profile
_profile2['default'].ensureIndex('id');
_profile2['default'].ensureIndex('accountId');

_profile2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');

// Client
_client2['default'].ensureIndex('accountId');

_client2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');
_client2['default'].hasMany(_token2['default'], 'tokens', 'id', 'clientId');
_client2['default'].hasMany(_code2['default'], 'codes', 'id', 'clientId');

// Token
_token2['default'].ensureIndex('clientId');
_token2['default'].ensureIndex('accountId');

_token2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');
_token2['default'].belongsTo(_client2['default'], 'client', 'clientId', 'id');

// Code
_code2['default'].ensureIndex('clientId');
_code2['default'].ensureIndex('accountId');

_code2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');
_code2['default'].belongsTo(_client2['default'], 'client', 'clientId', 'id');

// Comment
_comment2['default'].ensureIndex('postId');

_comment2['default'].belongsTo(_post2['default'], 'post', 'postId', 'id');

// Post
_post2['default'].ensureIndex('accountId');

_post2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');
_post2['default'].hasMany(_comment2['default'], 'comments', 'id', 'postId');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozt1QkFBb0IsV0FBVzs7Ozt1QkFDWCxXQUFXOzs7O3NCQUVaLFVBQVU7Ozs7cUJBQ1gsU0FBUzs7OztvQkFDVixRQUFROzs7O3VCQUVMLFdBQVc7Ozs7b0JBQ2QsUUFBUTs7Ozs7O0FBR3pCLHFCQUFRLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFMUIscUJBQVEsTUFBTSx1QkFBVSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHFCQUFRLE9BQU8sb0JBQU8sT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFbEQscUJBQVEsT0FBTyxzQkFBUyxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHFCQUFRLE9BQU8scUJBQVEsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNwRCxxQkFBUSxPQUFPLG9CQUFPLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7OztBQUdsRCxxQkFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIscUJBQVEsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVqQyxxQkFBUSxTQUFTLHVCQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUd6RCxvQkFBTyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWhDLG9CQUFPLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxvQkFBTyxPQUFPLHFCQUFRLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbEQsb0JBQU8sT0FBTyxvQkFBTyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7QUFHaEQsbUJBQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlCLG1CQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFL0IsbUJBQU0sU0FBUyx1QkFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELG1CQUFNLFNBQVMsc0JBQVMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3BELGtCQUFLLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixrQkFBSyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTlCLGtCQUFLLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxrQkFBSyxTQUFTLHNCQUFTLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUduRCxxQkFBUSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTlCLHFCQUFRLFNBQVMsb0JBQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR2hELGtCQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFOUIsa0JBQUssU0FBUyx1QkFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RELGtCQUFLLE9BQU8sdUJBQVUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCc7XG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuL3Byb2ZpbGUnO1xuXG5pbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBUb2tlbiBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBDb2RlIGZyb20gJy4vY29kZSc7XG5cbmltcG9ydCBDb21tZW50IGZyb20gJy4vY29tbWVudCc7XG5pbXBvcnQgUG9zdCBmcm9tICcuL3Bvc3QnO1xuXG4vLyBBY2NvdW50XG5BY2NvdW50LmVuc3VyZUluZGV4KCdpZCcpO1xuXG5BY2NvdW50Lmhhc09uZShQcm9maWxlLCAncHJvZmlsZScsICdpZCcsICdhY2NvdW50SWQnKTtcbkFjY291bnQuaGFzTWFueShQb3N0LCAncG9zdHMnLCAnaWQnLCAnYWNjb3VudElkJyk7XG5cbkFjY291bnQuaGFzTWFueShDbGllbnQsICdjbGllbnRzJywgJ2lkJywgJ2FjY291bnRJZCcpO1xuQWNjb3VudC5oYXNNYW55KFRva2VuLCAndG9rZW5zJywgJ2lkJywgJ2FjY291bnRJZCcpO1xuQWNjb3VudC5oYXNNYW55KENvZGUsICdjb2RlcycsICdpZCcsICdhY2NvdW50SWQnKTtcblxuLy8gUHJvZmlsZVxuUHJvZmlsZS5lbnN1cmVJbmRleCgnaWQnKTtcblByb2ZpbGUuZW5zdXJlSW5kZXgoJ2FjY291bnRJZCcpO1xuXG5Qcm9maWxlLmJlbG9uZ3NUbyhBY2NvdW50LCAnYWNjb3VudCcsICdhY2NvdW50SWQnLCAnaWQnKTtcblxuLy8gQ2xpZW50XG5DbGllbnQuZW5zdXJlSW5kZXgoJ2FjY291bnRJZCcpO1xuXG5DbGllbnQuYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuQ2xpZW50Lmhhc01hbnkoVG9rZW4sICd0b2tlbnMnLCAnaWQnLCAnY2xpZW50SWQnKTtcbkNsaWVudC5oYXNNYW55KENvZGUsICdjb2RlcycsICdpZCcsICdjbGllbnRJZCcpO1xuXG4vLyBUb2tlblxuVG9rZW4uZW5zdXJlSW5kZXgoJ2NsaWVudElkJyk7XG5Ub2tlbi5lbnN1cmVJbmRleCgnYWNjb3VudElkJyk7XG5cblRva2VuLmJlbG9uZ3NUbyhBY2NvdW50LCAnYWNjb3VudCcsICdhY2NvdW50SWQnLCAnaWQnKTtcblRva2VuLmJlbG9uZ3NUbyhDbGllbnQsICdjbGllbnQnLCAnY2xpZW50SWQnLCAnaWQnKTtcblxuLy8gQ29kZVxuQ29kZS5lbnN1cmVJbmRleCgnY2xpZW50SWQnKTtcbkNvZGUuZW5zdXJlSW5kZXgoJ2FjY291bnRJZCcpO1xuXG5Db2RlLmJlbG9uZ3NUbyhBY2NvdW50LCAnYWNjb3VudCcsICdhY2NvdW50SWQnLCAnaWQnKTtcbkNvZGUuYmVsb25nc1RvKENsaWVudCwgJ2NsaWVudCcsICdjbGllbnRJZCcsICdpZCcpO1xuXG4vLyBDb21tZW50XG5Db21tZW50LmVuc3VyZUluZGV4KCdwb3N0SWQnKTtcblxuQ29tbWVudC5iZWxvbmdzVG8oUG9zdCwgJ3Bvc3QnLCAncG9zdElkJywgJ2lkJyk7XG5cbi8vIFBvc3RcblBvc3QuZW5zdXJlSW5kZXgoJ2FjY291bnRJZCcpO1xuXG5Qb3N0LmJlbG9uZ3NUbyhBY2NvdW50LCAnYWNjb3VudCcsICdhY2NvdW50SWQnLCAnaWQnKTtcblBvc3QuaGFzTWFueShDb21tZW50LCAnY29tbWVudHMnLCAnaWQnLCAncG9zdElkJyk7XG4iXX0=