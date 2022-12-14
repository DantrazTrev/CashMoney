import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import { Button } from '@mui/material';
import { uid } from 'uid'
import { LockEvent } from '../utils/events';
import { createWallet } from '../utils/middleware';

function CreateWallet() {
    const password = useRef<HTMLInputElement | undefined>()
    const [mnemonic, setmnemoic] = useState('')

    if (mnemonic) {
        return (<Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                width: 400,
                height: 400,
            }
            }
        >
            <Header text={"Please Save this code"} />
            <span style={{ color: 'white', margin: '20px' }}> {mnemonic}</span>
            <Button onClick={() => {
                let unq = uid(12)
                localStorage.setItem('account', unq)
                window.dispatchEvent(LockEvent)

            }} color='primary' variant="contained">Continue</Button>
        </Box >)
    }

    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                if (password.current?.value) {
                    createWallet(password.current?.value).then(({ mnemonic, seed, account }) => {
                        setmnemoic(mnemonic)
                        console.log(account)
                    })


                }
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                width: 400,
                height: 400,
            }}
            noValidate
            autoComplete="off"
        >
            <Header text={"Create Password"} />
            <TextField id="password" type="password"
                label="Password" inputRef={password} variant="outlined" />
        </Box>
    );
}

export default CreateWallet;
