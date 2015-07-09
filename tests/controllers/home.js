import Lab from 'lab';
import server from '../../server';

export const lab = Lab.script();

lab.experiment('[Ctrl] Home', function() {

  lab.test('main endpoint should return basic info', function(done) {
    const options = {
      method: 'GET',
      url: '/'
    };

    server.inject(options, function(response) {
      const result = response.result;

      lab.expect(response.statusCode).to.equal(200);
      lab.expect(result).to.be.an('object');

      lab.expect(result).to.have.property('name');
      lab.expect(result).to.have.property('version');
      lab.expect(result).to.have.property('authenticated');
      lab.expect(result).to.have.property('received');

      done();
    });
  });

});
