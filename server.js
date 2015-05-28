import Hapi from 'hapi';
import Good from 'good';

let server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0'
});

server.register([{
  register: Good,
  options: {
    reporters: [{
      reporter: 'good-console',
      events: {
        ops: '*',
        log: '*',
        response: '*',
        error: '*',
        request: '*',
        wreck: '*'
      }
    }]
  }
}], function(err) {
  'use strict';
  if (err) {
    console.error(err);
  } else {
    server.start(function() {
      console.log('Server started at: ' + server.info.uri); // jshint ignore:line
    });
  }
});
