import {createPost, getPosts, getCategories, editPost, deletePost, postVote, getComments,getSingleComment, createComment, editComment, deleteComment, commentVote} from '../API.js'

export const FETCH_POST='FETCH_POST'
export const ADD_POST='ADD_POST'
export const EDIT_POST='EDIT_POST'
export const DELETE_POST='DELETE_POST'
export const VOTE_POST='VOTE_POST'
export const GET_POST_COMMENT= 'GET_POST_COMMENT'
export const GET_COMMENT_DETAIL='GET_COMMENT_DETAIL'
export const ADD_COMMENT='ADD_COMMENT'
export const EDIT_COMMENT='EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT='VOTE_COMMENT'
export const GET_CATEGORY='GET_CATEGORY'


// Fetch category
function fetchCategory(category){
    return {
        type:GET_CATEGORY,
        category
    }
}

//Async Fetch fetchCategory
export function asyncFetchCategory(){
    return (dispatch)=>{
        console.log("calluing dispatch");
        getCategories().then((data)=>{ 
            console.log(data)
            data.categories.forEach((category)=>{
                console.log(category)
                dispatch(fetchCategory(category))
                }
            )
        })
    }
}

//Fetch post
export default function fetchPost(post){
    console.log(post)
    return {
        type:FETCH_POST,
        post
    }
}

//Async Fetch Post
export function asyncFetchPost(){
    return (dispatch)=>{
        console.log("calluing dispatch");
        getPosts().then((data)=>{ 
            console.log(data)
            data.forEach((post)=>{
                console.log(post)
                dispatch(fetchPost(post))
                }
            )
        })
    }
}

//Action creator to create a new post
function addPost({id,timestamp,title,body,author,category}){
    return {
        type:ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

//Async Add Post
export function asyncAddPost({id,timestamp,title,body,author,category}){
    return (dispatch)=>{
          createPost(id, timestamp, title, body, author, category).then((res)=>{
                return res.json()
            }).then((data)=>{
                console.log(data.id)
                const {id,timestamp,title,body,author,category} = data
                 dispatch(addPost({id,timestamp,title,body,author,category}))
            });
    }
}


//Action creator to edit a post
function editPostAction({id,title,body}){
    return {
        type:EDIT_POST,
        id,
        title,
        body
    }
}

//Async Edit Post
export function asyncEditPost({id,title,body}){
    return (dispatch)=>{
        editPost(id, title, body).then((data)=>{
            console.log(data);
            const {id, title, body} = data;
            dispatch(editPostAction({id, title, body}));
        })
    }
}

//Action creator to delete a post
function deletePostAction({id}){
    return {
        type:DELETE_POST,
        id
    }
}

//Async Delete post
export function asyncDeletePost({id}){
    return (dispatch)=>{
        deletePost(id).then((data)=>{
            console.log(data);
            dispatch(deletePostAction({id}));
        })
    }
}

//Action to vote for post
function votePostAction(post){
    return {
        type:VOTE_POST,
        post
    }
}

//Async Vote for post
export function asyncVotePost({id,voteScore}){
    return (dispatch)=>{
        postVote(id, voteScore).then((data)=>{
            dispatch(votePostAction({id, voteScore}))
        })
    }
}


//Action creator to add comment into a post
function loadCommentToPostAction(comment){
    return {
        type:GET_POST_COMMENT,
        comment
    }
}

//Async loading comment to post id
export function asyncLoadCommentToPost(id){
   return (dispatch)=>{
        getComments(id).then((data)=>{
            console.log(data);
            data.forEach((comment)=>{
                dispatch(loadCommentToPostAction(comment))
            })
        })
   } 
}
//Action creator to add new comment for a post
function addComment(comment){
    return{
        type:ADD_COMMENT,
        comment
    }
}

//Async Adding comment
export function asyncAddComment({id, timestamp,body,author, parentId}){
    return (dispatch)=>{
        createComment(id,timestamp,body, author, parentId).then((data)=>{
           dispatch(addComment(data));
        })
         
    }
}

//Action creator to edit comment for a post
function editCommentAction(comment){
    return {
        type:EDIT_COMMENT,
        comment
    }
}

//Async editing comment
export function asyncEditComment({id, timestamp, body}){
    return (dispatch)=>{
        editComment(id, body, timestamp).then((res)=>{
            console.log(res);
            dispatch()
        })
    }
}

//Action creator to delete comment for a post
function deleteCommentAction(comment){
    return {
        type:DELETE_COMMENT,
        comment
    }
}

//Async Delete comment
export function asyncDeleteComment({id}){
    return (dispatch)=>{
        deleteComment(id).then((res)=>{
            console.log(res);
            dispatch(deleteCommentAction(res));
        })
    }
}

//Action creator to vote comment in a post
function voteForComment(comment){
    return{
        type:VOTE_COMMENT,
        comment
    }
}

//Async voting for comment
export function asyncVoteForComment({id, voteScore}){
    console.log(voteScore);
    return (dispatch)=>{
        commentVote(id, voteScore).then((res)=>{
            console.log(res);
            dispatch(voteForComment(res));
        })
    }
}


