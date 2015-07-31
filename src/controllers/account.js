import crypt from '../helpers/crypt';

import Account from '../models/account';
import Profile from '../models/profile';

class AccountCtrl {

  async getAuthenticated(request, reply) {
    reply(await Account.find(request.auth.credentials.account.username));
  }

  async get(request, reply) {
    reply(await Account.find(request.params.id));
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

  async update(request, reply) {
    const account = await Account.find(request.params.id, false);

    if (request.payload.password) {
      account.password = await crypt.encryptPassword(request.payload.password);
      await account.save();
      delete account.password;
    }

    reply(account);
  }

  async delete(request, reply) {
    const account = await Account.find(request.params.id, false);
    await account.deleteAll();
    reply().status(204);
  }

}

export default AccountCtrl;
