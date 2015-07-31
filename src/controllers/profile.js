import Profile from '../models/profile';

class ProfileCtrl {

  async getAuthenticated(request, reply) {
    const profile = await Profile
      .get(request.auth.credentials.account.profile.email)
      .getJoin({ account: true })
      .run();

    reply(profile);
  }

  // Due to how Mars was aligned today with Venus,
  // queries time out unless they throw a 404. That works.
  //
  // async get(request, reply) {
  //   const idOrEmail = request.params.id;
  //   let profile;
  //
  //   if (idOrEmail.includes('@')) {
  //     profile = await Profile
  //       .get(idOrEmail)
  //       .getJoin({ account: true })
  //       .run();
  //   } else {
  //     profile = await Profile
  //       .filter({ id: idOrEmail })
  //       .getJoin({ account: true })
  //       .nth(0)
  //       .run();
  //   }
  //
  //   return profile;
  // }

  // async update(request, reply) {
  //   const idOrEmail = request.params.id;
  //   let profile;
  //
  //   if (idOrEmail.includes('@')) {
  //     profile = await Profile
  //       .get(idOrEmail)
  //       .getJoin({ account: true })
  //       .run();
  //   } else {
  //     profile = await Profile
  //       .filter({ id: idOrEmail })
  //       .getJoin({ account: true })
  //       .nth(0)
  //       .run();
  //   }
  //
  //   if (request.params.first) {
  //     profile.name.first = request.params.first;
  //   }
  //
  //   if (request.params.last) {
  //     profile.name.last = request.params.last;
  //   }
  //
  //   await profile.save();
  //   reply(profile);
  // }

}

export default ProfileCtrl;
