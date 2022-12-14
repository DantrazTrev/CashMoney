import { Account } from '@solana/web3.js';
import nacl from 'tweetnacl';
import * as bip32 from 'bip32';

export class Wallet {
  public seed: Buffer;
  public accounts: Account[];

  static getWallet(seed: string, accountCount: number): Wallet {
    const bufSeed = Buffer.from(seed, 'hex');
    const wallet = new Wallet(bufSeed);
    console.log(accountCount);
    for (let itr = 0; itr < accountCount; itr++) {
      wallet.createAccounts();
    }
    return wallet;
  }

  constructor(seed: Buffer) {
    this.seed = seed;
    this.accounts = [];
  }

  createAccounts() {
    const accountIndex = this.accounts.length;

    const derivedSeed = bip32
      .fromSeed(new Buffer(this.seed))
      .derivePath(`m/44'/501'/${accountIndex}'/0'`).privateKey;
    const newAccount = new Account(
      nacl.sign.keyPair.fromSeed(derivedSeed!).secretKey
    );
    this.accounts = [...this.accounts, newAccount];

    return newAccount;
  }

  addAccount() {
    const accountIndex = this.accounts.length + 1;

    const derivedSeed = bip32
      .fromSeed(new Buffer(this.seed))
      .derivePath(`m/44'/501'/${accountIndex}'/0'`).privateKey;
    const newAccount = new Account(
      nacl.sign.keyPair.fromSeed(derivedSeed!).secretKey
    );
    this.accounts = [...this.accounts, newAccount];
    localStorage.setItem('accounts', `${accountIndex}`);

    return newAccount;
  }
  findAccount(pubKey: string): Account | undefined {
    let account = undefined;
    this.accounts.forEach((acc) => {
      if (acc.publicKey.toBase58() === pubKey) {
        account = acc;
      }
    });
    return account;
  }

  getPublicKeysAsBs58 = (): string[] => {
    return this.accounts.map((a) => a.publicKey.toBase58());
  };
}
