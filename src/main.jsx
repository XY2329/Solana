import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const sdk = new ThirdwebSDK("mumbai", {
  clientId: "caffb1675b2f92561a307790d4109539",
});

const contract = await sdk.getContract("0x3ae62BFB392B7bee8040af1f61E2Fb46599Eba29");

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider sdk={sdk} activeChain="mumbai">
    <Router>
      <StateContextProvider contract={contract}>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
)
