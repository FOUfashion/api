export default [{
  register: require('hapi-auth-bearer-token')
}, {
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
}];
