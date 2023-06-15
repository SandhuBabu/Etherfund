import React from 'react'
import { useParams } from 'react-router-dom'
import './Campaigns.css'

// component
import CampaignCard from '../CampaignCard/CampaignCard'

const Campaigns = ({ campaigns }) => {
    const { category } = useParams();


    return (
        campaigns.length > 0 &&
        <section className='category-container'>
            <h1>Campaigns : {category}</h1>
            <div className="category-cards-container">
                {
                    campaigns.slice().reverse().map((campaign, key) => <CampaignCard key={key} campaign={campaign} />)
                }
            </div>
        </section >

    )
}

export default Campaigns
