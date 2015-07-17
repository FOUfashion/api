'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var _thinky = require('./thinky');

function clearDatabase() {
  var tableList, tables;
  return _regeneratorRuntime.async(function clearDatabase$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        tableList = _thinky.r.tableList();
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _bluebird.promisify)(tableList.run, tableList)());

      case 3:
        tables = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_Promise.all(tables.map(function (table) {
          var del = _thinky.r.table(table)['delete']();
          return (0, _bluebird.promisify)(del.run, del)();
        })));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = {
  clearDatabase: clearDatabase
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RiVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozt3QkFBd0IsVUFBVTs7c0JBQ2xCLFVBQVU7O0FBRTFCLFNBQWUsYUFBYTtNQUNwQixTQUFTLEVBQ1QsTUFBTTs7OztBQUROLGlCQUFTLEdBQUcsUUFIWixDQUFDLENBR2EsU0FBUyxFQUFFOzt5Q0FDVixjQUxmLFNBQVMsRUFLZ0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTs7O0FBQXBELGNBQU07O3NEQUVMLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDekIsY0FBTSxHQUFHLEdBQUcsUUFQUixDQUFDLENBT1MsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFPLEVBQUUsQ0FBQztBQUNwQyxpQkFBTyxjQVRILFNBQVMsRUFTSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbEMsQ0FBQzs7Ozs7OztDQUNIOztxQkFFYztBQUNiLGVBQWEsRUFBYixhQUFhO0NBQ2QiLCJmaWxlIjoiZGJVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cHJvbWlzaWZ5fSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge3J9IGZyb20gJy4vdGhpbmt5JztcblxuYXN5bmMgZnVuY3Rpb24gY2xlYXJEYXRhYmFzZSgpIHtcbiAgY29uc3QgdGFibGVMaXN0ID0gci50YWJsZUxpc3QoKTtcbiAgY29uc3QgdGFibGVzID0gYXdhaXQgcHJvbWlzaWZ5KHRhYmxlTGlzdC5ydW4sIHRhYmxlTGlzdCkoKTtcblxuICBhd2FpdCogdGFibGVzLm1hcCh0YWJsZSA9PiB7XG4gICAgY29uc3QgZGVsID0gci50YWJsZSh0YWJsZSkuZGVsZXRlKCk7XG4gICAgcmV0dXJuIHByb21pc2lmeShkZWwucnVuLCBkZWwpKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNsZWFyRGF0YWJhc2Vcbn07XG4iXX0=