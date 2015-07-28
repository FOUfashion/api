import Token from '../models/token';
import thinky from '../helpers/thinky';
import entities from './entities';

export default {
  bearer: async function(accessToken, callback) {
    try {
      const token = await Token.get(accessToken).getJoin().run();
      delete token.account.password;

      callback(null, true, {
        user: token.entity === entities.FIRST_PARTY,
        account: token.account,
        client: token.client,
        scope: token.scope,
        entity: token.entity
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
};
