import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import {AccountContext} from '../../context/AccountContext'

// icons
import { FaUserAlt, FaWallet } from 'react-icons/fa'

const Profile = () => {
    const navigate = useNavigate();
    const {account, setAccount} = useContext(AccountContext);
    
    function handleLogout() {
        localStorage.setItem("account", "");
        setAccount(undefined)
        navigate("/")
    }

    return <>
        <div className='profile-details-container'>
            <div className="profile-details">
                <p className="details-account-wallet text-bold">
                    <span className='yellow-text'>
                        <FaUserAlt />
                    </span>
                    {account.substring(0, 4) + "*******" + account.substring(account.length - 4)}
                </p>
                <p className="details-account-wallet text-bold">
                <span className='yellow-text'>
                        <FaWallet />
                    </span>
                    80 ETH
                </p>
            </div>
            <div className="profile-details logout-sec">
                <button className='logout-btn text-bold' onClick={handleLogout}>logout</button>
            </div>
        </div>
    </>
}

export default Profile
