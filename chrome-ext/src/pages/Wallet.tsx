import React from 'react';
import '../App.css';
import BottomNav from '../components/BottomNavigation';
import { ConnectionProvider } from '../utils/connections';

function Wallet() {
    return (
        <ConnectionProvider>
            <header className="App-header">
            </header>
            <BottomNav />
        </ConnectionProvider >
    );
}

export default Wallet;
