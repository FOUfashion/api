export default [{
  register: require('good'),
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
}, {
  register: require('hapi-auth-bearer-token')
}, {
  register: require('../plugins/hapi-auth-ownership')
}];
