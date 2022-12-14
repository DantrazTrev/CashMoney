import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Typography } from '@mui/material';
import { validatePassword } from '../utils/middleware';

const style = {
    position: 'absolute' as 'absolute',
    top: '70px',
    left: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    emitTrasnx: Function
}

export default function SendTSX(props: Props) {
    const handleClose = () => props.setOpen(false);
    const [error, setError] = React.useState(false)
    const [errorString, setErrorstring] = React.useState('')

    const passwordRef = React.useRef<HTMLInputElement | undefined>()
    const amountRef = React.useRef<HTMLInputElement | undefined>()
    const toRef = React.useRef<HTMLInputElement | undefined>()

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                component="form"

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField id="amt" type="number"
                        inputRef={amountRef}
                        error={error}
                        label="Amount (SOL) " variant="outlined" />
                    <TextField id="amt" type="text"
                        inputRef={toRef}
                        label="To " variant="outlined" />
                    <TextField id="password" type="password"
                        inputRef={passwordRef}
                        error={error}
                        label="Password" variant="outlined" />
                    <Typography color="red">{errorString}</Typography>
                    <Button onClick={() => {
                        if (passwordRef.current?.value)
                            validatePassword(passwordRef.current.value).then((val) => {
                                setError(false)
                                props.emitTrasnx(toRef.current?.value, amountRef.current?.value).then(() => { }, (e: Error) => { setErrorstring(e.message) })
                            }).catch(() => {
                                setError(true)
                            })

                    }}> Send </Button>
                </Box>
            </Modal>
        </div>
    );
}