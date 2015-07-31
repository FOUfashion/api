import Lab from 'lab';
import server from '../../server';

import dummy from '../dummy';
import data from '../data';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('CommentCtrl', function() {

  lab.before(done => {
    data.sync().then(done, done);
  });

  lab.test('[get] returns the correct comment by id', function(done) {
    const options = {
      method: 'GET',
      url: '/comment/' + data.comment1.id,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.body).to.equal(data.comment1.body);
      expect(result.id).to.equal(data.comment1.id);

      done();
    });
  });

  lab.test('[get] returns 404 for incorrect ids', function(done) {
    const options = {
      method: 'GET',
      url: '/comment/123-456',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[create] returns the comment object', function(done) {
    const options = {
      method: 'POST',
      url: `/post/${data.post1.id}/comment`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.comment()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(201);
      expect(result.body).to.equal(options.payload.body);
      expect(result.id).to.exist();

      done();
    });
  });

  lab.test('[create] returns 404 if post not found', function(done) {
    const options = {
      method: 'POST',
      url: '/comment',
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.comment({
        postId: '4123-3412'
      })
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('[update] returns 200 even if update is empty', function(done) {
    const options = {
      method: 'PUT',
      url: `/comment/${data.comment1.id}`,
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
      url: `/comment/${data.comment1.id}`,
      headers: {
        'Authorization': `Bearer ${data.fp.token.value}`
      },
      payload: dummy.comment()
    };

    server.inject(options, function(response) {
      const result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result.body).to.equal(options.payload.body);

      done();
    });
  });

  lab.test('[update] returns 401 when trying to update someone else\'s comment', function(done) {
    const options = {
      method: 'PUT',
      url: `/comment/${data.comment1.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      },
      payload: dummy.comment()
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('[delete] returns 204 when deleted', function(done) {
    const options = {
      method: 'DELETE',
      url: `/comment/${data.comment2.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      }
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });

  lab.test('[delete] returns 401 when trying to delete someone else\'s comment', function(done) {
    const options = {
      method: 'DELETE',
      url: `/comment/${data.comment1.id}`,
      headers: {
        'Authorization': `Bearer ${data.tp.token.value}`
      },
      payload: dummy.comment()
    };

    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

});
