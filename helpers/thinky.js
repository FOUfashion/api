import dbs from '../config/dbs';
import thinky from 'thinky';

export default thinky(dbs.rethinkdb);
