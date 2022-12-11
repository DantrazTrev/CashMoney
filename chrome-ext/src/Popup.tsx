import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Lock from './pages/Lock';
import Wallet from './pages/Wallet';
import Inital from './pages/Initial';

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
  const LockListener = () => {
    setFirstUse(false);
    setLocked(true)
  }
  const UnlockListener = () => {
    console.log("UNLOCK")
    setFirstUse(false);
    setLocked(false)
  }
  useEffect(() => {
    let account = localStorage.getItem('account');
    if (account) {
      setFirstUse(false)
    }
    window.addEventListener('lock', LockListener);
    window.addEventListener('unlock', UnlockListener);

    return () => {
      window.removeEventListener('lock', LockListener);
      window.removeEventListener('unlock', UnlockListener);

    }
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {firstUse ? <Inital /> :
          locked ?
            <Lock />
            : <Wallet />}
      </div>
    </ThemeProvider >

  );
}

export default App;
