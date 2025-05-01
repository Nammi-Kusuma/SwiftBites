import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='f-img' src={assets.SwiftBitesrbg} alt="" />
                <p>Find your favorite meals and restaurants in one tap.</p>
                <div className="footer-socials">
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><a href='#app'>Home</a></li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9876543210</li>
                    <li>contact@swiftbites.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>
            Copyright 2025 &copy; SwiftBites.com - All rights Reserved.
        </p>
    </div>
  )
}

export default Footer
