import { Box, List, ListItem } from '@mui/material';
import { Account } from '@solana/web3.js';
import React, { useState } from 'react'
import { ConnectionContext } from '../providers/connections';
import { getTransactions } from '../utils/tranx';

interface Props {
    account: Account | undefined
}


function Balances(props: Props) {


    const [transactions, setTx] = useState<any[]>([])
    const { connection } = React.useContext(ConnectionContext);

    React.useEffect(() => {
        if (props.account && connection) {
            getTransactions(props.account.publicKey, connection).then((bal) => {
                setTx(bal)
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

            </Box>
            <List>
                {transactions.map((item: any) => {

                    return (<ListItem></ListItem>)
                })}
            </List>
        </Box>
    )
}

export default Balances