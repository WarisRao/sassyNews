import React from 'react';
import './Feed.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Link} from 'react-router-dom';
import calcTime from './calcTime';

const GET_FEED =gql` query FEED($type:FeedType! , $first:Int! , $skip:Int!){
  feed(type: $type, first: $first, skip: $skip){
    url,
    title,
    creationTime,
    commentCount,
    submitterId,
    id,
    upvoteCount
  }
}
`

const Feed =(props)=>(

  <Query query={GET_FEED} variables={{type:props.type,first:30,skip:props.skip}} >

    {({ loading, error, data }) => {
      if (loading) return <p><span className="response">Loading...</span></p>;
      if (error) return <p><span className="response">Error :(</span></p>;

      return (
        <div className="feed">
        
          {data.feed.map(({ url,title,commentCount,creationTime,id,submitterId,upvoteCount }) => (              
              <div className="feed__item" >

                <div className="feed__item--serial"> 
                      <span>{upvoteCount}</span>
                </div>

                <div className="feed__item--content">

                  <div className="feed__item--up">
                                
                      <div className="feed__item--title">
                        <a href={url} target="blank"> <span>{title}</span> </a>
                      </div>

                      {url && <div className="feed__item--source">
                        <span>({url.split('/')[2]})</span>
                      </div>}

                  </div>

                  <div className="feed__item--down">
        
                      <div className="feed__item--by">
                        <span ><Link className="feed__item--by-link" to={{pathname: '/user',search: `?id=${submitterId}`}}><span className="feed__by"> by</span> {submitterId} </Link></span>
                      </div>

                      <div className="feed__item--creationTime">
                        <span>{ calcTime(creationTime)} ago</span>
                      </div>
                      
                      <div className="feed__item--commentCount">
                      <span><Link className="feed__item--commentCount-link" to={{pathname: '/comments',search: `?id=${id}`}} >{commentCount} <span className="feed__comments">comments </span></Link></span>
                      </div>   
                  </div>
                </div>
              </div>
          ))}
          <div className="feed__btn" > 
            <button className="feed__btn-previous" name="previousFetch" onClick={props.handleFetch} >Previous</button>
            <button  className="feed__btn-next" name="nextFetch" onClick={props.handleFetch} >Next</button>
          </div>
        </div>
      );
    }}

  </Query>
  );
  


export default Feed;
