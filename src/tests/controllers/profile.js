import Lab from 'lab';
import server from '../../server';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('ProfileCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[get] returns the correct profile by id', function(done) {
    const options = {
      method: 'GET',
      url: `/profile/${data.tp.account.profile.id}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    console.log(data.fp.token.value);

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.id).to.equal(data.tp.account.profile.id);

      done();
    });
  });

  lab.test('[get] returns the correct profile by email', function(done) {
    const options = {
      method: 'GET',
      url: `/profile/${encodeURIComponent(data.tp.account.profile.email)}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.email).to.equal(data.tp.account.profile.email);

      done();
    });
  });

  lab.test('[get] returns 404 if not found by id', function(done) {
    const options = {
      method: 'GET',
      url: `/profile/123-456`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[get] returns 404 if not found by email', function(done) {
    const options = {
      method: 'GET',
      url: `/profile/${encodeURIComponent('not@found.com')}`,
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
