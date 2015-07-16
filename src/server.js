import Hapi from 'hapi';

import cli from './helpers/cli';
import cliConfig from './config/cli';
import strategies from './config/strategies';
import serverConfig from './config/server';
import plugins from './config/plugins';
import routes from './config/routes';

const server = new Hapi.Server(serverConfig.options);
server.connection(serverConfig.connection);

server.register(plugins, error => {
  if (error) {
    return server.log('error', error);
  }

  strategies.forEach(strategy => {
    server.auth.strategy(strategy.name, strategy.scheme, strategy.mode, strategy.options);
  });

  server.route(routes);

  if (!module.parent) {
    server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
  }
});

if (cliConfig.enabled) {
  cli.listen(cliConfig.port);
  server.log('info', `Vantage CLI started on port ${cliConfig.port}`);
}

export default server;
