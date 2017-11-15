import React, { Component } from 'react'
import {connect} from 'react-redux'

import BackToPost from './BackToPost'


import {asyncEditPost} from '../Actions'

class EditPost extends Component {
    constructor(props){
        super(props);
        this.state={
            post:{}
        }
        this.getPostValues = this.getPostValues.bind(this)
    }
    getPostValues(id,e){
        e.preventDefault();
        console.log(this.refs.title.value)
        this.props.editedPost({id:id[0],title:this.refs.title.value,body:this.refs.body.value})
        this.props.history.push('/');
    }
    render(){
        const post = this.props.location.query.post[1];
        return(   
            <div className="container">
                <div className="row">
                    <div className="col-lg-12"><span>Editing the post</span></div>
                    <BackToPost />
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <form onSubmit={this.getPostValues.bind(this,[post.id])}>
                            <div className="form-group">
                                <label htmlFor="titleOfPost">Title</label>
                                <input type="text" ref="title" className="form-control" id="titleOfPost" aria-describedby="emailHelp" defaultValue={post.title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyOfPost">Body of the post</label><br/>
                                <textarea ref="body" rows="4" cols="100" id="bodyOfPost" name="body" defaultValue={post.body}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
  return {
    editedPost: function(data){console.log(data);return dispatch(asyncEditPost(data))}
  }
}

export default connect(null,mapDispatchToProps)(EditPost)

                                
                               

                            