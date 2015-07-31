'use strict';

var _bluebird = require('bluebird');

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

// Remove the password from the document
Account.defineStatic('withoutPassword', function () {
  return this.without('password');
});

// Query by id or username
Account.defineStatic('find', _bluebird.coroutine(function* (idOrUsername) {
  var join = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var withoutPassword = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  if (idOrUsername.includes('-')) {
    var _query = Account.filter({ id: idOrUsername });

    if (join) _query = _query.getJoin();
    if (withoutPassword) _query = _query.withoutPassword();

    var accounts = yield _query.run();

    if (accounts.length > 0) {
      return accounts[0];
    }
  }

  // Must be a username
  var query = Account.get(idOrUsername);

  if (join) query = query.getJoin();
  if (withoutPassword) query = query.withoutPassword();

  return yield query.run();
}));

exports['default'] = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYWNjb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUE4QixtQkFBbUI7Ozs7QUFFakQsSUFBTSxPQUFPLEdBQUcsMkJBQU8sV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUM1QyxJQUFFLEVBQUUsZUFIVSxJQUFJLENBR1QsTUFBTSxFQUFFLFdBQVEsQ0FBQyxlQUhOLENBQUMsQ0FHTyxJQUFJLEVBQUUsQ0FBQztBQUNuQyxVQUFRLEVBQUUsZUFKSSxJQUFJLENBSUgsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDNUQsVUFBUSxFQUFFLGVBTEksSUFBSSxDQUtILE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtBQUNsQyxXQUFTLEVBQUUsZUFORyxJQUFJLENBTUYsSUFBSSxFQUFFLFdBQVEsQ0FBQyxlQU5YLENBQUMsQ0FNWSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxFQUFFO0FBQ0QsSUFBRSxFQUFFLFVBQVU7Q0FDZixDQUFDLENBQUM7OztBQUdILE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsWUFBVztBQUNqRCxTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDakMsQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sc0JBQUUsV0FBZSxZQUFZLEVBQXVDO01BQXJDLElBQUkseURBQUcsSUFBSTtNQUFFLGVBQWUseURBQUcsSUFBSTs7QUFDM0YsTUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzlCLFFBQUksTUFBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQzs7QUFFakQsUUFBSSxJQUFJLEVBQUUsTUFBSyxHQUFHLE1BQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQyxRQUFJLGVBQWUsRUFBRSxNQUFLLEdBQUcsTUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOztBQUVyRCxRQUFNLFFBQVEsR0FBRyxNQUFNLE1BQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkMsUUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN2QixhQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwQjtHQUNGOzs7QUFHRCxNQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUV0QyxNQUFJLElBQUksRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xDLE1BQUksZUFBZSxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7O0FBRXJELFNBQU8sTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDMUIsRUFBQyxDQUFDOztxQkFFWSxPQUFPIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhpbmt5LCB7dHlwZSwgcn0gZnJvbSAnLi4vaGVscGVycy90aGlua3knO1xuXG5jb25zdCBBY2NvdW50ID0gdGhpbmt5LmNyZWF0ZU1vZGVsKCdBY2NvdW50Jywge1xuICBpZDogdHlwZS5zdHJpbmcoKS5kZWZhdWx0KHIudXVpZCgpKSxcbiAgdXNlcm5hbWU6IHR5cGUuc3RyaW5nKCkucmVxdWlyZWQoKS5hbHBoYW51bSgpLm1pbig0KS5tYXgoMTIpLFxuICBwYXNzd29yZDogdHlwZS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBjcmVhdGVkQXQ6IHR5cGUuZGF0ZSgpLmRlZmF1bHQoci5ub3coKSlcbn0sIHtcbiAgcGs6ICd1c2VybmFtZSdcbn0pO1xuXG4vLyBSZW1vdmUgdGhlIHBhc3N3b3JkIGZyb20gdGhlIGRvY3VtZW50XG5BY2NvdW50LmRlZmluZVN0YXRpYygnd2l0aG91dFBhc3N3b3JkJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLndpdGhvdXQoJ3Bhc3N3b3JkJyk7XG59KTtcblxuLy8gUXVlcnkgYnkgaWQgb3IgdXNlcm5hbWVcbkFjY291bnQuZGVmaW5lU3RhdGljKCdmaW5kJywgYXN5bmMgZnVuY3Rpb24oaWRPclVzZXJuYW1lLCBqb2luID0gdHJ1ZSwgd2l0aG91dFBhc3N3b3JkID0gdHJ1ZSkge1xuICBpZiAoaWRPclVzZXJuYW1lLmluY2x1ZGVzKCctJykpIHtcbiAgICBsZXQgcXVlcnkgPSBBY2NvdW50LmZpbHRlcih7IGlkOiBpZE9yVXNlcm5hbWUgfSk7XG5cbiAgICBpZiAoam9pbikgcXVlcnkgPSBxdWVyeS5nZXRKb2luKCk7XG4gICAgaWYgKHdpdGhvdXRQYXNzd29yZCkgcXVlcnkgPSBxdWVyeS53aXRob3V0UGFzc3dvcmQoKTtcblxuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgcXVlcnkucnVuKCk7XG5cbiAgICBpZiAoYWNjb3VudHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGFjY291bnRzWzBdO1xuICAgIH1cbiAgfVxuXG4gIC8vIE11c3QgYmUgYSB1c2VybmFtZVxuICBsZXQgcXVlcnkgPSBBY2NvdW50LmdldChpZE9yVXNlcm5hbWUpO1xuXG4gIGlmIChqb2luKSBxdWVyeSA9IHF1ZXJ5LmdldEpvaW4oKTtcbiAgaWYgKHdpdGhvdXRQYXNzd29yZCkgcXVlcnkgPSBxdWVyeS53aXRob3V0UGFzc3dvcmQoKTtcblxuICByZXR1cm4gYXdhaXQgcXVlcnkucnVuKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcbiJdfQ==