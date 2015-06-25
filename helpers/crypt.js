import acrypto from 'acrypto';

export default {
  encrypt: async function(val, saltlen, iterations, keylen, digest) {
    let salt = await acrypto.randomBytes(saltlen);
    salt = salt.toString('hex');

    let key = await acrypto.pbkdf2(val, salt, iterations, keylen, digest);
    key = key.toString('base64');

    return `${salt}:${key}:${iterations}`;
  },
  encryptPassword: function(password) {
    return this.encrypt(password, 64, 8192, 256, 'sha256');
  },
  encryptToken: function(token) {
    return this.encrypt(token, 20, 8192, 32, 'sha1');
  },
  generateToken: async function() {
    const token = await acrypto.randomBytes(16);
    return token.toString('hex');
  },
  generateSecret: async function() {
    const secret = await acrypto.randomBytes(24);
    return secret.toString('hex');
  }
};
