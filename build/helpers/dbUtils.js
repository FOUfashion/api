'use strict';

var _bluebird = require('bluebird');

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var clearDatabase = _bluebird.coroutine(function* () {
  var tableList = _thinky.r.tableList();
  var tables = yield (0, _bluebird.promisify)(tableList.run, tableList)();

  yield _Promise.all(tables.map(function (table) {
    var del = _thinky.r.table(table)['delete']();
    return (0, _bluebird.promisify)(del.run, del)();
  }));
});

var _thinky = require('./thinky');

exports['default'] = {
  clearDatabase: clearDatabase
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RiVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUdlLGFBQWEsdUJBQTVCLGFBQStCO0FBQzdCLE1BQU0sU0FBUyxHQUFHLFFBSFosQ0FBQyxDQUdhLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FMZixTQUFTLEVBS2dCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7QUFFM0QscUJBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN6QixRQUFNLEdBQUcsR0FBRyxRQVBSLENBQUMsQ0FPUyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQU8sRUFBRSxDQUFDO0FBQ3BDLFdBQU8sY0FUSCxTQUFTLEVBU0ksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0dBQ2xDLENBQUMsQ0FBQSxDQUFDO0NBQ0o7O3NCQVZlLFVBQVU7O3FCQVlYO0FBQ2IsZUFBYSxFQUFiLGFBQWE7Q0FDZCIsImZpbGUiOiJkYlV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwcm9taXNpZnl9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7cn0gZnJvbSAnLi90aGlua3knO1xuXG5hc3luYyBmdW5jdGlvbiBjbGVhckRhdGFiYXNlKCkge1xuICBjb25zdCB0YWJsZUxpc3QgPSByLnRhYmxlTGlzdCgpO1xuICBjb25zdCB0YWJsZXMgPSBhd2FpdCBwcm9taXNpZnkodGFibGVMaXN0LnJ1biwgdGFibGVMaXN0KSgpO1xuXG4gIGF3YWl0KiB0YWJsZXMubWFwKHRhYmxlID0+IHtcbiAgICBjb25zdCBkZWwgPSByLnRhYmxlKHRhYmxlKS5kZWxldGUoKTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5KGRlbC5ydW4sIGRlbCkoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2xlYXJEYXRhYmFzZVxufTtcbiJdfQ==