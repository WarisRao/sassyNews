import React from 'react';
import './About.css';

class About extends React.Component {
  render() {
    return (
          <div className="about">
            <div className="about__heading">
              Technologies Used
            </div>
            <div className="about__list" >
              <ul className="about__ul">
                <li className="about__ul-li" ><span class="tech-title">React.js</span> ⇢ <span class="tech-description">Javascript library for Front-End from Facebook.</span></li>
                <li className="about__ul-li" ><span class="tech-title">Node.js</span> ⇢ <span class="tech-description"> Javascript runtime for Back-End.</span></li>
                <li className="about__ul-li" ><span class="tech-title">Firebase</span> ⇢ <span class="tech-description">Real-time database from Google </span></li>
                <li className="about__ul-li" ><span class="tech-title">GraphQL</span> ⇢ <span class="tech-description"> Query language for APIs from Facebook</span> </li>
                <li className="about__ul-li" ><span class="tech-title">Apollo</span> ⇢ <span class="tech-description">React-Apollo to connect GraphQL with React and Apollo engine to make GraphQL server.</span></li>
              </ul>
            </div>
            <p className="about__content" >
              This app is based on Hacker News public api.
              Data is first retrieved from Hacker News public database 
              which is hosted on Firebase,and then it is stored in GraphQL server.
              Client interacts with React and fetch data through React-GraphQL
              which recieves data from GraphQL server and then React updates the UI. 
            </p>
            <div className="about__description" >
              React  ⇢  Apollo ⇢ GraphQL ⇢ Firebase 
            </div>
          </div>
    );
  }
}

export default About;
