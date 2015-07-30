import generate from '../helpers/generate';
import dbUtils from '../helpers/dbUtils';

const data = {};
let synced = false;

/**
 * This module serves as a common pool of documents and credentials to be used in tests.
 * Sync makes sure those resources are loaded before being used.
 */
data.sync = async function() {
  if (synced) {
    return;
  }

  await dbUtils.clearDatabase();

  this.fp = await generate.firstPartyCredentials({
    username: 'fpusername',
    password: 'fp_password',
    clientName: 'fp_client_name',
    profile: {
      email: 'test@fp.com',
      name: {
        first: 'Premier',
        last: 'Party'
      }
    }
  });

  this.tp = await generate.thirdPartyCredentials({
    username: 'tpusername',
    password: 'tp_password',
    clientName: 'tp_client_name',
    profile: {
      email: 'test@tp.com',
      name: {
        first: 'Zweite',
        last: 'Party'
      }
    }
  });

  synced = true;
};

export default data;
