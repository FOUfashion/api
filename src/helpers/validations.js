import Token from '../models/token';
import entities from './entities';

export default {
  bearer: async function(accessToken, callback) {
    try {
      const token = await Token.get(accessToken).getJoin().run();

      callback(null, true, {
        user: token.entity === entities.FIRST_PARTY,
        account: token.account,
        client: token.client,
        scope: token.scope,
        entity: token.entity
      });
    } catch (ex) {
      callback(ex);
    }
  }
};
