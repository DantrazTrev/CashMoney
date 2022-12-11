import { UnlockEvent } from './events';
import {
  createMnS,
  createSecretBox,
  loadMnemonicAndSeed,
} from './secretboxutils';
import { Wallet } from './wallet';

export const unlockWallet = async (password: string) => {
  const { seed } = await loadMnemonicAndSeed(password);
  const account = Wallet.getWallet(seed, 1);
  console.log(account);
  window.dispatchEvent(UnlockEvent);
};

export const lockWallet = (password: string) => {};

export const createWallet = async (password: string) => {
  let { mnemonic, seed } = await createMnS();
  let account = await createSecretBox(mnemonic, seed, password);
  return { mnemonic, seed, account };
};
