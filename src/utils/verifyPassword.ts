import crypto from 'crypto';

function verifyPassword(password: string, hash: string, salt: string) {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hashedPassword === hash;
}

export default verifyPassword;
