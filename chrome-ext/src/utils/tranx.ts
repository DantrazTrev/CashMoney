import web3, {
  Account,
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
} from '@solana/web3.js';

export const sendTransaction = async (
  connection: Connection,
  from: Account,
  to: PublicKey,
  amount: number
) => {
  // Add transfer instruction to transaction
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: web3.LAMPORTS_PER_SOL * amount,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from]
  );
  console.log('SIGNATURE', signature);
};

export const getTransactions = async (
  address: PublicKey,
  connection: Connection
) => {
  let transactionList = await connection.getSignaturesForAddress(address);
  let parsedList = transactionList.map(
    (transaction: ConfirmedSignatureInfo, i) => {
      if (!transaction.blockTime) return;
      const date = new Date(transaction.blockTime * 1000);
      return {
        date,
        signature: transaction.signature,
        status: transaction.confirmationStatus,
      };
    }
  );
  return parsedList;
};
