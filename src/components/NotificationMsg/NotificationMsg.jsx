import React, { useEffect } from 'react'
import './NotificationMsg.css'

const NotificationMsg = ({content}) => {
    useEffect(() => {
        let element = document.querySelector('.notfication-msg-container')
        setTimeout(()=>{
            element.style.right='0.5em'
        }, 0)

        return() => {
            element.style.right = '-15em';
        }

    }, [])
    return (
        <div className='notfication-msg-container' onClick={()=>{
            document.querySelector('.notfication-msg-container').style.display = 'none'
        }}>
            <span className='notification-content text-overflow-hide'>
                {content.substring(0, 35)}...
            </span>
        </div>
    )
}

export default NotificationMsg
