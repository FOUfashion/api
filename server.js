import Hapi from 'hapi';

import thinky from './helpers/thinky';
import strategies from './config/strategies';
import serverConfig from './config/server';
import plugins from './config/plugins';
import routes from './config/routes';

const server = new Hapi.Server(serverConfig.options);
server.connection(serverConfig.connection);

server.ext('onPreResponse', (request, reply) => {
  if (request.response.source instanceof thinky.Errors.DocumentNotFound) {
    request.response.code(404);
  }

  reply.continue();
});

server.register(plugins, error => {
  if (error) {
    return server.log('error', error);
  }

  strategies.forEach(strategy => {
    server.auth.strategy(strategy.name, strategy.scheme, strategy.mode, strategy.options);
  });

  server.route(routes);
  server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
});

export default server;
