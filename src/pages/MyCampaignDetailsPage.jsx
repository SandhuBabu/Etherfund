import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'

// components
import MyCampaignDetails from '../components/MyCampaignDetails/MyCampaignDetails';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader'

// contexts
import { ContractWeb3Context } from '../context/ContractWeb3Context';
import { AccountContext } from '../context/AccountContext';


const MyCampaignDetailsPage = () => {

  const { contract, web3 } = useContext(ContractWeb3Context);
  const { account } = useContext(AccountContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaignDetails, setCampaignDetails] = useState([]);
  const [moreDetails, setMoreDetails] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState(false);
  const [amtReq, setAmtReq] = useState(0);
  const [collectedAmt, setCollectedAmt] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  // get campaign details
  useEffect(() => {
    contract && getCampaignAllDetails();
    if (!account || account === "")
      navigate("/")
  }, [])

  async function getCampaignAllDetails() {
    try {
      const details = await contract.methods.getCampaignDetails(id).call();
      if (account.toLowerCase() !== details.fundRaiser.toLowerCase())
        navigate('/')

      const campaignMoreDetails = await contract.methods.getCampaignMoreDetails(id).call();
      const status = await contract.methods.getWithdrawStatus(id).call();
      const amtReqInEth = web3.utils.fromWei(details.amountRequired, 'ether');
      const amtCollectedInEth = web3.utils.fromWei(details.collectedAmount, 'ether');

      setCampaignDetails(details);
      setMoreDetails(campaignMoreDetails);
      setWithdrawStatus(status);
      setAmtReq(amtReqInEth);
      setCollectedAmt(amtCollectedInEth);

      setIsLoad(true);
    } catch (err) {
      alert("Error occured while fetching data")
      navigate('/')
      console.warn("error")
    }
  }

  async function requestVote() {
    if (!account || account === "")
      return

    try {
      await contract.methods.requestVote(parseInt(id))
        .send({
          from: account,
          gas: 200000
        });
      return true;
    } catch (err) {
      alert("Error occured while requesting");
      console.warn("error");
      return false;
    }
  }

  async function withdrawEther() {
    if (!account || account === "")
      return false;

    try {
      await contract.methods.withdrawEther(parseInt(id))
        .send({
          from: account,
          gas: 200000
        });
      return true;
    } catch (err) {
      alert("Error occured while transfering fund");
      console.warn("error");
      return false;
    }
  }

  return (
    isLoad ?
      <>
        <MyCampaignDetails
          details={campaignDetails}
          moreDetails={moreDetails}
          reqAmount={amtReq}
          collected={collectedAmt}
          withdrawStatus={withdrawStatus}
          requestVote={requestVote}
          withdrawEther={withdrawEther}
        />
        <Footer />
      </>
      :
      <Loader />
  )
}

export default MyCampaignDetailsPage
