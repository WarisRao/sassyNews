import React from 'react';
import './Home.css';
import Nav from './Nav';
import Feed from './Feed';
import ApolloClient from "apollo-boost";
import {Switch,Route} from 'react-router-dom';
import About from './About';
import { ApolloProvider } from "react-apollo";
import fetch from 'node-fetch';
import CommentPage from './CommentPage';
import AuthorPage from './AuthorPage';

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  fetch
});

class Home extends React.Component {
  constructor(){
    super();
    this.state={
      type:"TOP",
      skip:0,
      commentId:''
    }
    this.clickNav =this.clickNav.bind(this);
    this.handleFetch=this.handleFetch.bind(this);
  }


  clickNav(e){
    this.setState({type:e.target.name,skip:0});
  }

  handleFetch(e){
    if(e.target.name==="nextFetch"){
      this.setState((state)=>({skip:state.skip+30}));
    }else{
      if(e.target.name==="previousFetch"&&this.state.skip>0){
        this.setState((state)=>({skip:state.skip-30}));
      }
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="Home">
          <Nav clickNav={this.clickNav}/>
    
            <Switch>
              <Route exact path='/' 
                render={(routeProps) => (
                  <Feed {...routeProps} type={this.state.type} 
                    handleFetch={this.handleFetch} skip={this.state.skip} />
                )}
              />
              <Route path='/about' component={About} />
              <Route path='/comments' component={CommentPage} />
              <Route path='/user' component={AuthorPage} />
            </Switch>
        
        </div>
      </ApolloProvider>
    );
  }
}

export default Home;
