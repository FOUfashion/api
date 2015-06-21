import crypto from 'crypto';

const keylen = 512;
const digest = 'sha256';

export default {
  encrypt: async function(val, iterations) {
    let salt = await crypto.randomBytes(64);
    salt = salt.toString('hex');

    let key = await crypto.pbkdf2(val, salt, iterations, keylen, digest);
    key = key.toString('hex');

    return `${salt}:${key}:${iterations}`;
  },
  encryptPassword: async function(password) {
    return this.encrypt(password, 8192);
  },
  encryptToken: async function(token) {
    return this.encrypt(token, 2048);
  }
};
