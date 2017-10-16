import React, { Component } from 'react'

class PostInfo extends Component{
    render(){
        let post = this.props.post
        return (
            <div className="row">
                <div className="well">
                    <div className="media">
                        <div className="media-body">
                            <span className="media-heading text-left">{post.title}</span>
                            <span className="pull-right">{post.author}</span>
                            <p>Description: {post.body}</p>
                            <ul className="list-inline list-unstyled">
                                <li><span><i className="glyphicon glyphicon-calendar"></i>{new Date(post.timestamp * 1000).toUTCString()}</span></li>
                                <li>|</li>
                                <li>
                                <span className="glyphicon glyphicon-star"></span>
                                <span>{post.voteScore}</span> <span className="glyphicon glyphicon-star"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default PostInfo