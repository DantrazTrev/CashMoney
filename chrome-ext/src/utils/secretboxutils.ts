import { randomBytes, secretbox } from 'tweetnacl';
import bs58 from 'bs58';
import { pbkdf2 } from 'crypto';
import { Wallet } from './wallet';
export const login = (password: string) => {};
export type MnemonicAndSeed = {
  mnemonic: string;
  seed: string;
};
export type SecretBox = {
  nonce: string;
  kdf: string; // pbkdf2
  encryptedBox: string;
  salt: string;
  iterations: number;
  digest: string; //sha256
};

export const createSecretBox = async (
  mnemonic: string,
  seed: string,
  password: string
) => {
  const plaintext = JSON.stringify({ mnemonic, seed });
  const salt = randomBytes(16);
  const kdf = 'pbkdf2';
  const iterations = 100000;
  const digest = 'sha256';
  console.log(plaintext);
  deriveEncryptionKey(password, salt, iterations, digest)
    .then((key) => {
      const nonce = randomBytes(secretbox.nonceLength);
      const encrypted = secretbox(Buffer.from(plaintext, 'hex'), nonce, key);
      let secretBox = {
        encryptedBox: bs58.encode(encrypted),
        nonce: bs58.encode(nonce),
        kdf,
        salt: bs58.encode(salt),
        iterations,
        digest,
      } as SecretBox;

      let wallet = Wallet.createWallet(seed, 1);
      console.log(wallet, 'wallet');

      let selectedAccount = wallet.accounts[0].publicKey.toBase58();
      console.log(secretBox, selectedAccount);
      return;
    })
    .catch((err) => {
      throw new Error(`Unable to encrypt box: ${err}`);
    });
};

export const createMnS = async (): Promise<MnemonicAndSeed> => {
  const bip39 = await import('bip39');
  const mnemonic = bip39.generateMnemonic(128);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return { mnemonic, seed: new Buffer(seed).toString('hex') };
};

const deriveEncryptionKey = async (
  password: any,
  salt: any,
  iterations: number,
  digest: any
): Promise<any> => {
  return new Promise((resolve, reject) =>
    pbkdf2(
      password,
      salt,
      iterations,
      secretbox.keyLength,
      digest,
      (err, key) => (err ? reject(key) : resolve(key))
    )
  );
};
