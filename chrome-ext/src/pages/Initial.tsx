import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import CreateWallet from './CreateBox';
enum Pages {
    Init,
    Create,
    Import
}


function Initial() {
    const [page, setPage] = useState(Pages.Init)
    if (page === Pages.Create)
        return <CreateWallet />
    else
        return (
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{
                    '& button': { m: 1 },
                    width: 400,
                    height: 400,
                }}
                noValidate
                autoComplete="off"
            >
                <Header text='cash money Yo' />
                <Button onClick={() => {
                    setPage(Pages.Create)
                }} color='primary' variant="contained">Create a new Wallet</Button>
                <Button onClick={() => {
                    setPage(Pages.Import)
                }} color='primary' variant="contained">Import a wallet</Button>
            </Box>
        );


}

export default Initial;
