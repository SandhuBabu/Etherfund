import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './styles.css'

//components
import Campaigns from '../components/Campaigns/Campaigns'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'

// context
import { CampaignsContext } from '../context/CampaignsContext'

// constants
import { LOAD_TIME } from '../helpers/constants'

const CampaignsPage = () => {
    const { campaigns } = useContext(CampaignsContext);
    const { category } = useParams();

    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        document.querySelector('title').innerHTML = `Etherfund - ${category}`
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME);

    }, []);


    let filteredList
    if (category === 'All')
        filteredList = campaigns;
    else
        filteredList = campaigns.filter(campaign => campaign.category === category);

    return (
        isLoad ?
            <>
                {
                    filteredList.length >= 1 ?
                        <Campaigns campaigns={filteredList} />
                        :
                        <div className="no-campaigns">
                            <h1>No Campaigns Found!!!</h1>
                        </div>
                }
                <Footer />
            </>
            :
            <Loader />
    )
}

export default CampaignsPage
