import Hapi from 'hapi';
import Good from 'good';
import Lout from 'lout';

import routes from './config/routes';

let server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 3000,
  host: process.env.HOSTNAME || 'localhost'
});

server.route(routes);

server.register([{
  register: Good,
  options: {
    reporters: [{
      reporter: 'good-console',
      events: {
        log: '*',
        response: '*',
        error: '*'
      }
    }]
  }
}], (err) => {
  if (err) {
    throw err;
  }

  server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
});
