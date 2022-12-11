import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import { login } from '../utils/secretboxutils';

function Lock() {
    const passwordRef = useRef<HTMLInputElement | undefined>()
    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                if (passwordRef.current?.value)
                    login(passwordRef.current.value)
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
            <Header text='cash money Yo' />
            <TextField id="password" type="password"
                inputRef={passwordRef}
                label="Password" variant="outlined" />
        </Box>
    );
}

export default Lock;
