import thinky from '../helpers/thinky';
import Boom from 'boom';

import Token from '../models/token';
import Comment from '../models/comment';
import Post from '../models/post';

const strategies = [{
  name: 'bearer',
  scheme: 'bearer-access-token',
  options: {
    validateFunc: async function(accessToken, callback) {
      try {
        const token = await Token.get(accessToken).getJoin({ account: { profile: true }, client: true }).run();
        delete token.account.password;

        callback(null, true, {
          account: token.account,
          client: token.client,
          scope: token.scope
        });
      } catch (error) {
        // $lab:coverage:off$
        if (error instanceof thinky.Errors.DocumentNotFound) {
          callback(null, false);
        } else {
          callback(error);
        }
        // $lab:coverage:on$
      }
    }
  }
}, {
  name: 'ownership',
  scheme: 'ownership-access',
  options: {
    companionStrategy: 'bearer',
    rules: {
      // Yep, connected to the other magical weird Gandalf-knows-why stuff.
      // Keep reading if you don't understand this.
      //
      // profile: function(request, credentials, callback) {
      //   const matchesEmail = request.params.id === credentials.profile.email;
      //   const matchesId = request.params.id === credentials.account.profile.id;
      //   callback(null, matchesEmail || matchesId);
      // },

      comment: async function(request, credentials, callback) {
        try {
          const comment = await Comment.get(request.params.id).getJoin({ post: true }).run();
          callback(null, comment.post.accountId === credentials.account.id);
        } catch (error) {
          // $lab:coverage:off$
          if (error instanceof thinky.Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
            const docNameRegex = /.*r\.table\("(.+?)"\).*/gm;
            const matches = docNameRegex.exec(error.message);
            const docName = matches && matches[1] || 'Document';
            callback(Boom.notFound(`${docName} not found`), false);
          } else {
            callback(error, false);
          }
          // $lab:coverage:on$
        }
      },

      post: async function(request, credentials, callback) {
        try {
          const post = await Post.get(request.params.id).run();
          callback(null, post.accountId === credentials.account.id);
        } catch (error) {
          // $lab:coverage:off$
          if (error instanceof thinky.Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
            const docNameRegex = /.*r\.table\("(.+?)"\).*/gm;
            const matches = docNameRegex.exec(error.message);
            const docName = matches && matches[1] || 'Document';
            callback(Boom.notFound(`${docName} not found`), false);
          } else {
            callback(error, false);
          }
          // $lab:coverage:on$
        }
      }
    }
  }
}];

export default strategies;
