import acrypto from 'acrypto';

export default {
  encryptPassword: async function(password, salt, iterations) {
    if (!salt) {
      salt = await acrypto.randomBytes(32);
      salt = salt.toString('hex');
    }

    if (!iterations) {
      iterations = 8192;
    } else {
      iterations = parseInt(iterations, 10);
    }

    let key = await acrypto.pbkdf2(password, salt, iterations, 256, 'sha256');
    key = key.toString('base64');

    return `${salt}:${key}:${iterations}`;
  },
  passwordsMatch: async function(original, check) {
    const [salt, key, iterations] = original.split(':');
    const encrypted = await this.encryptPassword(check, salt, iterations);
    return original === encrypted;
  },
  generateToken: async function() {
    const token = await acrypto.randomBytes(16);
    return token.toString('hex');
  },
  generateCode: async function() {
    const code = await acrypto.randomBytes(12);
    return code.toString('hex');
  },
  generateSecret: async function() {
    const secret = await acrypto.randomBytes(24);
    return secret.toString('hex');
  }
};
