import crypt from '../helpers/crypt';

import Account from '../models/account';
import Profile from '../models/profile';

class AccountCtrl {

  getAuthenticated(request, reply) {
    reply(request.auth.credentials.account);
  }

  async get(request, reply) {
    const account = await Account.get(request.params.id).getJoin().run();
    reply(account);
  }

  async create(request, reply) {
    const encryptedPassword = await crypt.encryptPassword(request.payload.password);
    const account = new Account({
      username: request.payload.username,
      password: encryptedPassword,
      profile: new Profile({
        email: request.payload.email,
        name: {
          first: request.payload.firstName,
          last: request.payload.lastName
        }
      })
    });

    reply(await account.saveAll()).code(201);
  }

}

export default AccountCtrl;
