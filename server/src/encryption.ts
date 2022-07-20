import crypto from 'crypto';

type Encryption = {
  encrypt: (text: crypto.BinaryLike) => string;
  decrypt: (encrypted: string) => string;
};

const encryption = (
  algorithm = 'aes-256-cbc',
  key: Buffer = crypto.randomBytes(32),
  iv: Buffer = crypto.randomBytes(16),
): Encryption => {
  const encrypt = (text: crypto.BinaryLike): string => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  };

  const decrypt = (encryptedData: string): string => {
    const encryptedText = Buffer.from(encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString();
  };

  return { encrypt, decrypt };
};

export { Encryption, encryption };
