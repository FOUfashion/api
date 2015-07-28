import Lab from 'lab';
import server from '../../server';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('ProfileCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[get] returns the correct profile by email', function(done) {
    const options = {
      method: 'GET',
      url: `/profile?email=${encodeURIComponent(data.profile.email)}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.email).to.equal(data.profile.email);

      done();
    });
  });

  lab.test('[get] returns 404 if not found by email', function(done) {
    const options = {
      method: 'GET',
      url: `/profile?email=${encodeURIComponent('not@found.com')}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

});
