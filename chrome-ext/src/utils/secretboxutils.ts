import { randomBytes, secretbox } from 'tweetnacl';
import bs58 from 'bs58';
import { pbkdf2 } from 'crypto';
import * as bip32 from 'bip32';
import { Wallet } from './wallet';
export const login = (password: string) => {};
export type MnemonicAndSeed = {
  mnemonic: string;
  seed: string;
};

export type SecretBox = {
  nonce: string;
  kdf: string; // pbkdf2
  encrypted: string;
  salt: string;
  iterations: number;
  digest: string; //sha256
};

export const createSecretBox = async (
  mnemonic: string,
  seed: string,
  password: string,
  accountIndex: number = 1
) => {
  const plaintext = JSON.stringify({ mnemonic, seed, accountIndex });
  const salt = randomBytes(16);
  const kdf = 'pbkdf2';
  const iterations = 100000;
  const digest = 'sha256';
  deriveEncryptionKey(password, salt, iterations, digest)
    .then((key) => {
      const nonce = randomBytes(secretbox.nonceLength);
      const encrypted = secretbox(Buffer.from(plaintext), nonce, key);

      localStorage.setItem(
        'locked',
        JSON.stringify({
          encrypted: bs58.encode(encrypted),
          nonce: bs58.encode(nonce),
          kdf,
          salt: bs58.encode(salt),
          iterations,
          digest,
        })
      );
      localStorage.setItem('accounts', `${accountIndex}`);
      localStorage.removeItem('unlocked');

      sessionStorage.removeItem('unlocked');

      let wallet = Wallet.getWallet(seed, accountIndex);

      let selectedAccount = wallet.accounts[0].publicKey.toBase58();
      console.log(selectedAccount);
      return selectedAccount;
    })
    .catch((err) => {
      throw new Error(`Unable to encrypt box: ${err}`);
    });
};

// export const updateSecretBox = async (accountIndex: number) => {
//   let { mnemonic, seed } = await loadMnemonicAndSeed(password);
//   const plaintext = JSON.stringify({ mnemonic, seed, accountIndex });
//   const salt = randomBytes(16);
//   const kdf = 'pbkdf2';
//   const iterations = 100000;
//   const digest = 'sha256';
//   deriveEncryptionKey(password, salt, iterations, digest)
//     .then((key) => {
//       const nonce = randomBytes(secretbox.nonceLength);
//       const encrypted = secretbox(Buffer.from(plaintext), nonce, key);

//       localStorage.setItem(
//         'locked',
//         JSON.stringify({
//           encrypted: bs58.encode(encrypted),
//           nonce: bs58.encode(nonce),
//           kdf,
//           salt: bs58.encode(salt),
//           iterations,
//           digest,
//         })
//       );
//       localStorage.removeItem('unlocked');

//       sessionStorage.removeItem('unlocked');

//       let wallet = Wallet.getWallet(seed, accountIndex);

//       let selectedAccount = wallet.accounts[0].publicKey.toBase58();
//       console.log(selectedAccount);
//       return selectedAccount;
//     })
//     .catch((err) => {
//       throw new Error(`Unable to encrypt box: ${err}`);
//     });
// };

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

export async function loadMnemonicAndSeed(password: string) {
  let locked = localStorage.getItem('locked');
  if (locked === null) {
    throw Error('Error in loading accounts');
  }
  const {
    encrypted: encodedEncrypted,
    nonce: encodedNonce,
    salt: encodedSalt,
    iterations,
    digest,
  } = JSON.parse(locked);
  const encrypted = bs58.decode(encodedEncrypted);
  const nonce = bs58.decode(encodedNonce);
  const salt = bs58.decode(encodedSalt);

  const key = await deriveEncryptionKey(password, salt, iterations, digest);
  const plaintext = secretbox.open(encrypted, nonce, key);
  if (!plaintext) {
    throw new Error('Incorrect password');
  }

  const decodedPlaintext = Buffer.from(plaintext).toString();
  const { mnemonic, seed, derivationPath } = JSON.parse(decodedPlaintext);

  sessionStorage.setItem('unlocked', decodedPlaintext);
  let accountIndex = localStorage.getItem('accounts')
    ? Number(localStorage.getItem('accounts'))
    : 1;

  const importsEncryptionKey = deriveImportsEncryptionKey(seed);
  let data = {
    mnemonic,
    seed,
    importsEncryptionKey,
    derivationPath,
    accountIndex,
  };
  console.log(data);
  return { mnemonic, seed, derivationPath, accountIndex };
}
function deriveImportsEncryptionKey(seed: string) {
  return bip32.fromSeed(Buffer.from(seed, 'hex')).derivePath("m/10016'/0")
    .privateKey;
}
