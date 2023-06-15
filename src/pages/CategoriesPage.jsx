import React, { useState, useEffect } from 'react'

// components
import Categories from '../components/Categories/Categories'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'

// constants
import { LOAD_TIME } from '../helpers/constants'

const CategoriesPage = () => {
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        document.querySelector('title').innerHTML = 'Etherfund - Categories';
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME);

    }, []);

    return (
        isLoad ?
            <>
                <Categories />
                <Footer />
            </>
            :
            <Loader />
    )
}

export default CategoriesPage
