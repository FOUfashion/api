import thinky, {type, r} from '../helpers/thinky';

import Account from './account';

const Client = thinky.createModel('Client', {
  id: type.string(),
  name: type.string().required(),
  secret: type.string().required(),
  accountId: type.string().required(),
  createdAt: type.date().default(r.now())
});

Client.belongsTo(Account, 'account', 'accountId', 'id');

export default Client;
