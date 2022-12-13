import { Box, List } from '@mui/material';
import { Account } from '@solana/web3.js';
import React from 'react'
import { ConnectionContext } from '../providers/connections';
import { getBalance, getSolBalance, Token } from '../utils/middleware';
import Accounts from './Accounts';
import Header from './Header';

interface Props {
    account: Account | undefined
}


function Balances(props: Props) {

    const [solBalance, setSolBalance] = React.useState<Token>({ token: 0, value: 0, name: 'solana' });
    const [splBalance, setSplBalance] = React.useState<Token[]>([]);

    const totalBalance = React.useMemo(() => {
        let totalBalance = 0
        totalBalance += solBalance.value;
        splBalance.forEach((token: Token) => {
            totalBalance += token.value
        })
        return totalBalance
    }, [solBalance, splBalance])
    const { connection } = React.useContext(ConnectionContext);

    React.useEffect(() => {
        if (props.account && connection) {
            getBalance(props.account, connection).then((bal) => {
                console.log(bal, 'ERER')
                if (bal && bal.solana)
                    setSolBalance(bal.solana)
            })
        }


    }, [props.account])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'space-between'
            }}
        >
            <Box
                sx={{
                    marginTop: 5,

                }}>
                <Header text={`$ ${totalBalance}`} />
            </Box>
            <List>

            </List>
        </Box>
    )
}

export default Balances