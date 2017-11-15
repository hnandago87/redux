import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import {asyncLoadCommentToPost,asyncAddComment,asyncEditComment,asyncDeleteComment,asyncVoteForComment} from '../Actions'
import BackToPost from './BackToPost'
import PostInfo from './comments/postInfo'

class ViewPostAndComment extends Component{
    constructor(props){
        super(props);
        this.state={
            postId:0,
            editable:false,
            editComment:false,
            commentToEdit:null
        }
        this.openNewCommentForm = this.openNewCommentForm.bind(this);
        this.getFormData = this.getFormData.bind(this)
        this.editPost = this.editPost.bind(this)
        this.getCommentData = this.getCommentData.bind(this)
        this.VoteComment = this.VoteComment.bind(this)
        this.removeComment=this.removeComment.bind(this)
    }
    removeComment(commentId){
        this.props.DeletingComment({id:commentId[0]})
    }
    VoteComment(vote){
         if(vote[0]===0){
             this.props.VotingComment({id:vote[1],voteScore:"downVote"})
         } else{
              this.props.VotingComment({id:vote[1],voteScore:"upVote"})
         }
    }
    getCommentData(e){
        e.preventDefault()
        let comments = this.props.comment;
        let commentEditTime= Date.now();
        comments.forEach((comment)=>{
            if(comment.id===this.refs.commentEditId.value){comment.body =this.refs.commentEdit.value;comment.timestamp=commentEditTime}
        })
        this.props.EditingComment({id:this.refs.commentEditId.value,body:this.refs.commentEdit.value,timestamp:commentEditTime})
        this.setState({editComment:false, commentToEdit:null})
    }
    editPost(comment,e){
        e.preventDefault()
        console.log(comment)
        this.setState({editComment:!this.state.editComment,commentToEdit:comment})
    }
    openNewCommentForm(){
        this.setState({editable:!this.state.editable})
    }
    getFormData(e){
        e.preventDefault();
        let body = this.refs.comment.value;
        let author = this.refs.author.value;
        let parentId = this.props.match.params.postId;
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)+Math.floor(Math.random()*100*Math.random()+100*Math.random()*10));
        var uniqid = randLetter + Date.now();
        this.props.AddNewComment({id:uniqid.toString(),timestamp:Date.now(),body:body,author:author,parentId:parentId})
        this.setState({editable:!this.state.editable})
    }
    componentDidMount(){
        this.setState({postId:this.props.match.params.postId});
        this.props.getComment(this.props.match.params.postId);
    }
    componentWillReceiveProps(newProps){
        this.setState({post:newProps.post,comments:newProps.comment})
    }
        
    render(){
        let post = this.props.post
        return(
            <div className="container">
                <div className="jumbotron">
                    <h3>Readables</h3>
                </div>
                    <BackToPost />
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <h2>Viewing Post</h2>
                        </div>
                        {post != null?
                            (<PostInfo post={post}/>):null
                        }
                        <div className="row">
                            <div className="row">
                                <div className="col-lg-2"></div>
                                    <div className="col-lg-8">
                                        <span className="h3">Comments</span>
                                        <p className="pull-right">Add Comment: <span onClick={this.openNewCommentForm} className="glyphicon glyphicon-plus"></span></p>
                                    </div>
                                </div>
                                {this.props.comment.length>=1?this.props.comment.map((comment)=>(
                                    !comment.deleted?
                                    <div key={comment.id} className="col-sm-5">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <span onClick={this.editPost.bind(this,[comment])} className="glyphicon glyphicon-pencil pull-left"></span>
                                                <a className="pull-right"><span onClick={this.removeComment.bind(this,[comment.id])} className="glyphicon glyphicon-remove"></span></a>
                                                <p><strong> {comment.author}</strong></p>
                                            </div>
                                            <div className="panel-body">
                                                {comment.body}
                                            </div>
                                            <div className="panel-footer">
                                                <div className="pull-left">Votes: {comment.voteScore}</div>
                                                <div>
                                                    <span onClick={this.VoteComment.bind(this,[1,comment.id,comment.voteScore])} className="glyphicon glyphicon-arrow-up"></span>
                                                    <span onClick={this.VoteComment.bind(this,[0,comment.id,comment.voteScore])}className="glyphicon glyphicon-arrow-down"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :null
                                )):<h3>Not Comments Available</h3>}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {this.state.editable && !this.state.editComment?
                            <form onSubmit={this.getFormData}>
                                <div className="form-group">
                                    <label htmlFor="name" className="cols-sm-2 control-label">Author Name</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" ref="author" className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="cols-sm-2 control-label">Body</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                            <textarea rows="3" ref="comment" cols="60" className="form-control" name="body" id="body"  placeholder="Enter your Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Post</button>
                                </div>
                            </form>
                            :null}
                            {this.state.editComment && !this.state.editable?
                            <form onSubmit={this.getCommentData}>
                                <div className="form-group">
                                    <label htmlFor="name" className="cols-sm-2 control-label">Author Name</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" ref="commentEditId" className="form-control" name="name" id="name"  defaultValue={this.state.commentToEdit[0].id} disabled />
                                        </div>
                                    </div>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" ref="commentEdit" className="form-control" name="name" id="name"  defaultValue={this.state.commentToEdit[0].body}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Post</button>
                                </div>
                            </form>
                            :null}
                        </div>
                    </div>  
                </div>
            )
         }
    }
function mapStateToProps(stateToBeSet,ownProps){
    console.log(stateToBeSet)
    let postObj = null;
    let commentObj = [];
    if(Object.keys(stateToBeSet).length === 0){
       console.log("empty")
    }else {
        Object.keys(stateToBeSet.comment).map(function(post){
            if(stateToBeSet.comment[post].body !== undefined){
                if(stateToBeSet.comment[post].parentId===ownProps.match.params.postId && !stateToBeSet.comment[post].deleted){
                    
                    commentObj.push(stateToBeSet.comment[post])
                }
            }
            
        })
        Object.keys(stateToBeSet.posts).map(function(post){
            if(stateToBeSet.posts[post]!= undefined && stateToBeSet.posts[post].id==ownProps.match.params.postId){
                console.log(stateToBeSet.posts[post])
                postObj = stateToBeSet.posts[post]
            }
        })
    }
  return { 
      post:postObj,
      comment:commentObj
  }
}
function mapDispatchToProps(dispatch){
  return {
    getComment:(data)=>{dispatch(asyncLoadCommentToPost(data))},
    AddNewComment:(data)=>{dispatch(asyncAddComment(data))},
    EditingComment:(data)=>{dispatch(asyncEditComment(data))},
    DeletingComment:(data)=>{dispatch(asyncDeleteComment(data))},
    VotingComment:(data)=>{dispatch(asyncVoteForComment(data))}
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPostAndComment));