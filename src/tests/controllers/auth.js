import Lab from 'lab';
import server from '../../server';

import faker from 'faker';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('AuthCtrl', function() {

  let oauthScope = 'test';
  let oauthCode = null;

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[logIn] returns the account on success', function(done) {
    const options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        username: data.tp.account.username,
        password: data.tp.account.unencryptedPassword
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.username).to.equal(data.tp.account.username);

      done();
    });
  });

  lab.test('[logIn] returns 401 for invalid username', function(done) {
    const options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        username: '133744',
        password: data.tp.account.unencryptedPassword
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[logIn] returns 401 for invalid password', function(done) {
    const options = {
      method: 'POST',
      url: '/login',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        username: data.tp.account.username,
        password: '133744'
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[authorize] returns an oauth code for exchange', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/authorize',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        scope: oauthScope,
        clientId: data.tp.client.id
      }
    };

    server.inject(options, function(response) {
      const result = response.result;
      oauthCode = result.value;

      expect(response.statusCode).to.equal(200);
      expect(result.clientId).to.equal(data.tp.client.id);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the secret is invalid', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        code: oauthCode,
        clientId: data.tp.client.id,
        clientSecret: 'ItsNotASecretIfYouToldEverybody'
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('[exchangeCode] returns a bearer token if the code is valid', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        code: oauthCode,
        clientId: data.tp.client.id,
        clientSecret: data.tp.client.secret
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.scope).to.equal(oauthScope);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the code is invalid', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        code: '10240',
        clientId: data.tp.client.id,
        clientSecret: data.tp.client.secret
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[exchangeCode] returns an error if the code has already been used', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/code',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        code: oauthCode,
        clientId: data.tp.client.id,
        clientSecret: data.tp.client.secret
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('[exchangeCredentials] returns a bearer token for valid credentials', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/credentials',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        username: data.tp.account.username,
        password: data.tp.account.unencryptedPassword
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.value).to.exist();

      done();
    });
  });

  lab.test('[exchangeCredentials] returns 401 for invalid password', function(done) {
    const options = {
      method: 'POST',
      url: '/oauth/exchange/credentials',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: {
        username: data.tp.account.username,
        password: '1337'
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

});
