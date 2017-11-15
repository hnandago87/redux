import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';
import {asyncVotePost, asyncFetchPost, asyncFetchCategory} from './Actions'
import Display from './Components/DisplayPosts'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:[],
      categories:[],
      filter:null
    }
    this.changeDisplayCategory = this.changeDisplayCategory.bind(this);
    this.VotePost = this.VotePost.bind(this);
  }
  VotePost(vote){
         if(vote[0]>0){
             this.props.votePost({id:vote[1],voteScore:vote[2]+1})
         } else{
              this.props.votePost({id:vote[1],voteScore:vote[2]-1})
         }
    }
  changeDisplayCategory(b,e){
    console.log(b)
    if(b[0] != null){
      this.setState({filter:b[0].category});
    } else { this.setState({filter:b[0]}); }
    
  }
  componentDidMount(){
    this.props.getCategories();
    this.props.getPost();
  }
  
  render() { 
    console.log(this.props.post.categories)
    return (
      <div className="App">
        <div className="jumbotron">
          <h2>Readables</h2>
        </div>
        <div className="container">
          <div className="col-lg-4">
            <ul className="list-group">
             {this.props.post.categories!== undefined ? Object.keys(this.props.post.categories).map((category)=>(
                <li key={category} className="list-group-item"><span onClick={this.changeDisplayCategory.bind(this,[{category}])}>{category}</span></li>
             )):null}
              <li className="list-group-item"><div className="bg-danger"><span onClick={this.changeDisplayCategory.bind(this,[null])}>Reset</span></div></li>
            </ul>
          </div>
          <div className="col-lg-8">
          <Display posts={this.props.post.posts} VotePost={this.VotePost} type={this.state.filter} />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(posts,ownProps){
  return {
          post:posts
  }
}
function mapDispatchToProps(dispatch){
  return{
    getPost:()=>{dispatch(asyncFetchPost())},
    getCategories:()=>{dispatch(asyncFetchCategory())},
    votePost:(data)=>{dispatch(asyncVotePost(data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
