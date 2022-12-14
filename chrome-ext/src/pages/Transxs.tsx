import { Box, Button, List, ListItem } from '@mui/material';
import { Account } from '@solana/web3.js';
import React, { useState } from 'react'
import Header from '../components/Header';
import Transx from '../components/Transx';
import { ConnectionContext } from '../providers/connections';
import { getTransactions } from '../utils/tranx';

interface Props {
    account: Account | undefined
}


function Transxs(props: Props) {


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
                    marginTop: 2,

                }}>
                <Header text={"Recent Transcations"} />
            </Box>

            <List sx={{ maxHeight: '400px', overflow: "scroll" }}>
                {transactions.map((transx) => {
                    return (
                        <ListItem key={transx.signature} >  <Transx transaction={transx} account={props.account} /></ListItem>
                    )
                })}

                <ListItem sx={{ justifyContent: 'center' }} key='all'><Button onClick={() => { window.open(`https://solscan.io/account/${props.account?.publicKey.toString()}`) }}>All Transactions</Button></ListItem>

            </List>
        </Box>
    )
}

export default Transxs