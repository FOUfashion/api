import generate from '../helpers/generate';
import dbUtils from '../helpers/dbUtils';

const data = {};
let synced = false;

data.sync = async function(done) {
  if (synced) {
    return;
  }

  await dbUtils.clearDatabase();

  this.fp = await generate.firstPartyCredentials('fpusername', 'fp_password', 'fp_name');
  this.tp = await generate.thirdPartyCredentials('tpusername', 'tp_password', 'tp_name');
  this.account = await generate.account('testuser', 'testpass');

  synced = true;
  done();
};

export default data;
