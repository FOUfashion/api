import thinky, {type, r} from '../helpers/thinky';

const Account = thinky.createModel('Account', {
  id: type.string().default(r.uuid()),
  username: type.string().required().alphanum().min(4).max(12),
  password: type.string().required(),
  createdAt: type.date().default(r.now())
}, {
  pk: 'username'
});

export default Account;
