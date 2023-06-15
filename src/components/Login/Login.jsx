import React, { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import './Login.css'
// import LoginImg from '../../icons/login-page.svg'

import { AccountContext } from '../../context/AccountContext'

const Login = () => {
    const { account, setAccount } = useContext(AccountContext);

    useEffect(() => {
        let localAccount = localStorage.getItem("account");
        if (localAccount && localAccount !== " ")
            setAccount(localAccount)
    }, [])

    if (account)
        return <Navigate to="/" replace={true} />

    return <h1>Login Please</h1>

}

export default Login
