import crypt from '../helpers/crypt';

import Account from '../models/account';
import Profile from '../models/profile';

class AccountCtrl {

  async getAuthenticated(request, reply) {
    const account = await Account
      .get(request.auth.credentials.account.username)
      .getJoin({ profile: true })
      .run();

    delete account.password;
    reply(account);
  }

  async get(request, reply) {
    const idOrUsername = request.params.id;
    let account;

    if (idOrUsername.includes('-')) {
      account = await Account
        .filter({ id: idOrUsername })
        .getJoin({ profile: true })
        .nth(0)
        .run();
    } else {
      account = await Account
        .get(idOrUsername)
        .getJoin({ profile: true })
        .run();
    }

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

  async update(request, reply) {
    const idOrUsername = request.params.id;
    let account;

    if (idOrUsername.includes('-')) {
      account = await Account.filter({ id: idOrUsername }).nth(0).run();
    } else {
      account = await Account.get(idOrUsername).run();
    }

    if (request.payload.password) {
      account.password = await crypt.encryptPassword(request.payload.password);
      await account.save();
    }

    delete account.password;
    reply(account);
  }

  async delete(request, reply) {
    const idOrUsername = request.params.id;
    let account;

    if (idOrUsername.includes('-')) {
      account = await Account.filter({ id: idOrUsername }).nth(0).run();
    } else {
      account = await Account.get(idOrUsername).run();
    }

    await account.deleteAll();
    reply().status(204);
  }

}

export default AccountCtrl;
