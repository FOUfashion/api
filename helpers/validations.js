import crypt from '../helpers/crypt';

import Token from '../models/token';

export default {
  bearer: async function(accessToken, callback) {
    try {
      let token = await Token.get(await crypt.encryptToken(accessToken)).getJoin().run();

      callback(null, true, {
        credentials: {
          account: token.account,
          client: token.client,
          scope: token.scope,
          entity: token.entity
        }
      });
    } catch (ex) {
      callback(ex, false);
    }
  }
};
