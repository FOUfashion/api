class HomeCtrl {

  index(request, reply) {
    reply('Kaidu API!');
  }

  ping(request, reply) {
    reply('pong');
  }

}

export default HomeCtrl;
