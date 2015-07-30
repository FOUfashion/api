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

// Query by id or email
Profile.defineStatic('find', async function(idOrEmail, join = true) {
  if (!idOrEmail.includes('@')) {
    let query = Profile.filter({ id: idOrEmail });

    if (join) {
      query = query.getJoin();
    }

    const profiles = await query.run();

    if (profiles.length > 0) {
      return profiles[0];
    }
  }

  // Must be a username
  let query = Profile.get(idOrEmail);

  if (join) {
    query = query.getJoin();
  }

  return await query.run();
});

export default Profile;
