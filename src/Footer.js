import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__quote">
               <div className="footer__quote--heading">
                 sassyDevs
               </div>
               <div className="footer__quote--text">
               We create possibilities for the connected world. Step Up
               </div>
            </div>
            <div className="footer__explore">
               <div className="footer__explore--heading heading-3"> 
                   EXPLORE
                </div>
                <div className="footer__explore--list">
                    <ul className="list">
                        <li className="list__item"><a href="https://sassydevs.com" className="list__link">HOME</a></li>
                        <li className="list__item"><a href="https://sassydevs.com/about" className="list__link">ABOUT</a></li>
                        <li className="list__item"><a href="https://sassydevs.com/projects" className="list__link">PROJECTS</a></li>
                        <li className="list__item"><a href="https://sassydevs.com/blog" className="list__link">BLOG</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer__contact">
                <div className="footer__contact--heading heading-3">
                   REACH US
                </div>

                 <div className="footer__contact--list">
                    <ul className="list">
                        <li className="list__item"><a href="#" className="list__link">LINKEDIN</a></li>
                        <li className="list__item"><a href="#" className="list__link">FACEBOOK</a></li>
                        <li className="list__item"><a href="#" className="list__link">TWITTER</a></li>
                        <li className="list__item"><a href="#" className="list__link">SLACK</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__stayConnected">
                <div className="footer__stayConnected--heading heading-3"> 
                   STAY CONNECTED
                </div>

                <div className="footer__stayConnected--form">
                    
                    Got a query? <br />
                    Or want some Inbox love?
                    <form className="connect-form">
                       <label htmlFor="emailInput"><span className="work-around2">Email : </span></label>
                        <input id="emailInput" className="connect-form-input" placeholder="Your Email Here"/>
                        <button onClick={(e)=>{e.preventDefault()}} className="submit-button" type="submit">Submit</button>
                    </form>
                
                 </div>
            </div>
        </footer>

    );
}

export default Footer;