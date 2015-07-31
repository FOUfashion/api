import Vantage from 'vantage';

import scopes from './scopes';
import crypt from './crypt';

import Account from '../models/account';
import Profile from '../models/profile';
import Client from '../models/client';
import Token from '../models/token';

const banner =
`################################################################################
#                                                                              #
#                         ########  #######  ##     ##                         #
#                         ##       ##     ## ##     ##                         #
#                         ######   ##     ## ##     ##                         #
#                         ##       ##     ## ##     ##                         #
#                         ##        #######   #######                          #
#                                                                              #
#                          Welcome to FOU.fashion API                          #
#                                                                              #
#                  All connections are monitored and recorded                  #
#           Disconnect IMMEDIATELY if you are not an authorized user           #
#                                                                              #
################################################################################`;

// $lab:coverage:off$
const cli = new Vantage();
cli.delimiter('api~$');
cli.banner(banner);

// Basic auth
cli.auth('basic', {
  users: [{
    user: process.env.API_CLI_USER || 'admin',
    pass: process.env.API_CLI_PASS || 'admin'
  }]
});

cli
  .command('account')
  .option('-u, --username <username>', 'Account username.')
  .option('-e, --email <email>', 'Profile email.')
  .option('-f, --first <first>', 'Profile first name.')
  .option('-l, --last <last>', 'Profile last name.')
  .description('Create a new Account.')
  .action(async function(args) {
    const password = await new Promise(resolve => {
      this.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter a password for the account'
      }, resolve);
    });

    const account = await new Account({
      username: args.options.username,
      password: await crypt.encryptPassword(password),
      profile: {
        email: args.options.email,
        name: {
          first: args.options.first,
          last: args.options.last
        }
      }
    }).saveAll();

    this.log(account);
  });

cli
  .command('client')
  .option('-n, --name <name>', 'Client name.')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .description('Create a new Client.')
  .action(async function(args) {
    const client = await new Client({
      name: args.options.name,
      secret: await crypt.generateSecret(),
      accountId: args.options.account
    }).save();

    this.log(client);
  });

cli
  .command('token')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .option('-c, --client <client>', 'The ID of the client that owns this token.')
  .option('-s, --scope <scope>', 'The scopes for this token, separated by commas.')
  .description('Create a new Token.')
  .action(async function(args) {
    const token = await new Token({
      value: await crypt.generateToken(),
      accountId: args.options.account,
      clientId: args.options.client,
      scope: args.options.scope.replace(/\s/g, '').split(',')
    }).save();

    this.log(token);
  });

cli
  .command('fp')
  .option('-u, --username <username>', 'Account username.')
  .option('-e, --email <email>', 'Profile email.')
  .option('-f, --first <first>', 'Profile first name.')
  .option('-l, --last <last>', 'Profile last name.')
  .option('-n, --name <name>', 'Client name.')
  .description('Generate auth credentials for a first-party client.')
  .action(async function(args) {
    const password = await new Promise(resolve => {
      this.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter a password for the account'
      }, result => resolve(result.password));
    });

    const account = await new Account({
      username: args.options.username,
      password: await crypt.encryptPassword(password),
      profile: {
        email: args.options.email,
        name: {
          first: args.options.first,
          last: args.options.last
        }
      }
    }).saveAll();

    const client = await new Client({
      name: args.options.name,
      secret: await crypt.generateSecret(),
      accountId: account.id
    }).save();

    const token = await new Token({
      value: await crypt.generateToken(),
      accountId: account.id,
      clientId: client.id,
      scope: scopes.ALL
    }).save();

    this.log('Client ID:', client.id);
    this.log('Client Secret:', client.secret);
    this.log('Token:', token.value);
  });

export default cli;
// $lab:coverage:on$
