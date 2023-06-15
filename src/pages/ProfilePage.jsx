import React, { useState, useEffect } from 'react'
// import { Navigate } from 'react-router-dom'

// components
import MyCampaigns from '../components/MyCampaigns/MyCampaigns'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'
import Profile from '../components/Profile/Profile'

// contexts
// import { AccountContext } from '../context/AccountContext'

// constants
import { LOAD_TIME } from '../helpers/constants'

const ProfilePage = () => {
  // const { account } = useContext(AccountContext);

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    document.querySelector('title').innerHTML = 'Etherfund - Profile'
    setTimeout(() => {
      setIsLoad(true)
    }, LOAD_TIME)
  }, []);

  // if (account === '' || account === undefined)
  //   return <Navigate to="/login" />


  return (
    isLoad ?
      <>
        <Profile />
        <MyCampaigns />
        <Footer />
      </>
      :
      <Loader />

  )
}

export default ProfilePage
