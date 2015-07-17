import Lab from 'lab';
import server from '../../server';

import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('HomeCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[index] returns basic info', function(done) {
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

  lab.test('[index] returns authenticated=true if given a valid bearer', function(done) {
    const options = {
      method: 'GET',
      url: '/',
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.instanceof(Object);

      expect(result.name).to.exist();
      expect(result.version).to.exist();
      expect(result.authenticated).to.equal(true);
      expect(result.received).to.exist();

      done();
    });
  });

  lab.test('[index] returns authenticated=false if given an invalid bearer', function(done) {
    const options = {
      method: 'GET',
      url: '/',
      headers: {
        'Authorization': `Bearer 123`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an.instanceof(Object);

      expect(result.name).to.exist();
      expect(result.version).to.exist();
      expect(result.authenticated).to.equal(false);
      expect(result.received).to.exist();

      done();
    });
  });

});
