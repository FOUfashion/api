import Lab from 'lab';
import server from '../../server';

import dummy from '../dummy';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('PostCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[get] returns the correct post by id', function(done) {
    const options = {
      method: 'GET',
      url: '/post/' + data.post1.id,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.body).to.equal(data.post1.body);
      expect(result.id).to.equal(data.post1.id);

      done();
    });
  });

  lab.test('[get] returns 404 for incorrect ids', function(done) {
    const options = {
      method: 'GET',
      url: '/post/123-456',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[create] returns the post object', function(done) {
    const options = {
      method: 'POST',
      url: '/post',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.post()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.body).to.equal(options.payload.body);
      expect(result.id).to.exist();

      done();
    });
  });

  lab.test('[update] returns 200 even if update is empty', function(done) {
    const options = {
      method: 'PUT',
      url: `/post/${data.post1.id}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('[update] returns the new body when updated', function(done) {
    const options = {
      method: 'PUT',
      url: `/post/${data.post1.id}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.post()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.body).to.equal(options.payload.body);

      done();
    });
  });

  lab.test('[update] returns 401 when trying to update someone else\'s post', function(done) {
    const options = {
      method: 'PUT',
      url: `/post/${data.post1.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      },
      payload: dummy.post()
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[delete] returns 204 when deleted', function(done) {
    const options = {
      method: 'DELETE',
      url: `/post/${data.post2.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });

  lab.test('[delete] returns 401 when trying to delete someone else\'s post', function(done) {
    const options = {
      method: 'DELETE',
      url: `/post/${data.post1.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      },
      payload: dummy.post()
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

});
