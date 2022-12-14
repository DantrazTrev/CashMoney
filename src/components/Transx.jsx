import React from 'react'
import { Card, Typography } from '@mui/material';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function Transx({transaction,account}) {
   const from = transaction.transaction._json.signers.some(signer=>signer===account._publicKey.toString())
  return (
<Card onClick={()=>{window.open(`https://solscan.io/tx/${transaction.signature}`)}} sx={{margin:2,width:250,padding:2,backgroundColor:from?'red':'green'}}elevation={8}>
   <Typography> {transaction.amount/LAMPORTS_PER_SOL} SOL </Typography> 
   <Typography>Fees: {transaction.fees/LAMPORTS_PER_SOL} </Typography> 
<div style={{overflow: "hidden", textOverflow: "ellipsis", width: '100'}}> 
   <Typography sx={{textOverflow:'ellipsis',fontSize:10}} >{transaction.signature}</Typography> 
    </div>
   
</Card>  )
}

export default Transx