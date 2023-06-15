import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ContractWeb3Provider } from './context/ContractWeb3Context';
import { CampaignsContextProvider } from './context/CampaignsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContractWeb3Provider>
        <CampaignsContextProvider>
            <App />
        </CampaignsContextProvider>
    </ContractWeb3Provider>
);

