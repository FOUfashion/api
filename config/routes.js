export default [{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Kaidu API');
  }
}, {
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply('Hello, ' + request.params.name + '!');
  }
}, {
  path: '/',
  method: 'GET',
  config: {
    auth: false,
    handler: require('./handlers/home')
  }
}, {
  path: '/anonymous',
  method: 'GET',
  config: {
    auth: false,
    handler: require('./handlers/anonymous.js')
  }
}, {
  path: '/register',
  method: 'POST',
  config: {
    auth: false,
    validate: require('../models/person'),
    handler: require('./handlers/register.js')
  }
}, {
  path: '/login',
  method: 'POST',
  config: {
    auth: 'basic',
    handler: require('./handlers/login.js')
  }
}, {
  path: '/logout',
  method: 'POST',
  config: {
    auth: 'jwt',
    handler: require('./handlers/logout.js')
  }
}, {
  path: '/timer/{id}',
  method: 'GET', // Validate {id} to prevent injection?
  config: {
    auth: 'jwt',
    handler: require('./handlers/timer_find.js')
  }
}, {
  path: '/timer/new',
  method: 'POST',
  config: {
    validate: require('../models/timer'),
    auth: 'jwt',
    handler: require('./handlers/timer_start.js')
  }
}];
