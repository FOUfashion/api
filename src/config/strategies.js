import Token from '../models/token';
import thinky from '../helpers/thinky';

import Comment from '../models/comment';
import Post from '../models/post';

const strategies = [{
  name: 'bearer',
  scheme: 'bearer-access-token',
  mode: 'required',
  options: {
    validateFunc: async function(accessToken, callback) {
      try {
        const token = await Token.get(accessToken).getJoin().run();
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
  },
}, {
  name: 'ownership',
  scheme: 'ownership-access',
  mode: 'required',
  options: {
    rules: {
      account: async function(request, credentials, callback) {
        const matchesUsername = request.params.id === credentials.account.username;
        const matchesId = request.params.id === credentials.account.id;
        callback(null, matchesUsername || matchesId);
      },
      profile: async function(request, credentials, callback) {
        const matchesEmail = request.params.id === credentials.profile.email;
        const matchesId = request.params.id === credentials.profile.id;
        callback(null, matchesEmail || matchesId);
      },
      comment: async function(request, credentials, callback) {
        const commentId = request.params.id || request.payload.commentId;
        const comment = await Comment.get(commentId).run();
        callback(null, comment.post.accountId === credentials.profile.id);
      },
      post: async function(request, credentials, callback) {
        const postId = request.params.id || request.payload.postId;
        const post = await Post.get(postId).run();
        callback(null, post.accountId === credentials.profile.id);
      }
    }
  },
}];

strategies.defaults = ['bearer', 'ownership'];
export default strategies;
