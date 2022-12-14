import { Wallet } from './wallet';

export const LockEvent = new CustomEvent('lock');
export const UnlockEvent = (data: Wallet): CustomEvent<Wallet> => {
  return new CustomEvent('unlock', { detail: data });
};
