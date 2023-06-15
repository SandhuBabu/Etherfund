import React, {useEffect, useState} from 'react'

// component
import Home from '../components/Home/Home'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'

// constants
import { LOAD_TIME } from '../helpers/constants'


const HomePage = () => {
    const [isLoad, setIsLoad] = useState(false);

    //  loading animation
    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME)
    })

    return (
        isLoad?
        <>
            <Home />
            <Footer />
        </>
        :
        <Loader />
    )
}

export default HomePage
