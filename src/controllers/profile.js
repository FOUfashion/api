import Profile from '../models/profile';

class ProfileCtrl {

  async getAuthenticated(request, reply) {
    console.log('profil getauth', request.auth.credentials.account);
    reply(await Profile.find(request.auth.credentials.account.profile.email));
  }

  async get(request, reply) {
    reply(await Profile.find(request.params.id));
  }

  async update(request, reply) {
    const profile = await Profile.find(request.params.id, false);

    if (request.params.first) {
      profile.name.first = request.params.first;
    }

    if (request.params.last) {
      profile.name.last = request.params.last;
    }

    await profile.save();
    reply(profile);
  }

}

export default ProfileCtrl;
