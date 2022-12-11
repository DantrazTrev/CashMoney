import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import { createSecretBox, createMnS, MnemonicAndSeed } from '../utils/secretboxutils';


function CreateWallet() {
    const password = useRef<HTMLInputElement | undefined>()

    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                if (password.current?.value) {
                    createMnS().then((val: MnemonicAndSeed) => {
                        let { mnemonic, seed } = val
                        createSecretBox(mnemonic, seed, password.current?.value!)
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
