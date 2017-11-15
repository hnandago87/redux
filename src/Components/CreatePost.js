import React, { Component } from 'react'
import { connect } from 'react-redux'

import {asyncAddPost} from '../Actions'

import BackToPost from './BackToPost'

class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state={
            options:['React', 'Redux']
        }
        this.toggleSelect = this.toggleSelect.bind(this)
        this.getNewPost = this.getNewPost.bind(this)
    }
    toggleSelect(){
        console.log("started");
        var isChecked = document.getElementById("stOne").checked;
        document.getElementById("category").disabled = isChecked;
        document.getElementById("newcategory").disabled = !isChecked;
        console.log("done")
    }
    getNewPost(e){
        e.preventDefault();
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)+Math.floor(Math.random()*100*Math.random()));
        var uniqid = randLetter + Date.now();
        this.props.addingNewPost({id:uniqid,timestamp:Date.now(),title:this.refs.title.value,body:this.refs.body.value,author:this.refs.author.value,category:document.getElementById("stOne").checked ? this.refs.newcategory.value:this.refs.category.value})
        this.props.history.push('/');
    }
    render(){
        return(
            <div className="container">
                <div className="jumbotron">
                    <h3>Readables</h3>
                </div>
                <div className="row"><BackToPost /></div>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <form onSubmit={this.getNewPost}>
                            <div className="form-group">
                                <label htmlFor="author">Author Name</label>
                                <input type="text" className="form-control" ref="author" id="author" placeholder="Author name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" ref="title" placeholder="Title of the Post" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Select Category</label>
                                <select className="form-control" ref="category" id="category">
                                    <option defaultValue disabled>Choose here</option>
                                    <option value="react">React</option>
                                    <option value="redux">Redux</option>
                                    <option value="udacity">Udacity</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="stOne" id="stOne" value="1" onClick={this.toggleSelect}/>
                                <label htmlFor="newcategory"> Add New Category</label>
                                <input type="text" ref="newcategory" className="form-control" id="newcategory" placeholder="Title of the Post" disabled hidden />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Post body</label>
                                <textarea ref="body" className="form-control" id="" rows="3" cols="150"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        addingNewPost : (data)=>{dispatch(asyncAddPost(data))}
    }
}
export default connect(null,mapDispatchToProps)(CreatePost)
