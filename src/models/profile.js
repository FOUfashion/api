import thinky, {type, r} from '../helpers/thinky';

const Profile = thinky.createModel('Profile', {
  id: type.string().default(r.uuid()),
  accountId: type.string().required(),
  email: type.string().required().email().max(64).lowercase(),
  name: type.object().schema({
    first: type.string().required(),
    last: type.string().required(),
    full: type.virtual().default(function() {
      return this.name.first + ' ' + this.name.last;
    })
  }),
  createdAt: type.date().default(r.now())
}, {
  pk: 'email'
});

export default Profile;
