export default {
  options: {
    minimal: true
  },
  connection: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost'
  }
};
