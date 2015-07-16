import faker from 'faker';

/**
 * Generates dummy objects using faker.
 * Used in tests to create random db documents.
 */
export default {

  account: function() {
    return {
      email: faker.internet.email().toLowerCase(),
      username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '').substr(0, 10),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };
  }

};
