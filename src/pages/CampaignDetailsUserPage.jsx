import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// components
import CampaignDetailsUser from '../components/CampaignDetailsUser/CampaignDetailsUser'
import Footer from '../components/Footer/Footer'

// contexts
import { ContractWeb3Context } from '../context/ContractWeb3Context';


const CampaignDetailsUserPage = () => {
  const {contract, web3} = useContext(ContractWeb3Context);
  const {id} = useParams();
  const navigate = useNavigate();

  const [campaignDetails, setCampaignDetails] = useState([]);
  const [moreDetails, setMoreDetails] = useState([]);
  const [amtReq, setAmtReq] = useState(0);
  const [collectedAmt, setCollectedAmt] = useState(0);

  // get campaign details
  useEffect(() => {
    contract && getCampaignAllDetails();
  }, [])

  async function getCampaignAllDetails() {
    try {
      const details = await contract.methods.getCampaignDetails(id).call();

      const campaignMoreDetails = await contract.methods.getCampaignMoreDetails(id).call();
      const amtReqInEth = web3.utils.fromWei(details.amountRequired, 'ether');
      const amtCollectedInEth = web3.utils.fromWei(details.collectedAmount, 'ether');

      setCampaignDetails(details);
      setMoreDetails(campaignMoreDetails);
      setAmtReq(amtReqInEth);
      setCollectedAmt(amtCollectedInEth);
    } catch (err) {
      alert("Error occured while fetching data")
      navigate('/')
    }
  }

  return (
    <>
      <CampaignDetailsUser 
        details={campaignDetails}
        moreDetails={moreDetails}
        reqAmount={amtReq}
        collected ={collectedAmt}
        id={id}
      />
      <Footer />
    </>
  )
}

export default CampaignDetailsUserPage
