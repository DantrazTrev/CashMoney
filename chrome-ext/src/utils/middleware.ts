import { Connection } from '@solana/web3.js';
import { LockEvent, UnlockEvent } from './events';
import {
  createMnS,
  createSecretBox,
  loadMnemonicAndSeed,
} from './secretboxutils';
import { Wallet } from './wallet';

export const unlockWallet = async (password: string) => {
  const { seed, accountIndex } = await loadMnemonicAndSeed(password);
  console.log(seed, accountIndex);
  const account = Wallet.getWallet(seed, accountIndex);
  window.dispatchEvent(UnlockEvent(account));
};

export const lockWallet = (password: string) => {
  window.dispatchEvent(LockEvent);
};

export const createWallet = async (password: string) => {
  let { mnemonic, seed } = await createMnS();
  let account = await createSecretBox(mnemonic, seed, password);
  return { mnemonic, seed, account };
};

// export const getBalanceInfo = async (
//   connection: Connection,
//   tokenGetter: (mintAddress: string) => Token | undefined,
//   ownedAccount: OwnedAccount<Buffer>
// ): Promise<BalanceInfo> => {
//   return {
//     amount: BigInt(ownedAccount.accountInfo.lamports ?? 0),
//     owner: ownedAccount.publicKey,
//     lamports: BigInt(ownedAccount.accountInfo.lamports ?? 0),
//     token: {
//       mintAddress: 'Asdfasdf',
//       decimals: 9,
//       name: '',
//       symbol: 'SOL',
//     },
//   };
// };
