import generate from '../helpers/generate';
import dbUtils from '../helpers/dbUtils';
import dummy from './dummy';

import Account from '../models/account';
import Comment from '../models/comment';
import Post from '../models/post';

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

  this.fp.account.unencryptedPassword = 'fp_password';
  this.tp.account.unencryptedPassword = 'tp_password';

  this.tempAccount1 = await new Account(dummy.account()).saveAll();
  this.tempAccount2 = await new Account(dummy.account()).saveAll();

  this.post1 = await new Post(dummy.post({ accountId: this.fp.account.id })).save();
  this.post2 = await new Post(dummy.post({ accountId: this.tp.account.id })).save();

  this.comment1 = await new Comment(dummy.comment({ accountId: this.fp.account.id, postId: this.post1.id })).save();
  this.comment2 = await new Comment(dummy.comment({ accountId: this.tp.account.id, postId: this.post2.id })).save();

  synced = true;
};

export default data;
