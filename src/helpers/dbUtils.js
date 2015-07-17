import {promisify} from 'bluebird';
import {r} from './thinky';

async function clearDatabase() {
  const tableList = r.tableList();
  const tables = await promisify(tableList.run, tableList)();

  // $lab:coverage:off$
  await* tables.map(table => {
    const del = r.table(table).delete();
    return promisify(del.run, del)();
  });
  // $lab:coverage:on$
}

export default {
  clearDatabase
};
