import React from 'react';
import './navigation.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import navMenu from './nav.png';
const Navigation = () => {
    return (
        <nav className="navigation">

        <div className="navigation__logo">
           <a href="https://sassydevs.com"> <img src= {logo} alt ="logo-pic" className="navigation__logo--logo-pic" /> </a>
            <a href="https://sassydevs.com" className="navigation__logo--link"><span className="navigation__logo--logo-text">sassyDevs </span></a>
        </div>

        <div className="navigation__menu">
                    <label htmlFor="drop" className="toggle navigation__menu-icon"><img alt="nav-menu" src={navMenu}/></label>
                    <input type="checkbox" id="drop" />
                    {/* <a href="#" className="navigation__menu-icon"></a> */}
                      <ul className="navigation__menu-ul">
                            <li className="navigation__menu-ul-li "><a href="https://sassydevs.com/projects">Projects</a></li>
                            <li className="navigation__menu-ul-li default-border"><Link to="/">Feed</Link></li>
                            <li className="navigation__menu-ul-li"><a href="https://sassydevs.com/blog">Blog</a></li>
                            <li className="navigation__menu-ul-li"><a href="https://sassydevs.com/about">About</a></li>
                      </ul>
        </div>

    </nav>

    );
}

export default Navigation;