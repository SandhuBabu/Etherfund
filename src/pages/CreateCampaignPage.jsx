import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

// components
import CampaignForm from '../components/CampaignForm/CampaignForm'
import Loader from '../components/Loader/Loader'
import Footer from '../components/Footer/Footer'

// context
import { AccountContext } from '../context/AccountContext'
import { ContractWeb3Context } from '../context/ContractWeb3Context'

// images
import RaiseFund from '../assets/images/raise-fund.svg'

// constant
import { LOAD_TIME } from '../helpers/constants'

const CreateCampaignPage = () => {
  const { account } = useContext(AccountContext);
  const { contract, web3 } = useContext(ContractWeb3Context);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    document.querySelector('title').innerHTML = 'Etherfund - Create Campaign'
    setTimeout(() => {
      setIsLoad(true)
    }, LOAD_TIME)
  }, []);

  if (account === '')
    return <Navigate to="/login" />

  return (
    isLoad ?
      <>
        <section className='create-campaign-container'>
          <div className="form-left">
            <CampaignForm account={account} contract={contract} web3={web3} />
          </div>
          <div className="form-right">
            <img src={RaiseFund} alt="Create a campaign" />
          </div>
        </section>
        <Footer />
      </>
      :
      <Loader />
  )
}

export default CreateCampaignPage
