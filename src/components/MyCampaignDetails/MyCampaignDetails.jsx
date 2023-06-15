import React from 'react'
import './MyCampaignDetails.css'

// component
import ResponsiveProgressBar from '../ResponsiveProgressBar/ResponsiveProgressBar'


// helpers
import { timestampToDate } from '../../helpers/helper'


const MyCampaignDetails = ({ details, moreDetails, withdrawStatus, reqAmount, collected, requestVote, withdrawEther }) => {

    return (
        <div className='campaign-details-card-wrapper'>
            <div className="product-card">
                <img src={details.imageURL} alt="Campaign" />
                <div className="product-details">
                    <h2>{details.title}</h2>
                    <p className="category">Category : {details.category}</p>
                    <p className="description">{details.desc}</p>
                    {collected >= reqAmount && <p className="goal-achieved-msg">Goal achieved!</p>}

                    <p className="contribute-before">Deadline : {timestampToDate(details.deadline)}</p>

                    <ResponsiveProgressBar reqAmount={reqAmount} collected={collected} />

                    <div className="buttons">
                        {
                            moreDetails.isRequestedToVote === false && moreDetails.isGoalAchieved &&
                            <button className="contribute-now" onClick={(e) => {
                                e.target.innerHTML = "Requesting...";
                                let res = requestVote();
                                if (res)
                                    e.target.style.display = "none";
                            }}>Request Vote</button>
                        }
                        {
                            moreDetails.isRequestedToVote && moreDetails.isGoalAchieved && withdrawStatus !== true && !details.isCompleted &&
                            <p className='text-p btn-text' style={{ marginTop: '1em' }}>Waiting for votes!</p>
                        }

                        {
                            withdrawStatus === true && details.noOfVoters >=1 &&
                            <button className="contribute-now" onClick={(e)=>{
                                let res = withdrawEther();
                                if(res)
                                    e.target.style.display = 'none'
                            }}>Withdraw</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyCampaignDetails
