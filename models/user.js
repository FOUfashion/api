import thinky, {type} from '../helpers/thinky';

let User = thinky.createModel('User', {
  id: type.string(),
  username: type.string().min(4),
  email: type.string().email()
});

export default User;
