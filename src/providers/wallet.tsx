import React, { ReactNode, useEffect, useRef } from 'react';
import { Wallet } from '../utils/wallet';

export const WalletContext = React.createContext<{
    wallet: Wallet | null;
}>({ wallet: null });

interface Props {
    children?: ReactNode,
    wallet: Wallet
    // any props that come into the component
}


