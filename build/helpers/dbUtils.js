'use strict';

var _bluebird = require('bluebird');

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var clearDatabase = _bluebird.coroutine(function* () {
  var tableList = _thinky.r.tableList();
  var tables = yield (0, _bluebird.promisify)(tableList.run, tableList)();

  // $lab:coverage:off$
  yield _Promise.all(tables.map(function (table) {
    var del = _thinky.r.table(table)['delete']();
    return (0, _bluebird.promisify)(del.run, del)();
  }));
  // $lab:coverage:on$
});

var _thinky = require('./thinky');

exports['default'] = {
  clearDatabase: clearDatabase
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RiVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUdlLGFBQWEsdUJBQTVCLGFBQStCO0FBQzdCLE1BQU0sU0FBUyxHQUFHLFFBSFosQ0FBQyxDQUdhLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FMZixTQUFTLEVBS2dCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7O0FBRzNELHFCQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDekIsUUFBTSxHQUFHLEdBQUcsUUFSUixDQUFDLENBUVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFPLEVBQUUsQ0FBQztBQUNwQyxXQUFPLGNBVkgsU0FBUyxFQVVJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztHQUNsQyxDQUFDLENBQUEsQ0FBQzs7Q0FFSjs7c0JBWmUsVUFBVTs7cUJBY1g7QUFDYixlQUFhLEVBQWIsYUFBYTtDQUNkIiwiZmlsZSI6ImRiVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb21pc2lmeX0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtyfSBmcm9tICcuL3RoaW5reSc7XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFyRGF0YWJhc2UoKSB7XG4gIGNvbnN0IHRhYmxlTGlzdCA9IHIudGFibGVMaXN0KCk7XG4gIGNvbnN0IHRhYmxlcyA9IGF3YWl0IHByb21pc2lmeSh0YWJsZUxpc3QucnVuLCB0YWJsZUxpc3QpKCk7XG5cbiAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gIGF3YWl0KiB0YWJsZXMubWFwKHRhYmxlID0+IHtcbiAgICBjb25zdCBkZWwgPSByLnRhYmxlKHRhYmxlKS5kZWxldGUoKTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5KGRlbC5ydW4sIGRlbCkoKTtcbiAgfSk7XG4gIC8vICRsYWI6Y292ZXJhZ2U6b24kXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2xlYXJEYXRhYmFzZVxufTtcbiJdfQ==