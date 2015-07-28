// $lab:coverage:off$
export default {
  options: {
    minimal: true
  },
  connection: {
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOSTNAME || '127.0.0.1'
  }
};
// $lab:coverage:on$
