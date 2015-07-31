import faker from 'faker';

/**
 * Generates dummy objects using faker.
 * Used in tests to create random db documents.
 */
export default {

  account: function(extra) {
    return Object.assign({
      username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: faker.internet.password(),
      profile: {
        email: faker.internet.email().toLowerCase(),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName()
        }
      }
    }, extra);
  },

  accountProfile: function(extra) {
    return Object.assign({
      email: faker.internet.email().toLowerCase(),
      username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }, extra);
  },

  post: function(extra) {
    return Object.assign({
      body: faker.lorem.sentence()
    }, extra);
  },

  comment: function(extra) {
    return Object.assign({
      body: faker.lorem.sentence()
    }, extra);
  }

};
