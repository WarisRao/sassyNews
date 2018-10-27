import React from 'react';
import './Feed.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Link} from 'react-router-dom';
import calcTime from './calcTime';
import './CommentPage.css';

const GET_COMMENT=gql` query COMMENT($id:Int!){
  comment(id:$id){
    text,
    submitterId,
    creationTime,
    comments{
      id
    }
  }
}`

class Comments extends React.Component{
  constructor(props){
    super(props);     
    if(this.props.replies){
      this.replies = this.props.replies.map((reply) => {
        return (
            <Query query={GET_COMMENT} variables={{id:reply.id}} >
              {({error,loading,data})=>{
                    data=data.comment;
                    if(loading)return <p>Loading...</p>;
                    if(error) return <p>Error :(</p>;
                    return(
                      <div className="commentData">

                        <div className="commentText" >
                          {/* <span>{data.text}</span> */}
                          <div dangerouslySetInnerHTML={{ __html: data.text }} />
                        </div>
                        
                        <div className="commentTime" >
                        <span> <span className="commentTime--time" >{ calcTime(data.creationTime)} </span> ago</span>
                        </div>

                        <div className="commentBy">
                          <span>
                          <Link className="feed__item--by-link" to={{pathname: '/user',search: `?id=${data.submitterId}`}}>
                            <span className="item--by__submit">   by</span> {data.submitterId} 
                          </Link> 
                          </span>
                        </div>

                        <Comments replies={data.comments} />

                      </div>
                    )
              }}
            </Query>
        )
      })
    }
  }
  
  render() {
    return (
      <div className="comment">
        <div className="replies">{ this.replies }</div>
      </div>
    )
  }

}
  


export default Comments;
