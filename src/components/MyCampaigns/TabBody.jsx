import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const TabBody = ({ campaigns }) => {
    const [load, setLoad] = useState(false);
    
    useEffect(() => {
        console.warn(campaigns)
        setTimeout(() => {
            setLoad(true);
        }, 700)
    }, [])

    return (
        <div className="tab-body">
            {
                campaigns.length > 0 && campaigns.slice().reverse().map(campaign => {
                    return (
                        <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
                            <div className={load ? "tab-img-container" : "tab-img-container skeleton"}>
                                <img style={{ visibility: load ? 'visible' : 'hidden' }} src={campaign.imageURL} alt="" />
                                {load && <p className='tab-img-desc text-overflow-hide'>{campaign.title}</p>}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default TabBody
