import React, { ReactNode } from 'react';
import { Connection } from '@solana/web3.js';

const ConnectionContext = React.createContext<{
  connection: Connection;
} | null>(null);

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export const ConnectionProvider = (props: Props) => {
  const connection = new Connection(
    'https://little-clean-snowflake.solana-mainnet.discover.quiknode.pro/e9d3555577675c8162c59ad40f155cbeba3aaa3b/',
    'single'
  );
  return (
    <ConnectionContext.Provider value={{ connection }}>
      {props.children}
    </ConnectionContext.Provider>
  );
};
