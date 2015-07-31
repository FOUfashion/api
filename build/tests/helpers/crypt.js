'use strict';

var _bluebird = require('bluebird');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lab = require('lab');

var _lab2 = _interopRequireDefault(_lab);

var _helpersCrypt = require('../../helpers/crypt');

var _helpersCrypt2 = _interopRequireDefault(_helpersCrypt);

var expect = _lab2['default'].assertions.expect;
var lab = _lab2['default'].script();

exports.lab = lab;
lab.experiment('Crypt Helper', function () {

  var dummyPass = 'salt:oTSX846k2MZdrrIy1rijbcWZvuHMyUAlTPlbqY1YCcd568J+Ii94u2nmpGLDdNimOfHBYxAP0g/e' + 'bvKJRt8bKE6u7j1+9EdsVUfWnHXE1TlPpYpFj2EF7OfDi7FxDCLYozWIhUr+lNZm5D69jbOl4GIGEPUpK/Ra0hRCErHPYZb' + '/2MJM4xzCXyd+Dc0a3Ya/l0HrwQ7dEXyFR1YGmbAQRzvviwbcP6sd+E/ksOEdPAzs0gf9JEzP1XoKZnxJ829T7Ig54LiQRYp' + '5JyNLz5deo5NtNqKkkz5pz+AzMymWnGA2GZDVQhyUN/IgKAN9INbyHgLuFgt9lozxxWmF9iVPOg==:100';

  lab.test('[encryptPassword] encrypts password correctly', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var result = yield _helpersCrypt2['default'].encryptPassword('secret', 'salt', 100);
      expect(result).to.equal(dummyPass);
    });

    exec().then(done.bind(null, null), done);
  });

  lab.test('[passwordsMatch] should return true for matching passwords', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var result = yield _helpersCrypt2['default'].passwordsMatch(dummyPass, 'secret');
      expect(result).to.be['true']();
    });

    exec().then(done.bind(null, null), done);
  });

  lab.test('[passwordsMatch] should return false for not matching passwords', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var result = yield _helpersCrypt2['default'].passwordsMatch(dummyPass, 'unmatch');
      expect(result).to.be['false']();
    });

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateToken] should return a random 128-bit token', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var token1 = yield _helpersCrypt2['default'].generateToken();
      var token2 = yield _helpersCrypt2['default'].generateToken();
      var token3 = yield _helpersCrypt2['default'].generateToken();

      expect(token1).not.to.equal(token2);
      expect(token1).not.to.equal(token3);
      expect(token2).not.to.equal(token3);

      expect(token1).to.have.length(32);
      expect(token2).to.have.length(32);
      expect(token3).to.have.length(32);
    });

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateCode] should return a random 96-bit code', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var code1 = yield _helpersCrypt2['default'].generateCode();
      var code2 = yield _helpersCrypt2['default'].generateCode();
      var code3 = yield _helpersCrypt2['default'].generateCode();

      expect(code1).not.to.equal(code2);
      expect(code1).not.to.equal(code3);
      expect(code2).not.to.equal(code3);

      expect(code1).to.have.length(24);
      expect(code2).to.have.length(24);
      expect(code3).to.have.length(24);
    });

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateSecret] should return a random 192-bit code', function (done) {
    var exec = _bluebird.coroutine(function* () {
      var secret1 = yield _helpersCrypt2['default'].generateSecret();
      var secret2 = yield _helpersCrypt2['default'].generateSecret();
      var secret3 = yield _helpersCrypt2['default'].generateSecret();

      expect(secret1).not.to.equal(secret2);
      expect(secret1).not.to.equal(secret3);
      expect(secret2).not.to.equal(secret3);

      expect(secret1).to.have.length(48);
      expect(secret2).to.have.length(48);
      expect(secret3).to.have.length(48);
    });

    exec().then(done.bind(null, null), done);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9oZWxwZXJzL2NyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7bUJBQWdCLEtBQUs7Ozs7NEJBQ0gscUJBQXFCOzs7O0FBRXZDLElBQU0sTUFBTSxHQUFHLGlCQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDOUIsSUFBTSxHQUFHLEdBQUcsaUJBQUksTUFBTSxFQUFFLENBQUM7OztBQUVoQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxZQUFXOztBQUV4QyxNQUFNLFNBQVMsR0FBRyxtRkFBbUYsR0FDbkcsaUdBQWlHLEdBQ2pHLGtHQUFrRyxHQUNsRyxtRkFBbUYsQ0FBQzs7QUFFdEYsS0FBRyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxVQUFTLElBQUksRUFBRTtRQUN4RCxJQUFJLHVCQUFuQixhQUFzQjtBQUNwQixVQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFNLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xFLFlBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3BDOztBQUVELFFBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUMxQyxDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLElBQUksQ0FBQyw0REFBNEQsRUFBRSxVQUFTLElBQUksRUFBRTtRQUNyRSxJQUFJLHVCQUFuQixhQUFzQjtBQUNwQixVQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFNLGNBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0QsWUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDO0tBQzdCOztBQUVELFFBQUksRUFBRSxDQUFDLElB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QUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUMxQyxDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoiY3J5cHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGFiIGZyb20gJ2xhYic7XG5pbXBvcnQgY3J5cHQgZnJvbSAnLi4vLi4vaGVscGVycy9jcnlwdCc7XG5cbmNvbnN0IGV4cGVjdCA9IExhYi5hc3NlcnRpb25zLmV4cGVjdDtcbmV4cG9ydCBjb25zdCBsYWIgPSBMYWIuc2NyaXB0KCk7XG5cbmxhYi5leHBlcmltZW50KCdDcnlwdCBIZWxwZXInLCBmdW5jdGlvbigpIHtcblxuICBjb25zdCBkdW1teVBhc3MgPSAnc2FsdDpvVFNYODQ2azJNWmRyckl5MXJpamJjV1p2dUhNeVVBbFRQbGJxWTFZQ2NkNTY4SitJaTk0dTJubXBHTERkTmltT2ZIQll4QVAwZy9lJyArXG4gICAgJ2J2S0pSdDhiS0U2dTdqMSs5RWRzVlVmV25IWEUxVGxQcFlwRmoyRUY3T2ZEaTdGeERDTFlveldJaFVyK2xOWm01RDY5amJPbDRHSUdFUFVwSy9SYTBoUkNFckhQWVpiJyArXG4gICAgJy8yTUpNNHh6Q1h5ZCtEYzBhM1lhL2wwSHJ3UTdkRVh5RlIxWUdtYkFRUnp2dml3YmNQNnNkK0Uva3NPRWRQQXpzMGdmOUpFelAxWG9LWm54SjgyOVQ3SWc1NExpUVJZcCcgK1xuICAgICc1SnlOTHo1ZGVvNU50TnFLa2t6NXB6K0F6TXltV25HQTJHWkRWUWh5VU4vSWdLQU45SU5ieUhnTHVGZ3Q5bG96eHhXbUY5aVZQT2c9PToxMDAnO1xuXG4gIGxhYi50ZXN0KCdbZW5jcnlwdFBhc3N3b3JkXSBlbmNyeXB0cyBwYXNzd29yZCBjb3JyZWN0bHknLCBmdW5jdGlvbihkb25lKSB7XG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlYygpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNyeXB0LmVuY3J5cHRQYXNzd29yZCgnc2VjcmV0JywgJ3NhbHQnLCAxMDApO1xuICAgICAgZXhwZWN0KHJlc3VsdCkudG8uZXF1YWwoZHVtbXlQYXNzKTtcbiAgICB9XG5cbiAgICBleGVjKCkudGhlbihkb25lLmJpbmQobnVsbCwgbnVsbCksIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW3Bhc3N3b3Jkc01hdGNoXSBzaG91bGQgcmV0dXJuIHRydWUgZm9yIG1hdGNoaW5nIHBhc3N3b3JkcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY3J5cHQucGFzc3dvcmRzTWF0Y2goZHVtbXlQYXNzLCAnc2VjcmV0Jyk7XG4gICAgICBleHBlY3QocmVzdWx0KS50by5iZS50cnVlKCk7XG4gICAgfVxuXG4gICAgZXhlYygpLnRoZW4oZG9uZS5iaW5kKG51bGwsIG51bGwpLCBkb25lKTtcbiAgfSk7XG5cbiAgbGFiLnRlc3QoJ1twYXNzd29yZHNNYXRjaF0gc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igbm90IG1hdGNoaW5nIHBhc3N3b3JkcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY3J5cHQucGFzc3dvcmRzTWF0Y2goZHVtbXlQYXNzLCAndW5tYXRjaCcpO1xuICAgICAgZXhwZWN0KHJlc3VsdCkudG8uYmUuZmFsc2UoKTtcbiAgICB9XG5cbiAgICBleGVjKCkudGhlbihkb25lLmJpbmQobnVsbCwgbnVsbCksIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dlbmVyYXRlVG9rZW5dIHNob3VsZCByZXR1cm4gYSByYW5kb20gMTI4LWJpdCB0b2tlbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgY29uc3QgdG9rZW4xID0gYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpO1xuICAgICAgY29uc3QgdG9rZW4yID0gYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpO1xuICAgICAgY29uc3QgdG9rZW4zID0gYXdhaXQgY3J5cHQuZ2VuZXJhdGVUb2tlbigpO1xuXG4gICAgICBleHBlY3QodG9rZW4xKS5ub3QudG8uZXF1YWwodG9rZW4yKTtcbiAgICAgIGV4cGVjdCh0b2tlbjEpLm5vdC50by5lcXVhbCh0b2tlbjMpO1xuICAgICAgZXhwZWN0KHRva2VuMikubm90LnRvLmVxdWFsKHRva2VuMyk7XG5cbiAgICAgIGV4cGVjdCh0b2tlbjEpLnRvLmhhdmUubGVuZ3RoKDMyKTtcbiAgICAgIGV4cGVjdCh0b2tlbjIpLnRvLmhhdmUubGVuZ3RoKDMyKTtcbiAgICAgIGV4cGVjdCh0b2tlbjMpLnRvLmhhdmUubGVuZ3RoKDMyKTtcbiAgICB9XG5cbiAgICBleGVjKCkudGhlbihkb25lLmJpbmQobnVsbCwgbnVsbCksIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dlbmVyYXRlQ29kZV0gc2hvdWxkIHJldHVybiBhIHJhbmRvbSA5Ni1iaXQgY29kZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgY29uc3QgY29kZTEgPSBhd2FpdCBjcnlwdC5nZW5lcmF0ZUNvZGUoKTtcbiAgICAgIGNvbnN0IGNvZGUyID0gYXdhaXQgY3J5cHQuZ2VuZXJhdGVDb2RlKCk7XG4gICAgICBjb25zdCBjb2RlMyA9IGF3YWl0IGNyeXB0LmdlbmVyYXRlQ29kZSgpO1xuXG4gICAgICBleHBlY3QoY29kZTEpLm5vdC50by5lcXVhbChjb2RlMik7XG4gICAgICBleHBlY3QoY29kZTEpLm5vdC50by5lcXVhbChjb2RlMyk7XG4gICAgICBleHBlY3QoY29kZTIpLm5vdC50by5lcXVhbChjb2RlMyk7XG5cbiAgICAgIGV4cGVjdChjb2RlMSkudG8uaGF2ZS5sZW5ndGgoMjQpO1xuICAgICAgZXhwZWN0KGNvZGUyKS50by5oYXZlLmxlbmd0aCgyNCk7XG4gICAgICBleHBlY3QoY29kZTMpLnRvLmhhdmUubGVuZ3RoKDI0KTtcbiAgICB9XG5cbiAgICBleGVjKCkudGhlbihkb25lLmJpbmQobnVsbCwgbnVsbCksIGRvbmUpO1xuICB9KTtcblxuICBsYWIudGVzdCgnW2dlbmVyYXRlU2VjcmV0XSBzaG91bGQgcmV0dXJuIGEgcmFuZG9tIDE5Mi1iaXQgY29kZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgY29uc3Qgc2VjcmV0MSA9IGF3YWl0IGNyeXB0LmdlbmVyYXRlU2VjcmV0KCk7XG4gICAgICBjb25zdCBzZWNyZXQyID0gYXdhaXQgY3J5cHQuZ2VuZXJhdGVTZWNyZXQoKTtcbiAgICAgIGNvbnN0IHNlY3JldDMgPSBhd2FpdCBjcnlwdC5nZW5lcmF0ZVNlY3JldCgpO1xuXG4gICAgICBleHBlY3Qoc2VjcmV0MSkubm90LnRvLmVxdWFsKHNlY3JldDIpO1xuICAgICAgZXhwZWN0KHNlY3JldDEpLm5vdC50by5lcXVhbChzZWNyZXQzKTtcbiAgICAgIGV4cGVjdChzZWNyZXQyKS5ub3QudG8uZXF1YWwoc2VjcmV0Myk7XG5cbiAgICAgIGV4cGVjdChzZWNyZXQxKS50by5oYXZlLmxlbmd0aCg0OCk7XG4gICAgICBleHBlY3Qoc2VjcmV0MikudG8uaGF2ZS5sZW5ndGgoNDgpO1xuICAgICAgZXhwZWN0KHNlY3JldDMpLnRvLmhhdmUubGVuZ3RoKDQ4KTtcbiAgICB9XG5cbiAgICBleGVjKCkudGhlbihkb25lLmJpbmQobnVsbCwgbnVsbCksIGRvbmUpO1xuICB9KTtcblxufSk7XG4iXX0=