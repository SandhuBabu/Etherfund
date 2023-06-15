import React from 'react'
import './Switch.css'

const Switch = (props) => {
    return (
        <>
            <label className='switch-track'>
                <input
                    type="checkbox"
                    className="theme-switch"
                    onChange={props.onChange}
                    checked = {props.checked}
                />
                <span className="switch-tip"></span>
            </label>
        </>
    )
}

export default Switch
