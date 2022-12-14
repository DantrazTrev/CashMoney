import {
  Account,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  GetProgramAccountsFilter,
} from '@solana/web3.js';
import { LockEvent, UnlockEvent } from './events';
import {
  createMnS,
  createSecretBox,
  loadMnemonicAndSeed,
} from './secretboxutils';
import { getSPLBal, getTokenValue } from './tokens';
import { Wallet } from './wallet';

export const unlockWallet = async (password: string) => {
  const { seed, accountIndex } = await loadMnemonicAndSeed(password);
  console.log(seed, accountIndex);
  const account = Wallet.getWallet(seed, accountIndex);
  window.dispatchEvent(UnlockEvent(account));
};

export const validatePassword = async (
  password: string
): Promise<any | Error> => {
  const { mnemonic, accountIndex } = await loadMnemonicAndSeed(password);
  return { mnemonic };
};

export const lockWallet = (password: string) => {
  window.dispatchEvent(LockEvent);
};

export const createWallet = async (password: string) => {
  let { mnemonic, seed } = await createMnS();
  let account = await createSecretBox(mnemonic, seed, password);
  return { mnemonic, seed, account };
};

export const getBalance = async (account: Account, connection: Connection) => {
  console.log(account);
  if (account === undefined) return null;
  let solbalance = await getSolBalance(account, connection);
  let splbalance = await getSPLBal(connection, account.publicKey);

  return { tokens: splbalance, solana: solbalance };
};
export const getSolBalance = async (
  account: Account,
  connection: Connection
) => {
  if (account === undefined) return null;
  let balance = await connection.getBalance(account.publicKey);
  let value = await getTokenValue('solana', 'usd');
  return {
    name: 'solana',
    value: (balance / LAMPORTS_PER_SOL) * value,
    token: balance / LAMPORTS_PER_SOL,
  };
};

export interface Token {
  name: string;
  token: number;
  value: number;
}
