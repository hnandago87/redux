import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import {asyncDeletePost} from '../Actions'

class Display extends Component{
    render(){
        let type = this.props.type;
        let vote = this.props.VotePost
        const posts = Object.entries(this.props.posts);
        let remove = this.props.deletingPost;
        return(
        <div className="row">
                {posts.map(function(post){
                    if(post[1] != null){
                    return (
                        <div key={post[0]} className={type != null?post[1].category===type?
                            "panel panel-default show"
                                :"panel panel-default hide"
                                    :"panel panel-default"}>
                            <div className="panel-heading">
                                <Link to={{ pathname: '/edit', query: { post } }}>
                                    <span className="glyphicon glyphicon-pencil pull-left"></span>
                                </Link>
                                <a className="pull-right"><span onClick={()=>{remove(post[1].id)}}className="glyphicon glyphicon-remove"></span></a>
                                <h3 className="panel-title">{post[1].title}</h3>
                            </div>
                            <div className="panel-body">
                               <p> {post[1].body}</p>
                            </div>
                            <div className="panel-footer panel-info">
                                <div className="pull-left">
                                    <span>Votes: {post[1].voteScore}</span>
                                     <span onClick={vote.bind(this,[1,post[1].id,post[1].voteScore])} className="glyphicon glyphicon-arrow-up"></span>
                                     <span onClick={vote.bind(this,[0,post[1].id,post[1].voteScore])} className="glyphicon glyphicon-arrow-down"></span>
                                </div>
                                <Link to={"/view/"+post[1].id} >Comments</Link>
                            </div>
                        </div>
                    )
                }
                })}
        </div>
        )
    }
}
function mapDispatchToProps(dispatch){
  return {
    deletingPost:(data)=>{dispatch(asyncDeletePost({id:data}))}
  }
}
export default connect(null, mapDispatchToProps)(Display);
