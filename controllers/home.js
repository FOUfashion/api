const manifest = require('../package.json');

class HomeCtrl {

  index(request, reply) {
    reply({
      name: manifest.description,
      version: manifest.version,
      authenticated: request.auth.isAuthenticated,
      time: request.info.received
    });
  }

}

export default HomeCtrl;
