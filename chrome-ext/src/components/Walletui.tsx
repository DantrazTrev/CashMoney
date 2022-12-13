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

export default function WalletUI() {
    const [tab, setTab] = React.useState(0);
    const [accIdx, setaccidx] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { wallet } = React.useContext(WalletContext);
    const { connection } = React.useContext(ConnectionContext);




    return (<>
        <Accounts accIdx={accIdx}
            wallet={wallet}
            setAcc={setaccidx} />

        <Balances account={wallet?.accounts[accIdx]} />
        <span>  <Button color='primary' variant="contained">Send</Button>         <Button color='primary' onClick={() => setOpen(true)} variant="contained" >Recieve</Button></span>
        <QR open={open} setOpen={setOpen} publicKey={wallet?.accounts[accIdx].publicKey.toString()} />
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