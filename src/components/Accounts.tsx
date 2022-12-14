import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Wallet } from '../utils/wallet';

interface Props {
    accIdx: number,
    wallet: Wallet | null,
    setAcc: React.Dispatch<React.SetStateAction<number>>

}

export default function Accounts(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Accounts
            </Button>
            <span style={{
                fontSize: '8px',
                display: 'block',
                fontWeight: '800'
            }}>{props.wallet?.accounts[props.accIdx].publicKey.toString()}</span>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {props.wallet?.accounts && props.wallet.accounts.map((acc, idx) => {
                    let publickey = acc.publicKey.toString()
                    return (<MenuItem selected={props.accIdx === idx} key={publickey} onClick={() => { props.setAcc(idx); handleClose() }}>{publickey}</MenuItem>
                    )
                })}
                <MenuItem onClick={() => { props.wallet?.addAccount() }}>Add Account</MenuItem>
            </Menu>
        </div>
    );
}

