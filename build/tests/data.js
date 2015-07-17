'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersGenerate = require('../helpers/generate');

var _helpersGenerate2 = _interopRequireDefault(_helpersGenerate);

var _helpersDbUtils = require('../helpers/dbUtils');

var _helpersDbUtils2 = _interopRequireDefault(_helpersDbUtils);

var data = {};
var synced = false;

/**
 * This module serves as a common pool of documents and credentials to be used in tests.
 * Sync makes sure those resources are loaded before being used.
 */
data.sync = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!synced) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return');

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_helpersDbUtils2['default'].clearDatabase());

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_helpersGenerate2['default'].firstPartyCredentials('fpusername', 'fp_password', 'fp_name'));

      case 6:
        this.fp = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_helpersGenerate2['default'].thirdPartyCredentials('tpusername', 'tp_password', 'tp_name'));

      case 9:
        this.tp = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_helpersGenerate2['default'].account('testuser', 'testpass'));

      case 12:
        this.account = context$1$0.sent;

        this.account.unencryptedPassword = 'testpass';
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(_helpersGenerate2['default'].client('testclient', this.account.id));

      case 16:
        this.client = context$1$0.sent;

        synced = true;

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7K0JBQXFCLHFCQUFxQjs7Ozs4QkFDdEIsb0JBQW9COzs7O0FBRXhDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1uQixJQUFJLENBQUMsSUFBSSxHQUFHOzs7O2FBQ04sTUFBTTs7Ozs7Ozs7O3lDQUlKLDRCQUFRLGFBQWEsRUFBRTs7Ozt5Q0FFYiw2QkFBUyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQzs7O0FBQXRGLFlBQUksQ0FBQyxFQUFFOzt5Q0FDUyw2QkFBUyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQzs7O0FBQXRGLFlBQUksQ0FBQyxFQUFFOzt5Q0FFYyw2QkFBUyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzs7O0FBQTdELFlBQUksQ0FBQyxPQUFPOztBQUNaLFlBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDOzt5Q0FDMUIsNkJBQVMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7O0FBQWxFLFlBQUksQ0FBQyxNQUFNOztBQUVYLGNBQU0sR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Q0FDZixDQUFDOztxQkFFYSxJQUFJIiwiZmlsZSI6ImRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2VuZXJhdGUgZnJvbSAnLi4vaGVscGVycy9nZW5lcmF0ZSc7XG5pbXBvcnQgZGJVdGlscyBmcm9tICcuLi9oZWxwZXJzL2RiVXRpbHMnO1xuXG5jb25zdCBkYXRhID0ge307XG5sZXQgc3luY2VkID0gZmFsc2U7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgc2VydmVzIGFzIGEgY29tbW9uIHBvb2wgb2YgZG9jdW1lbnRzIGFuZCBjcmVkZW50aWFscyB0byBiZSB1c2VkIGluIHRlc3RzLlxuICogU3luYyBtYWtlcyBzdXJlIHRob3NlIHJlc291cmNlcyBhcmUgbG9hZGVkIGJlZm9yZSBiZWluZyB1c2VkLlxuICovXG5kYXRhLnN5bmMgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgaWYgKHN5bmNlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IGRiVXRpbHMuY2xlYXJEYXRhYmFzZSgpO1xuXG4gIHRoaXMuZnAgPSBhd2FpdCBnZW5lcmF0ZS5maXJzdFBhcnR5Q3JlZGVudGlhbHMoJ2ZwdXNlcm5hbWUnLCAnZnBfcGFzc3dvcmQnLCAnZnBfbmFtZScpO1xuICB0aGlzLnRwID0gYXdhaXQgZ2VuZXJhdGUudGhpcmRQYXJ0eUNyZWRlbnRpYWxzKCd0cHVzZXJuYW1lJywgJ3RwX3Bhc3N3b3JkJywgJ3RwX25hbWUnKTtcblxuICB0aGlzLmFjY291bnQgPSBhd2FpdCBnZW5lcmF0ZS5hY2NvdW50KCd0ZXN0dXNlcicsICd0ZXN0cGFzcycpO1xuICB0aGlzLmFjY291bnQudW5lbmNyeXB0ZWRQYXNzd29yZCA9ICd0ZXN0cGFzcyc7XG4gIHRoaXMuY2xpZW50ID0gYXdhaXQgZ2VuZXJhdGUuY2xpZW50KCd0ZXN0Y2xpZW50JywgdGhpcy5hY2NvdW50LmlkKTtcblxuICBzeW5jZWQgPSB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YTtcbiJdfQ==