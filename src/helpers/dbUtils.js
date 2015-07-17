import {promisify} from 'bluebird';
import {r} from './thinky';

function waitAllTables() {
  r.wait();
}

async function clearDatabase() {
  const tableList = r.tableList();
  const tables = await promisify(tableList.run, tableList)();

  await* tables.map(table => {
    const del = r.table(table).delete();
    return promisify(del.run, del)();
  });
}

export default {
  waitAllTables,
  clearDatabase
};
