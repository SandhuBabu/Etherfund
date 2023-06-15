import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.css'

// constants
import { LINKS } from '../../helpers/constants'

const Categories = () => {
    return (
        <div className="container-category">

            <h1 style={{ margin: '1em 0' }}>Categories</h1>

            <div className="category-cards-wrapper">
                {
                    LINKS.map(({ path, opt }) => {
                        return (
                            <div className="card-category"  key={opt}>
                                <Link to={path} className="card-category">
                                    <div className="category-card-inner">{opt}</div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Categories
