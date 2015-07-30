import Vantage from 'vantage';
import generate from './generate';

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

const cli = new Vantage();
cli.delimiter('api~$');
cli.banner(banner);

// Basic auth
cli.auth('basic', {
  users: [{
    user: process.env.API_CLI_USER,
    pass: process.env.API_CLI_PASS
  }]
});

// $lab:coverage:off$
cli
  .command('account')
  .option('-u, --username <username>', 'Account username.')
  .description('Create a new Account.')
  .action(async function(args) {
    const password = await new Promise(resolve => {
      this.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter a password for the account'
      }, resolve);
    });

    const account = await generate.account(args.options.username, password);
    console.log(account);
  });

cli
  .command('client')
  .option('-n, --name <name>', 'Client name.')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .description('Create a new Client.')
  .action(async function(args) {
    const client = await generate.client(args.options.name, args.options.account);
    console.log(client);
  });

cli
  .command('token')
  .option('-a, --account <account>', 'The ID of the account that owns this client.')
  .option('-c, --client <client>', 'The ID of the client that owns this token.')
  .option('-s, --scope <scope>', 'The scopes for this token, separated by commas.')
  .description('Create a new Token.')
  .action(async function(args) {
    const accountId = args.options.account;
    const clientId = args.options.client;
    const scope = args.options.scope.replace(/\s/g, '').split(',');
    const token = await this.token(accountId, clientId, scope);
    console.log(token);
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
        message: 'Enter a password for the account'
      }, result => resolve(result.password));
    });

    const fp = await generate.firstPartyCredentials(args.options.username, password, args.options.name);

    console.log('Client ID:', fp.client.id);
    console.log('Client Secret:', fp.client.secret);
    console.log('Token:', fp.token.value);
  });

export default cli;
// $lab:coverage:on$
