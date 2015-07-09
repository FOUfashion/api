import Lab from 'lab';
import server from '../../server';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('HomeCtrl.index', function() {

  lab.test('returns basic info', function(done) {
    const options = {
      method: 'GET',
      url: '/'
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.instanceof(Object);

      expect(result.name).to.exist();
      expect(result.version).to.exist();
      expect(result.authenticated).to.exist();
      expect(result.received).to.exist();

      done();
    });
  });

});
