import Vantage from 'vantage';

import crypt from './crypt';
import scopes from './scopes';
import entities from './entities';

import Account from '../models/account';
import Client from '../models/client';
import Token from '../models/token';

const cli = new Vantage()
cli.delimiter('api~$');

cli
  .command('account')
  .option('-u, --username <username>', 'Account username.')
  .description('Create a new Account.')
  .action(async function(args) {
    const password = await new Promise(resolve => {
      this.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter a password for the account',
      }, resolve);
    });

    console.log('Doc:', await new Account({
      username: args.options.username,
      password: await crypt.encryptPassword(password)
    }).save());
  });

cli
  .command('client')
  .option('-n, --name <name>', 'Client name.')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .description('Create a new Client.')
  .action(async function(args) {
    console.log('Doc:', await new Client({
      name: args.options.name,
      secret: await crypt.generateSecret(),
      accountId: args.options.account
    }).save());
  });

cli
  .command('token')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .option('-c, --client <client>', 'The ID of the client that owns this token.')
  .description('Create a new Token.')
  .action(async function(args) {
    const token = await crypt.generateToken();
    console.log('Token:', token);
    console.log('Doc:', await new Token({
      value: await crypt.encryptToken(token),
      accountId: args.options.account,
      clientId: args.options.client,
      scope: scopes.all,
      entity: entities.FIRST_PARTY
    }).save());
  });

cli
  .command('fp')
  .option('-u, --username <username>', 'Account username.')
  .option('-n, --name <name>', 'Client name.')
  .description('Generate auth credentials for a first-party client.')
  .action(async function(args) {
    const password = await new Promise(resolve => {
      this.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter a password for the account',
      }, result => resolve(result.password));
    });

    const account = await new Account({
      username: args.options.username,
      password: await crypt.encryptPassword(password)
    }).save();

    const client = await new Client({
      name: args.options.name,
      secret: await crypt.generateSecret(),
      accountId: account.id
    }).save()

    const token = await crypt.generateToken();
    await new Token({
      value: await crypt.encryptToken(token),
      accountId: account.id,
      clientId: client.id,
      scope: scopes.all,
      entity: entities.FIRST_PARTY
    }).save();

    console.log('Client ID:', client.id);
    console.log('Client Secret:', client.secret);
    console.log('Token:', token);
  });

export default cli;
