import Lab from 'lab';
import crypt from '../../helpers/crypt';

const expect = Lab.assertions.expect;
export const lab = Lab.script();

lab.experiment('Crypt Helper', function() {

  const dummyPass = 'salt:oTSX846k2MZdrrIy1rijbcWZvuHMyUAlTPlbqY1YCcd568J+Ii94u2nmpGLDdNimOfHBYxAP0g/e' +
    'bvKJRt8bKE6u7j1+9EdsVUfWnHXE1TlPpYpFj2EF7OfDi7FxDCLYozWIhUr+lNZm5D69jbOl4GIGEPUpK/Ra0hRCErHPYZb' +
    '/2MJM4xzCXyd+Dc0a3Ya/l0HrwQ7dEXyFR1YGmbAQRzvviwbcP6sd+E/ksOEdPAzs0gf9JEzP1XoKZnxJ829T7Ig54LiQRYp' +
    '5JyNLz5deo5NtNqKkkz5pz+AzMymWnGA2GZDVQhyUN/IgKAN9INbyHgLuFgt9lozxxWmF9iVPOg==:100';

  lab.test('[encryptPassword] encrypts password correctly', function(done) {
    async function exec() {
      const result = await crypt.encryptPassword('secret', 'salt', 100);
      expect(result).to.equal(dummyPass);
    }

    exec().then(done.bind(null, null), done);
  });

  lab.test('[passwordsMatch] should return true for matching passwords', function(done) {
    async function exec() {
      const result = await crypt.passwordsMatch(dummyPass, 'secret');
      expect(result).to.be.true();
    }

    exec().then(done.bind(null, null), done);
  });

  lab.test('[passwordsMatch] should return false for not matching passwords', function(done) {
    async function exec() {
      const result = await crypt.passwordsMatch(dummyPass, 'unmatch');
      expect(result).to.be.false();
    }

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateToken] should return a random 128-bit token', function(done) {
    async function exec() {
      const token1 = await crypt.generateToken();
      const token2 = await crypt.generateToken();
      const token3 = await crypt.generateToken();

      expect(token1).not.to.equal(token2);
      expect(token1).not.to.equal(token3);
      expect(token2).not.to.equal(token3);

      expect(token1).to.have.length(32);
      expect(token2).to.have.length(32);
      expect(token3).to.have.length(32);
    }

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateCode] should return a random 96-bit code', function(done) {
    async function exec() {
      const code1 = await crypt.generateCode();
      const code2 = await crypt.generateCode();
      const code3 = await crypt.generateCode();

      expect(code1).not.to.equal(code2);
      expect(code1).not.to.equal(code3);
      expect(code2).not.to.equal(code3);

      expect(code1).to.have.length(24);
      expect(code2).to.have.length(24);
      expect(code3).to.have.length(24);
    }

    exec().then(done.bind(null, null), done);
  });

  lab.test('[generateSecret] should return a random 192-bit code', function(done) {
    async function exec() {
      const secret1 = await crypt.generateSecret();
      const secret2 = await crypt.generateSecret();
      const secret3 = await crypt.generateSecret();

      expect(secret1).not.to.equal(secret2);
      expect(secret1).not.to.equal(secret3);
      expect(secret2).not.to.equal(secret3);

      expect(secret1).to.have.length(48);
      expect(secret2).to.have.length(48);
      expect(secret3).to.have.length(48);
    }

    exec().then(done.bind(null, null), done);
  });

});
