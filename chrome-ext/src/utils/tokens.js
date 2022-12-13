import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';

const API_URL = 'https://api.coingecko.com/api/v3/';


// export async function findAssociatedTokenAddress(
//   walletAddress: { toBuffer: () => Buffer | Uint8Array },
//   tokenMintAddress: { toBuffer: () => Buffer | Uint8Array }
// ) {
//   return (
//     await PublicKey.findProgramAddress(
//       [
//         walletAddress.toBuffer(),
//         TokenInstructions.TOKEN_PROGRAM_ID.toBuffer(),
//         tokenMintAddress.toBuffer(),
//       ],
//       ASSOCIATED_TOKEN_PROGRAM_ID
//     )
//   )[0];
// }



// export function parseTokenAccountData(data) {
//   let { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data);
//   return {
//     mint: new PublicKey(mint),
//     owner: new PublicKey(owner),
//     amount,
//   };
// }




export const getSPLBal = async (connection, walletAddress) => {
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: walletAddress, // base58 encoded string
          },
        },
      ],
    }
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks

  let balance = accounts.forEach((account, i) => {
    //Parse the account data
    const parsedAccountInfo = account.account.data;
    const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"];
    const tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
    //Log results
    return {
      token: tokenBalance, mintAddress,
    }

  });
  console.log(balance, 'HERE')
  return balance
};



export const getTokenValue = async (
  token,
  currency
) => {
  let URL = API_URL + `simple/price?ids=${token}&vs_currencies=${currency}`;
  let val = await fetch(URL).then(data => data.json());
  console.log(val)
  return val[token][currency];
};

export const useTokens = () => {
  const [tokenMap, setTokenMap] = useState(new Map());
  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();
      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      }, new Map()));
    });
  }, []);

  const getTokenMetadata = (mintAddress) => {
    let metadata = tokenMap.get(mintAddress)
    if (metadata)
      return metadata
  }

  return { getTokenMetadata };
}