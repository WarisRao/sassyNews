import React from 'react';
import './AuthorPage.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import calcTime from './calcTime';
import profile from '../public/profile.png';
const GET_USER =gql` query USER($id:String!){
  user(id:$id){
    id,
    karma,
    about,
    firstName,
    lastName,
    creationTime
  }
}
`

class AuthorPage extends React.Component{
  constructor(props){
    super(props);
    this.state={id:(this.props.location.search).split('id=')[1]};
 
  }

  render(){
    return (
      <div className="commentPage">
        
        <Query query={GET_USER} variables={{id:this.state.id}}>
        {({loading, error,data})=>{
          data=data.user;
          if(loading)return <p>Loading...</p>;
          if(error) return <p>Error :(</p>;
            console.log(data);
            return (                           
              <div className="user" >
              
                <div className="user__content">
                  
                      <img src={profile} alt="profile" className="user--profile" />
                      {data.firstname && <div>
                        <span  className="user--firstname">First Name : {data.url.firstname}</span>
                      </div>}

                      {data.lastname && <div className="user--lastname">
                        <span>Last Name : {data.url.lastname}</span>
                      </div>}

                      <div className="user--id user--text">
                        <span>Id : {data.id}</span>
                      </div>

                      <div className="user--karma user--text">
                        <span>Karma : {data.karma}</span>
                      </div>

                      <div className="user--creationTime user--text">
                        <span>Created {calcTime(data.creationTime)} ago</span>
                      </div>
                  
                </div>
                

              </div>
            )
        }}
        </Query>

      </div>
    )
  }

} 
  


export default AuthorPage;
