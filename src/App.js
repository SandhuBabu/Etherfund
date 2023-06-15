import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import Etherfund from './contracts/Etherfund.json'


// components
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';

// pages
import CreateCampaignPage from './pages/CreateCampaignPage';
import RequestsPage from './pages/RequestsPage';
import HomePage from './pages/HomePage';
import CampaignsPage from './pages/CampaignsPage';
import ProfilePage from './pages/ProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import MyCampaignDetailsPage from './pages/MyCampaignDetailsPage'
import CampaignDetailsUserPage from './pages/CampaignDetailsUserPage';


// contexts
import { AccountProvider } from './context/AccountContext';
import { ContractWeb3Context } from './context/ContractWeb3Context';
import { CampaignsContext } from './context/CampaignsContext'

function App() {
  const { setContract, setWeb3 } = useContext(ContractWeb3Context);
  const { setCampaigns } = useContext(CampaignsContext);


  // for changing theme when loading
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.querySelector('html').id = 'dark'
    }
  }, [])

  // connect to smart contract while loading
  useEffect(() => {
    if (!window.ethereum)
    return alert("No extensions")
    
    // const provider = new Web3.providers.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/4WJN51exbZ1cIyCiLa69oLcZx8gb8LP7"); // rpc server url of ganache
    const provider = window.ethereum
    async function template() {

      const web3Instance = new Web3(provider);
      /*
          To interact with smart contract we need
          i) ABI Code
          ii) Contract Address
      
      */
     
      const deployedNetwork = Etherfund.networks[11155111];

      // instance of smart contract to make interactions
      const contractInstance = new web3Instance.eth.Contract(Etherfund.abi, deployedNetwork.address);

      setContract(contractInstance);
      setWeb3(web3Instance);

      async function getCampaigns() {
        try {
          let allCampaigns = await contractInstance.methods.getIncompleteCampaigns().call();
          setCampaigns(allCampaigns);
        } catch (err) {
          console.warn(err);
        }
      }
      contractInstance && getCampaigns();
    }

    provider && template()
  }, []);


  return (
    <BrowserRouter>
      <AccountProvider>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/campaign/:id' element={<CampaignDetailsUserPage />} />
          <Route exact path='/category' element={<CategoriesPage />} />
          <Route path='/category/:category' element={<CampaignsPage />} />
          <Route path='/createCampaign' element={<CreateCampaignPage />} />
          <Route path='/requests' element={<RequestsPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/mycampaign/:id' element={<MyCampaignDetailsPage />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
