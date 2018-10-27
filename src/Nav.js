import React from 'react';
import  './Nav.css';
import {Link} from 'react-router-dom';

const Nav =(props) => {
  
    return (
      <nav className="nav">
        <div className="nav__menu">
          <div className="nav__menu-sassyNewsLogo">
            <div className="nav__menu-elem">
              <Link to='/'><button className="nav__menu-elem--btn sassyNewsLogo" name="TOP" onClick={props.clickNav}>sassyNews</button></Link>        
            </div>
          </div>
          <div className="nav__menu-sassyNewsItems">
            <div className="nav__menu-elem">
              <Link to='/'><button className="nav__menu-elem--btn" name="NEW" onClick={props.clickNav}>Latest</button></Link>
            </div>
            <div className="nav__menu-elem">
              <Link to='/'><button className="nav__menu-elem--btn" name="SHOW" onClick={props.clickNav}>Show</button></Link>
            </div>
            <div className="nav__menu-elem">
              <Link to='/'><button className="nav__menu-elem--btn" name="ASK" onClick={props.clickNav}>Ask</button></Link>
            </div>
            <div className="nav__menu-elem">
              <Link to='/'><button className="nav__menu-elem--btn" name="JOB" onClick={props.clickNav}>Jobs</button></Link>
            </div>
            <div className="nav__menu-elem">
              <Link to='/about'><button className="nav__menu-elem--btn" name="job" >About</button></Link>
            </div>
          </div>
        </div>
      </nav>
    );
  
}

export default Nav;
