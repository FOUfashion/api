import thinky, {type, r} from '../helpers/thinky';

const Token = thinky.createModel('Token', {
  value: type.string().required(),
  accountId: type.string().required(),
  clientId: type.string().required(),
  scope: type.array().schema(type.string()).required(),
  createdAt: type.date().default(r.now())
}, {
  pk: 'value'
});

export default Token;
