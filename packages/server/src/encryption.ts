import crypto from 'crypto';
import { Rotating } from './rotation.js';

const STRING_ENCODING = 'base64';
const AES_256_CBC = 'aes-256-cbc';

type Encryption = {
  encrypt: (text: crypto.BinaryLike) => string;
  decrypt: (encrypted: string) => string;
};

const encryption = (
  algorithm = AES_256_CBC,
  key: Buffer = crypto.randomBytes(32),
  iv: Buffer = crypto.randomBytes(16),
): Encryption => {
  const encrypt = (text: crypto.BinaryLike): string => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString(STRING_ENCODING);
  };

  const decrypt = (encryptedData: string): string => {
    const encryptedText = Buffer.from(encryptedData, STRING_ENCODING);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString();
  };

  return { encrypt, decrypt };
};

const rotatingEncryption = new Rotating(encryption);

export default rotatingEncryption;
