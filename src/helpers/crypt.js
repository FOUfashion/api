import acrypto from 'acrypto';

export default {
  encryptPassword: async function(password, salt, iterations) {
    if (!salt) {
      salt = await acrypto.randomBytes(64);
      salt = salt.toString('hex');
    }

    if (!iterations) {
      iterations = 8192;
    }

    let key = await acrypto.pbkdf2(password, salt, iterations, 256, 'sha256');
    key = key.toString('base64');

    return `${salt}:${key}:${iterations}`;
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
