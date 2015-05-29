import thinky from '../helpers/thinky';

exports.register = (server, options, next) => {
  server.expose('thinky', thinky);
  server.bind({
    thinky: thinky,
    r: thinky.r
  });

  return next();
};

exports.register.attributes = {
  name: 'rethinkdb'
};
