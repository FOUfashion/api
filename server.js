import Hapi from 'hapi';

import plugins from './config/plugins';
import routes from './config/routes';

let server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 3000,
  host: process.env.HOSTNAME || 'localhost'
});

server.route(routes);

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
});
