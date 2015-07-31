import thinky, {type, r} from '../helpers/thinky';

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

export default Code;
