import Profile from '../models/profile';

class ProfileCtrl {

  async getAuthenticated(request, reply) {
    const profile = await Profile
      .get(request.auth.credentials.account.profile.email)
      .getJoin({ account: true })
      .run();

    reply(profile);
  }

  async get(request, reply) {
    const idOrEmail = request.params.id;
    let profile;

    if (idOrEmail.includes('@')) {
      profile = await Profile
        .get(idOrEmail)
        .getJoin({ account: true })
        .run();
    } else {
      profile = await Profile
        .filter({ id: idOrEmail })
        .getJoin({ account: true })
        .nth(0)
        .run();
    }

    reply(profile);
  }

  async update(request, reply) {
    const idOrEmail = request.params.id;
    let profile;

    if (idOrEmail.includes('@')) {
      profile = await Profile
        .get(idOrEmail)
        .getJoin({ account: true })
        .run();
    } else {
      profile = await Profile
        .filter({ id: idOrEmail })
        .getJoin({ account: true })
        .nth(0)
        .run();
    }

    if (request.payload.firstName) {
      profile.name.first = request.payload.firstName;
    }

    if (request.payload.lastName) {
      profile.name.last = request.payload.lastName;
    }

    reply(profile);
  }

}

export default ProfileCtrl;
