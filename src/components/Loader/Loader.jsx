import React from 'react'

function Loader() {
    return (
        <div className='loader-container'>
            <svg className='loader' viewBox='0 0 50 50'>
                <circle
                    className='loader-circle'
                    cx='25'
                    cy='25'
                    r='20'
                />
            </svg>
        </div>
    )
}

export default Loader
