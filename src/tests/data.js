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

  this.fp = await generate.firstPartyCredentials('fpusername', 'fp_password', 'fp_name');
  this.tp = await generate.thirdPartyCredentials('tpusername', 'tp_password', 'tp_name');

  this.account = await generate.account('testuser', 'testpass');
  this.account.unencryptedPassword = 'testpass';

  this.profile = await generate.profile(this.account.id, 'test@account.com', { first: 'Johnny', last: 'Bravo' });
  this.client = await generate.client('testclient', this.account.id);

  synced = true;
};

export default data;
