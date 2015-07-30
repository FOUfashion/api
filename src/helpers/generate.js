import crypt from './crypt';
import scopes from './scopes';

import Account from '../models/account';
import Profile from '../models/profile';
import Client from '../models/client';
import Token from '../models/token';

export default {

  account: async function(username, password) {
    return await new Account({
      username: username,
      password: await crypt.encryptPassword(password)
    }).save();
  },

  profile: async function(accountId, email, name) {
    return await new Profile({ accountId, email, name }).save();
  },

  client: async function(name, accountId) {
    return await new Client({
      name: name,
      secret: await crypt.generateSecret(),
      accountId: accountId
    }).save();
  },

  token: async function(accountId, clientId, scope) {
    return await new Token({
      value: await crypt.generateToken(),
      accountId: accountId,
      clientId: clientId,
      scope: scope
    }).save();
  },

  firstPartyCredentials: async function(username, password, name) {
    const account = await this.account(username, password);
    const client = await this.client(name, account.id);
    const token = await this.token(account.id, client.id, [scopes.FIRST_PARTY]);

    return {
      account,
      client,
      token
    };
  },

  thirdPartyCredentials: async function(username, password, name) {
    const account = await this.account(username, password);
    const client = await this.client(name, account.id);
    const token = await this.token(account.id, client.id, [scopes.THIRD_PARTY]);

    return {
      account,
      client,
      token
    };
  }

};
