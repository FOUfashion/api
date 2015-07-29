import Boom from 'boom';

import crypt from '../helpers/crypt';
import scopes from '../helpers/scopes';

import Account from '../models/account';
import Client from '../models/client';
import Token from '../models/token';
import Code from '../models/code';

class AuthCtrl {

  async authorize(request, reply) {
    const scope = request.payload.scope.replace(/,*\s/g, ',').split(',');
    const client = await Client.get(request.payload.clientId).run();

    const code = await new Code({
      value: await crypt.generateCode(),
      accountId: client.accountId,
      clientId: client.id,
      scope: scope
    }).save();

    code.scope = code.scope.join(' ');
    reply(code);
  }

  async exchangeCode(request, reply) {
    const code = await Code.get(request.payload.code).run();
    if (code.used) {
      return reply(Boom.badRequest('Code already used'));
    }

    const client = await Client.get(request.payload.clientId).getJoin().run();
    if (client.secret !== request.payload.clientSecret) {
      return reply(Boom.badRequest('Invalid clientSecret'));
    }

    const token = await new Token({
      value: await crypt.generateToken(),
      accountId: client.accountId,
      clientId: client.id,
      scope: code.scope
    }).save();

    token.scope = token.scope.join(' ');
    reply(token);

    code.used = true;
    await code.save();
  }

  async exchangeCredentials(request, reply) {
    const account = await Account.get(request.payload.username).run();
    const matches = await crypt.passwordsMatch(account.password, request.payload.password);

    if (!matches) {
      return reply(Boom.unauthorized('Invalid password'));
    }

    const token = await new Token({
      value: await crypt.generateToken(),
      accountId: account.id,
      clientId: request.auth.credentials.client.id,
      scope: scopes.all
    }).save();

    token.scope = token.scope.join(' ');
    reply(token);
  }

}

export default AuthCtrl;
