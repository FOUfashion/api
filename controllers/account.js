import crypt from '../helpers/crypt';

import Account from '../models/account';
import Profile from '../models/profile';

class AccountCtrl {

  getAuthenticated(request, reply) {
    reply(request.auth.credentials.account);
  }

  async get(request, reply) {
    reply(await Account.get(request.params.id).getJoin().run());
  }

  async create(request, reply) {
    const account = new Account({
      username: request.payload.username,
      password: await crypt.encryptPassword(request.payload.password),
      profile: new Profile({
        email: request.payload.email
      })
    });

    reply(await account.saveAll()).code(201);
  }

}

export default AccountCtrl;
