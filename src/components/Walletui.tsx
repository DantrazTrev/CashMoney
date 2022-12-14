import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { WalletContext } from '../providers/wallet';
import { ConnectionContext } from '../providers/connections';
import Balances from './Balances';
import Accounts from './Accounts';
import { Button, Modal } from '@mui/material';
import QR from './QR';
import Transx from '../pages/Transxs';
import Password from './Password';
import { sendTransaction } from '../utils/tranx';
import { PublicKey } from '@solana/web3.js';
import SendTSX from './Send';
import IosShareIcon from '@mui/icons-material/IosShare';
export default function WalletUI() {
    const [tab, setTab] = React.useState(0);
    const [accIdx, setaccidx] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [pass, setPass] = React.useState(false);
    const [trx, setTrx] = React.useState(false);

    const { wallet } = React.useContext(WalletContext);
    const { connection } = React.useContext(ConnectionContext);


    const emitTransx = async (to: string, amt: number) => {
        let key = new PublicKey(to)
        if (wallet)
            await sendTransaction(connection, wallet?.accounts[accIdx], key, amt)

    }

    return (<>
        <span style={{ display: 'flex', alignItems: 'center' }}>  <Accounts accIdx={accIdx}
            wallet={wallet}
            setAcc={setaccidx} />
            <IosShareIcon onClick={() => { setPass(true) }} sx={{ transform: 'translate(42px, 5px)' }} /> </span>
        {tab === 0 && <><Balances account={wallet?.accounts[accIdx]} />
            <span>  <Button
                onClick={() => { setTrx(true) }} color='primary' variant="contained">Send</Button>         <Button color='primary' onClick={() => setOpen(true)} variant="contained" >Recieve</Button></span>
        </>}
        {tab === 1 && <> <Transx account={wallet?.accounts[accIdx]} /></>}
        <QR open={open} setOpen={setOpen} publicKey={wallet?.accounts[accIdx].publicKey.toString()} />
        {wallet && <Password open={pass} setOpen={setPass} account={wallet?.accounts[accIdx]} />}
        <SendTSX open={trx} setOpen={setTrx} emitTrasnx={emitTransx} />
        <BottomNavigation
            showLabels
            value={tab}
            sx={{ position: 'relative', width: 'inherit' }}
            onChange={(event, newValue) => {
                setTab(newValue);
            }}
        >
            <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
            <BottomNavigationAction label="Transactions" icon={<ReceiptLongRoundedIcon />} />
        </BottomNavigation>
    </>
    );


}