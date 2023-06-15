import React,{ createContext, useState } from "react";

export const ContractWeb3Context = createContext({contract:null, web3:null});

export const ContractWeb3Provider = ({children}) => {
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);

    return(
        <ContractWeb3Context.Provider value={{contract, setContract, web3, setWeb3}}>
            {children}
        </ContractWeb3Context.Provider>
    )
}