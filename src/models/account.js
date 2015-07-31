import thinky, {type, r} from '../helpers/thinky';

const Account = thinky.createModel('Account', {
  id: type.string().default(r.uuid()),
  username: type.string().required().alphanum().min(4).max(12),
  password: type.string().required(),
  createdAt: type.date().default(r.now())
}, {
  pk: 'username'
});

// Remove the password from the document
Account.defineStatic('withoutPassword', function() {
  return this.without('password');
});

// Query by id or username
Account.defineStatic('find', async function(idOrUsername, join = true, withoutPassword = true) {
  if (idOrUsername.includes('-')) {
    let query = Account.filter({ id: idOrUsername });

    if (join) query = query.getJoin();
    if (withoutPassword) query = query.withoutPassword();

    const accounts = await query.run();

    if (accounts.length > 0) {
      return accounts[0];
    }
  }

  // Must be a username
  let query = Account.get(idOrUsername);

  if (join) query = query.getJoin();
  if (withoutPassword) query = query.withoutPassword();

  return await query.run();
});

export default Account;
