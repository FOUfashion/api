import crypt from './crypt';
import scopes from './scopes';

import Account from '../models/account';
import Profile from '../models/profile';
import Client from '../models/client';
import Token from '../models/token';

export default {

  account: async function(username, password, profile) {
    return await new Account({
      username: username,
      password: await crypt.encryptPassword(password),
      profile: profile
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

  firstPartyCredentials: function(data) {
    return this.credentials([scopes.FIRST_PARTY], data);
  },

  thirdPartyCredentials: function(data) {
    return this.credentials([scopes.THIRD_PARTY], data);
  },

  credentials: async function(scope, { username, password, clientName, profile }) {
    const account = await this.account(username, password, profile);
    account.unencryptedPassword = password;

    const client = await this.client(clientName, account.id);
    const token = await this.token(account.id, client.id, scope);

    return {
      account,
      client,
      token
    };
  }

};
