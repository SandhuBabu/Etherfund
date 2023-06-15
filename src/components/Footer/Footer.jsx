import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

// icons
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer>
            <div className="foot-details">
                <div className="foot-left">
                    <h1>Etherfund</h1>
                    <address>
                        ABC Building <br />
                        Abc Road <br />
                        Kerala, Kottayam, 686663
                    </address>
                    <p><span className='icon-phone-mail'><MdOutlineEmail /></span> <span style={{color:'var(--primary)'}}>etherfund2022@gmail.com</span></p>
                    <p><span className='icon-phone-mail'><BsTelephone /></span> <span style={{color:'var(--primary)'}}>+91 9876543210</span></p>
                </div>

                <div className="foot-right">
                    <p><Link to='/'>About Etherfund</Link></p>
                    <p><Link to='/'>How it works?</Link></p>
                    <p><Link to='/'>What is crowdfunding and why Etherfund?</Link></p>
                </div>
            </div>
            <div className='footer-copyright'>
                &nbsp;
                &copy; 
                {new Date().getFullYear()}
                &nbsp;
                Etherfund
            </div>
        </footer>
    )
}

export default Footer
