export default [{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Kaidu API!');
  }
}, {
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply(`Hello, /${request.params.name}!`);
  }
}];
