import React, {createContext, useState} from 'react'

export const CampaignsContext = createContext(null);

export const CampaignsContextProvider = ({children}) => {
    const [campaigns, setCampaigns] = useState([]);

    return(
        <CampaignsContext.Provider value={{campaigns, setCampaigns}}>
            {children}
        </CampaignsContext.Provider>
    )
}