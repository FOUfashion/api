import Profile from '../models/profile';

class ProfileCtrl {

  async get(request, reply) {
    const profile = await Profile.get(request.query.email).run();
    reply(profile);
  }

}

export default ProfileCtrl;
