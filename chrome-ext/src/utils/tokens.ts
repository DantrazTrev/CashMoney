import { PublicKey } from '@solana/web3.js';
import { TokenInstructions } from '@project-serum/serum';

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
