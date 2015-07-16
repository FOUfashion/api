export const rethinkdb = {
  host: process.env.RETHINKDB_HOST || 'localhost',
  port: process.env.RETHINKDB_PORT || 28015,
  db: process.env.RETHINKDB_DB || 'test'
};
