import thinky, {type, r} from '../helpers/thinky';

const Profile = thinky.createModel('Profile', {
  id: type.string().default(r.uuid()),
  accountId: type.string(),
  email: type.string().required().email().max(64).lowercase(),
  name: type.object().schema({
    first: type.string(),
    last: type.string(),
    full: type.virtual().default(function() {
      return this.first + ' ' + this.last;
    })
  })
}, {
  pk: 'email'
});

export default Profile;
