import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './CampaignCard.css'

// context
import { ContractWeb3Context } from '../../context/ContractWeb3Context'
import { AccountContext } from '../../context/AccountContext'

import { weiToEther } from '../../helpers/helper'

const CampaignCard = ({ campaign }) => {
    const { web3 } = useContext(ContractWeb3Context);
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();



    return (
        campaign &&
        <div className="campaign-card">
            <p></p>
            <div className="campaign-img-container">
                <img src={campaign.imageURL} alt="" />
            </div>

            <div className="campaign-card-details">
                <h1 className="campaign-card-title text-overflow-hide">{campaign.title}</h1>

                <p className="campaign-card-description text-overflow-hide">
                    {campaign.desc}
                </p>

                <div className="campaign-card-progress">
                    <div className="progress-amount-details">
                        <span>Collected: <span className="text-bold">{weiToEther(web3, campaign.collectedAmount)} ETH</span></span>
                        <span>Total: <span className="text-bold">{weiToEther(web3, campaign.amountRequired)} ETH</span></span>
                    </div>
                    <div className="campaign-card-progress-bar"><span style={{
                        width: ((
                            weiToEther(web3, campaign.collectedAmount) / weiToEther(web3, campaign.amountRequired)
                        ) * 100) + "%"
                    }}></span></div>
                </div>

                <div className="view-campaign-btn-container">
                    <button
                        id='view-campaign'
                        onClick={() => {
                            if(account && account!=="" && campaign.fundRaiser.toLowerCase() === account.toLowerCase())
                                navigate(`/mycampaign/${campaign.id}`)
                            else
                                navigate(`/campaign/${campaign.id}`)
                        }}
                    >
                        View Campaign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard