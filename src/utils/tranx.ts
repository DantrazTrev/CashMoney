import {
  Account,
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

export const sendTransaction = async (
  connection: Connection | null,
  from: Account,
  to: PublicKey,
  amount: number
) => {
  console.log('TRANSCT');
  if (connection === null) {
    return;
  }
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: LAMPORTS_PER_SOL * amount,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);
  console.log('SIGNATURE', signature);
};

export const getTransactions = async (
  address: PublicKey,
  connection: Connection
) => {
  let transactionList = await connection.getConfirmedSignaturesForAddress2(
    address,
    { limit: 20 }
  );
  let transactions = [];
  for (let i = 0; i < transactionList.length; i++) {
    const signature = transactionList[i].signature;
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );
    if (confirmedTransaction) {
      const { meta } = confirmedTransaction;
      if (meta) {
        const oldBalance = meta.preBalances;
        const newBalance = meta.postBalances;
        const amount = oldBalance[0] - newBalance[0];
        const transWithSignature = {
          signature,
          ...confirmedTransaction,
          fees: meta?.fee,
          amount,
        };
        transactions.push(transWithSignature);
      }
    }
  }

  // let transactionDetails = await connection.getParsedTransactions(
  //   signatureList,
  //   { maxSupportedTransactionVersion: 0 }
  // );

  // let parsedList = transactionList.map(
  //   (transaction: ConfirmedSignatureInfo, i) => {
  //     if (!transaction.blockTime) return;
  //     if (transactionDetails[i] === null) return;
  //     const transactionInstructions = transactionDetails[i];

  //     const date = new Date(transaction.blockTime * 1000);
  //     return {
  //       date,
  //       signature: transaction.signature,
  //       status: transaction.confirmationStatus,
  //       transactionInstructions,
  //     };
  //   }
  // );
  console.log(transactions);

  return transactions;
};
