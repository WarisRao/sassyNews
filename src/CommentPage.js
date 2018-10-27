import React from 'react';
import './CommentPage.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import calcTime from './calcTime';
import Comments from './Comments';
import {Link} from 'react-router-dom';

const GET_NEWS =gql` query NEWSITEM($id:Int!){
  newsItem(id:$id){
    url,
    title,
    creationTime,
    commentCount,
    submitterId,
    id,
    comments{id}
  }
}
`

class CommentPage extends React.Component{
  constructor(props){
    super(props);
    this.state={id:Number((this.props.location.search).split('id=')[1])};
 
  }

  render(){
    return (
      <div className="commentPage">
        
        <Query query={GET_NEWS} variables={{id:this.state.id}}>
        {({loading, error,data})=>{
          data=data.newsItem;
          if(loading)return <p>Loading...</p>;
          if(error) return <p>Error :(</p>;

            return (                           
              <div className="item" >
              
                <div className="item__content">
                  
                      <div className="item--title">
                        <a href={data.url} target="blank" className="item--title--link" > <span>{data.title}</span> </a>
                      </div>

                      {data.url && <div className="item--source">
                        <span>{data.url.split('/')[2]}</span>
                      </div>}


                      <div className="item--by">
                        <span>
                          <Link className="feed__item--by-link" to={{pathname: '/user',search: `?id=${data.submitterId}`}}>
                            <span className="item--by__submit">   by</span> {data.submitterId} 
                          </Link> 
                        </span>
                      </div>

                      <div className="item--creationTime">
                        <span>  <span className="item--by__submit">{ calcTime(data.creationTime)} </span> ago </span>
                      </div>
                  
                </div>
                
                <div className="commentHeading" >
                  <span >COMMENTS</span>
                </div>
                
                <div className="comments">
                  <Comments replies={data.comments} />
                </div>

              </div>
            )
        }}
        </Query>

      </div>
    )
  }

} 
  


export default CommentPage;
