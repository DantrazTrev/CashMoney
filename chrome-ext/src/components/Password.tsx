import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';
import { validatePassword } from '../utils/middleware';
import { Account } from '@solana/web3.js';

const style = {
    position: 'absolute' as 'absolute',
    top: '70px',
    left: '50px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    account: Account
}

export default function Password(props: Props) {
    const handleClose = () => props.setOpen(false);
    const [error, setError] = React.useState(false)
    const [mnemonic, setMnemonic] = React.useState('')

    const passwordRef = React.useRef<HTMLInputElement | undefined>()
    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (passwordRef.current?.value)
                        validatePassword(passwordRef.current.value).then((val) => {
                            setError(false)
                            setMnemonic(val.mnemonic)
                        }).catch(() => {
                            setError(true)

                        })
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {mnemonic === '' ? <TextField id="password" type="password"
                        inputRef={passwordRef}
                        error={error}
                        label="Password" variant="outlined" /> : <>
                        <Typography align='center' color={'white'}>Mnemonic</Typography>
                        <Typography color={'white'}>{mnemonic}</Typography>
                        <Typography align='center' color={'white'}>Private Key</Typography>
                        <Typography maxWidth={200} sx={{ wordWrap: 'break-word' }} height={200} color={'white'}>{props.account.secretKey.toString('hex')}</Typography></>}

                </Box>


            </Modal>
        </div >
    );
}