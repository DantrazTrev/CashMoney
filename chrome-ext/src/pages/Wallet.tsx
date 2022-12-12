import React, { useContext, useEffect } from 'react';
import '../App.css';
import WalletUI from '../components/Walletui';
import { ConnectionProvider } from '../providers/connections';
import { WalletContext } from '../providers/wallet';


function WalletBase() {



    return (
        <ConnectionProvider>
            <header className="App-header">
            </header>
            <WalletUI />
        </ConnectionProvider >

    );
}

export default WalletBase;
