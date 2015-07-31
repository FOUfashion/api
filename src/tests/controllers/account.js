import Lab from 'lab';
import server from '../../server';

import dummy from '../dummy';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('AccountCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[getAuthenticated] returns the current account', function(done) {
    const options = {
      method: 'GET',
      url: '/account',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.equal(data.fp.account.username);
      expect(result.password).to.be.undefined();

      done();
    });
  });

  lab.test('[getAuthenticated] returns 401 without a token', function(done) {
    const options = {
      method: 'GET',
      url: '/account'
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[get] returns the correct account by id', function(done) {
    const options = {
      method: 'GET',
      url: '/account/' + data.tp.account.id,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.id).to.equal(data.tp.account.id);

      done();
    });
  });

  lab.test('[get] returns the correct account by username', function(done) {
    const options = {
      method: 'GET',
      url: '/account/' + data.tp.account.username,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.equal(data.tp.account.username);

      done();
    });
  });

  lab.test('[get] returns 404 if not found', function(done) {
    const options = {
      method: 'GET',
      url: '/account/000000',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[create] returns the account object', function(done) {
    const options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.account()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.username).to.equal(options.payload.username);
      expect(result.password).to.be.undefined();
      expect(result.id).to.exist();

      done();
    });
  });

  lab.test('[create] returns the profile too', function(done) {
    const options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.account()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.profile.email).to.equal(options.payload.email);
      expect(result.profile.id).to.exist();

      done();
    });
  });

  lab.test('[create] returns 401 for third parties', function(done) {
    const options = {
      method: 'POST',
      url: '/account',
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      },
      payload: dummy.account()
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(403);
      done();
    });
  });

});
