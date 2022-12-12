import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { WalletContext } from '../providers/wallet';
import { ConnectionContext } from '../providers/connections';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
export default function WalletUI() {
    const [tab, setTab] = React.useState(0);
    const [accIdx, setaccidx] = React.useState(0);
    const [solbalance, setSolbalance] = React.useState(0);

    const { wallet } = React.useContext(WalletContext);
    const { connection } = React.useContext(ConnectionContext);


    React.useEffect(() => {
        if (wallet && connection) {
            if (wallet.accounts[accIdx] !== undefined)
                connection.getBalance(wallet.accounts[accIdx].publicKey).then((balance: any) => {
                    setSolbalance(balance / LAMPORTS_PER_SOL)
                });
            (async () => {
                const MY_WALLET_ADDRESS = wallet.accounts[accIdx].publicKey.toString();

                const accounts = await connection.getParsedProgramAccounts(
                    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
                    {
                        filters: [
                            {
                                dataSize: 165, // number of bytes
                            },
                            {
                                memcmp: {
                                    offset: 32, // number of bytes
                                    bytes: MY_WALLET_ADDRESS, // base58 encoded string
                                },
                            },
                        ],
                    }
                );
                console.log(accounts, 'TRR')
            })();
        }
    }, [])


    return (
        <Box sx={{ width: 400 }}>
            <BottomNavigation
                showLabels
                value={tab}
                onChange={(event, newValue) => {
                    setTab(newValue);
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
                <BottomNavigationAction label="Transactions" icon={<ReceiptLongRoundedIcon />} />
            </BottomNavigation>
        </Box>
    );
}