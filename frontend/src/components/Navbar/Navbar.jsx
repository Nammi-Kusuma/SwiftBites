import React, { Profiler, useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom';
import { ContextStorage } from '../../context/ContextStorage.jsx';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const { cartTotal, token, setToken } = useContext(ContextStorage);

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.SwiftBitesrbg} alt="" className='logo' /></Link>
      <ul className="nav-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile")} className={menu === "mobile" ? "active" : ""}>Mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="nav-search">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={cartTotal()===0?"":"dot"}></div>
        </div>

        {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>:<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="profile-dropdown">
            <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>
          </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar
