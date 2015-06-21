import thinky, {type, r} from '../helpers/thinky';

import Account from './account';
import Client from './client';

const Token = thinky.createModel('Token', {
  value: type.string().required(),
  accountId: type.string().required(),
  clientId: type.string().required(),
  scope: type.array().schema(type.number()).required(),
  entity: type.string().enum('app', 'user').required(),
  createdAt: type.date().default(r.now())
}, {
  pk: 'value'
});

Token.belongsTo(Account, 'account', 'accountId', 'id');
Token.belongsTo(Client, 'client', 'clientId', 'id');

export default Token;
