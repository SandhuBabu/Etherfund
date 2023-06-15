import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// contexts
import { ContractWeb3Context } from '../../context/ContractWeb3Context'
import { CampaignsContext } from '../../context/CampaignsContext'

// components
import CampaignCard from '../CampaignCard/CampaignCard'

// constants
import { LINKS } from '../../helpers/constants'

const Home = () => {
    const { contract } = useContext(ContractWeb3Context);
    const { campaigns } = useContext(CampaignsContext);

    
    const [eduCampaigns, setEduCampaigns] = useState([]);
    const [medCampaigns, setMedicalCampaigns] = useState([]);

    useEffect(() => {
        const educationCampaigns = campaigns.filter(campaign => campaign[6] === 'Education' );
        setEduCampaigns(educationCampaigns);

        const medicalCampaigns = campaigns.filter(campaign => campaign[6] === 'Medical');
        setMedicalCampaigns(medicalCampaigns);
    }, []);


    if (contract === '' || contract === undefined)
        return <h1>No Contracts Available</h1>

    return (
        <section className="home-container">
            <div className="campaigns-home-container">
                <h1 className='heading-campaign-type'>New Campaigns</h1>
                <div className="campaigns-home">
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 3]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                </div>
                <span className='show-more-campaigns-home'>
                    <Link to={LINKS[0].path}>Show More</Link>
                </span>
            </div>

            {
                eduCampaigns &&
                <div className="campaigns-home-container">
                    <h1 className='heading-campaign-type'>Educational Campaigns</h1>
                    <div className="campaigns-home">
                        <CampaignCard campaign={eduCampaigns[0]} />
                        <CampaignCard campaign={eduCampaigns[1]} />
                        <CampaignCard campaign={eduCampaigns[2]} />
                        <CampaignCard campaign={eduCampaigns[3]} />
                        <CampaignCard campaign={eduCampaigns[4]} />
                    </div>
                    <span className='show-more-campaigns-home'>
                        <Link to={LINKS[2].path}>Show More</Link>
                    </span>
                </div>
            }

            {
                medCampaigns &&
                <div className="campaigns-home-container">
                    <h1 className='heading-campaign-type'>Medical Campaigns</h1>
                    <div className="campaigns-home">
                        <CampaignCard campaign={medCampaigns[0]} />
                        <CampaignCard campaign={medCampaigns[1]} />
                        <CampaignCard campaign={medCampaigns[2]} />
                        <CampaignCard campaign={medCampaigns[3]} />
                        <CampaignCard campaign={medCampaigns[4]} />
                    </div>
                    <span className='show-more-campaigns-home'>
                        <Link to={LINKS[1].path}>Show More</Link>
                    </span>
                </div>
            }
        </section>
    )
}

export default Home
