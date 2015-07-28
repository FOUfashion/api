import crypt from '../helpers/crypt';

import Account from '../models/account';
import Profile from '../models/profile';

class AccountCtrl {

  getAuthenticated(request, reply) {
    reply(request.auth.credentials.account);
  }

  async get(request, reply) {
    const accounts = await Account.filter({ id: request.params.id }).getJoin().run();

    if (accounts.length > 0) {
      return reply(accounts[0]);
    }

    const account = await Account.get(request.params.id).getJoin().run();
    delete account.password;

    reply(account);
  }

  async create(request, reply) {
    const encryptedPassword = await crypt.encryptPassword(request.payload.password);
    const account = await new Account({
      username: request.payload.username,
      password: encryptedPassword,
      profile: new Profile({
        email: request.payload.email,
        name: {
          first: request.payload.firstName,
          last: request.payload.lastName
        }
      })
    }).saveAll();

    delete account.password;
    reply(account).code(201);
  }

}

export default AccountCtrl;
