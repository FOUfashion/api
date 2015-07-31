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
_comment2['default'].ensureIndex('accountId');

_comment2['default'].belongsTo(_post2['default'], 'post', 'postId', 'id');
_comment2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');

// Post
_post2['default'].ensureIndex('accountId');

_post2['default'].belongsTo(_account2['default'], 'account', 'accountId', 'id');
_post2['default'].hasMany(_comment2['default'], 'comments', 'id', 'postId');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozt1QkFBb0IsV0FBVzs7Ozt1QkFDWCxXQUFXOzs7O3NCQUVaLFVBQVU7Ozs7cUJBQ1gsU0FBUzs7OztvQkFDVixRQUFROzs7O3VCQUVMLFdBQVc7Ozs7b0JBQ2QsUUFBUTs7Ozs7O0FBR3pCLHFCQUFRLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFMUIscUJBQVEsTUFBTSx1QkFBVSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHFCQUFRLE9BQU8sb0JBQU8sT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFbEQscUJBQVEsT0FBTyxzQkFBUyxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHFCQUFRLE9BQU8scUJBQVEsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNwRCxxQkFBUSxPQUFPLG9CQUFPLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7OztBQUdsRCxxQkFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIscUJBQVEsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVqQyxxQkFBUSxTQUFTLHVCQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUd6RCxvQkFBTyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWhDLG9CQUFPLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxvQkFBTyxPQUFPLHFCQUFRLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbEQsb0JBQU8sT0FBTyxvQkFBTyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7QUFHaEQsbUJBQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlCLG1CQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFL0IsbUJBQU0sU0FBUyx1QkFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELG1CQUFNLFNBQVMsc0JBQVMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3BELGtCQUFLLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixrQkFBSyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTlCLGtCQUFLLFNBQVMsdUJBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxrQkFBSyxTQUFTLHNCQUFTLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUduRCxxQkFBUSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIscUJBQVEsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVqQyxxQkFBUSxTQUFTLG9CQUFPLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQscUJBQVEsU0FBUyx1QkFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7QUFHekQsa0JBQUssV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUU5QixrQkFBSyxTQUFTLHVCQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEQsa0JBQUssT0FBTyx1QkFBVSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50JztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4vcHJvZmlsZSc7XG5cbmltcG9ydCBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IFRva2VuIGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IENvZGUgZnJvbSAnLi9jb2RlJztcblxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCBQb3N0IGZyb20gJy4vcG9zdCc7XG5cbi8vIEFjY291bnRcbkFjY291bnQuZW5zdXJlSW5kZXgoJ2lkJyk7XG5cbkFjY291bnQuaGFzT25lKFByb2ZpbGUsICdwcm9maWxlJywgJ2lkJywgJ2FjY291bnRJZCcpO1xuQWNjb3VudC5oYXNNYW55KFBvc3QsICdwb3N0cycsICdpZCcsICdhY2NvdW50SWQnKTtcblxuQWNjb3VudC5oYXNNYW55KENsaWVudCwgJ2NsaWVudHMnLCAnaWQnLCAnYWNjb3VudElkJyk7XG5BY2NvdW50Lmhhc01hbnkoVG9rZW4sICd0b2tlbnMnLCAnaWQnLCAnYWNjb3VudElkJyk7XG5BY2NvdW50Lmhhc01hbnkoQ29kZSwgJ2NvZGVzJywgJ2lkJywgJ2FjY291bnRJZCcpO1xuXG4vLyBQcm9maWxlXG5Qcm9maWxlLmVuc3VyZUluZGV4KCdpZCcpO1xuUHJvZmlsZS5lbnN1cmVJbmRleCgnYWNjb3VudElkJyk7XG5cblByb2ZpbGUuYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuXG4vLyBDbGllbnRcbkNsaWVudC5lbnN1cmVJbmRleCgnYWNjb3VudElkJyk7XG5cbkNsaWVudC5iZWxvbmdzVG8oQWNjb3VudCwgJ2FjY291bnQnLCAnYWNjb3VudElkJywgJ2lkJyk7XG5DbGllbnQuaGFzTWFueShUb2tlbiwgJ3Rva2VucycsICdpZCcsICdjbGllbnRJZCcpO1xuQ2xpZW50Lmhhc01hbnkoQ29kZSwgJ2NvZGVzJywgJ2lkJywgJ2NsaWVudElkJyk7XG5cbi8vIFRva2VuXG5Ub2tlbi5lbnN1cmVJbmRleCgnY2xpZW50SWQnKTtcblRva2VuLmVuc3VyZUluZGV4KCdhY2NvdW50SWQnKTtcblxuVG9rZW4uYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuVG9rZW4uYmVsb25nc1RvKENsaWVudCwgJ2NsaWVudCcsICdjbGllbnRJZCcsICdpZCcpO1xuXG4vLyBDb2RlXG5Db2RlLmVuc3VyZUluZGV4KCdjbGllbnRJZCcpO1xuQ29kZS5lbnN1cmVJbmRleCgnYWNjb3VudElkJyk7XG5cbkNvZGUuYmVsb25nc1RvKEFjY291bnQsICdhY2NvdW50JywgJ2FjY291bnRJZCcsICdpZCcpO1xuQ29kZS5iZWxvbmdzVG8oQ2xpZW50LCAnY2xpZW50JywgJ2NsaWVudElkJywgJ2lkJyk7XG5cbi8vIENvbW1lbnRcbkNvbW1lbnQuZW5zdXJlSW5kZXgoJ3Bvc3RJZCcpO1xuQ29tbWVudC5lbnN1cmVJbmRleCgnYWNjb3VudElkJyk7XG5cbkNvbW1lbnQuYmVsb25nc1RvKFBvc3QsICdwb3N0JywgJ3Bvc3RJZCcsICdpZCcpO1xuQ29tbWVudC5iZWxvbmdzVG8oQWNjb3VudCwgJ2FjY291bnQnLCAnYWNjb3VudElkJywgJ2lkJyk7XG5cbi8vIFBvc3RcblBvc3QuZW5zdXJlSW5kZXgoJ2FjY291bnRJZCcpO1xuXG5Qb3N0LmJlbG9uZ3NUbyhBY2NvdW50LCAnYWNjb3VudCcsICdhY2NvdW50SWQnLCAnaWQnKTtcblBvc3QuaGFzTWFueShDb21tZW50LCAnY29tbWVudHMnLCAnaWQnLCAncG9zdElkJyk7XG4iXX0=