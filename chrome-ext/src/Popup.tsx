import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Lock from './pages/Lock';
import WalletBase from './pages/Wallet';
import Inital from './pages/Initial';
import { WalletContext } from './providers/wallet';
import { Wallet } from './utils/wallet';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A2BE2',
      dark: '#8A2BE2',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Trebuchet MS',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
      fontFamily: 'Trebuchet MS'

    }
  }
});

function App() {
  const [locked, setLocked] = useState(true)
  const [firstUse, setFirstUse] = useState(true)
  const wallet = useRef<Wallet | null>(null)

  const LockListener = () => {
    setFirstUse(false);
    setLocked(true)
  }
  const UnlockListener = (e: any) => {
    setFirstUse(false);
    setLocked(false)
    console.log(e)
    wallet.current = e.detail
  }
  useEffect(() => {
    let account = localStorage.getItem('account');
    if (account) {
      setFirstUse(false)
    }
    window.addEventListener('lock', LockListener);
    window.addEventListener('unlock', UnlockListener);

    return () => {
      wallet.current = null

      window.removeEventListener('lock', LockListener);
      window.removeEventListener('unlock', UnlockListener);

    }
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <WalletContext.Provider value={{ wallet: wallet.current }}>
        <div className="App">
          {firstUse ? <Inital /> :
            locked ?
              <Lock />
              : <WalletBase />}
        </div>
      </WalletContext.Provider >
    </ThemeProvider >
  );
}

export default App;
