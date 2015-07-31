import Hapi from 'hapi';
import './models';

import cli from './helpers/cli';
import cliConfig from './config/cli';
import strategies from './config/strategies';
import serverConfig from './config/server';
import plugins from './config/plugins';
import routes from './config/routes';

const server = new Hapi.Server(serverConfig.options);
server.connection(serverConfig.connection);

// Register plugins
server.register(plugins, error => {
  // $lab:coverage:off$
  if (error) {
    return server.log('error', error);
  }
  // $lab:coverage:on$

  // Import auth strategies
  strategies.forEach(strategy => {
    server.auth.strategy(strategy.name, strategy.scheme, strategy.options);
  });

  // Set the default strategy
  server.auth.default('ownership');

  // Add the routes
  server.route(routes);

  // Start the server unless imported
  // $lab:coverage:off$
  if (!module.parent) {
    server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
  }
  // $lab:coverage:on$
});

// Start the CLI
// $lab:coverage:off$
if (cliConfig.enabled) {
  cli.listen(cliConfig.port);
  server.log('info', `Vantage CLI started on port ${cliConfig.port}`);
}
// $lab:coverage:on$

export default server;
