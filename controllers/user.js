import User from '../models/user';

class UserCtrl {

  index(request, reply) {
    new User({
      username: request.params.name,
      email: 'text@example.com'
    }).save().then(reply);
  }

}

export default UserCtrl;
