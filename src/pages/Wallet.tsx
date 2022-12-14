import React, { useContext, useEffect } from 'react';
import '../App.css';
import WalletUI from '../components/Walletui';
import { ConnectionProvider } from '../providers/connections';
// @ts-ignore  



function WalletBase() {
    return (
        <ConnectionProvider>
            <main className="App-header">
                <WalletUI />

            </main>
        </ConnectionProvider >

    );
}

export default WalletBase;
