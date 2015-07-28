// $lab:coverage:off$
export const rethinkdb = {
  host: process.env.API_RETHINKDB_HOST || 'localhost',
  port: process.env.API_RETHINKDB_PORT || 28015,
  db: process.env.API_RETHINKDB_DB || 'test'
};
// $lab:coverage:on$
