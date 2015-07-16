import thinky, {type, r} from '../helpers/thinky';

import Account from './account';
import Client from './client';

const Code = thinky.createModel('Code', {
  value: type.string().required(),
  accountId: type.string().required(),
  clientId: type.string().required(),
  scope: type.array().schema(type.string()).required(),
  used: type.boolean().default(false),
  createdAt: type.date().default(r.now())
}, {
  pk: 'value'
});

Code.belongsTo(Account, 'account', 'accountId', 'id');
Code.belongsTo(Client, 'client', 'clientId', 'id');

export default Code;
