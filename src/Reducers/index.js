import { combineReducers } from 'redux'

import {createPost,editPost} from '../API.js'

import {FETCH_POST,ADD_POST,EDIT_POST,DELETE_POST} from '../Actions'
import {GET_POST_COMMENT,GET_COMMENT_DETAIL,ADD_COMMENT,EDIT_COMMENT,DELETE_COMMENT ,VOTE_COMMENT, GET_CATEGORY, VOTE_POST} from '../Actions'
const initialState = {}
//state for categories
function categories(state={},action){
    const {category} = action
    switch(action.type){
        case GET_CATEGORY:
            return {
                ...state,
                [category.name]:category
                
            }
        default:
            return state
    }
}

//state for comment
function comment(state={}, action){
    const {id, timestamp, body, author, parentId, comment,voteScore} = action
    switch(action.type){
        case GET_POST_COMMENT:
            return {
                ...state,
                    [comment.id]:{
                        id: comment.id,
                        parentId: comment.parentId,
                        timestamp: comment.timestamp,
                        body: comment.body,
                        author: comment.author,
                        voteScore:comment.voteScore,
                        deleted: comment.deleted,
                        parentDeleted: comment.parentDeleted
                    }
            }
        case ADD_COMMENT:
            return {
                ...state,
                    [comment.id]:{
                        id: comment.id,
                        parentId: comment.parentId,
                        timestamp: comment.timestamp,
                        body: comment.body,
                        author: comment.author,
                        voteScore:comment.voteScore,
                        deleted: comment.deleted,
                        parentDeleted: comment.parentDeleted
                    }
            }
        case DELETE_COMMENT:
            return{
                ...state,
                [comment.id]:{
                    ...state[comment.id],
                    deleted:true
                }
            }
        case EDIT_COMMENT:
            return{
                ...state,
                id:{
                    ...state.id,
                    body:body,
                    timestamp:timestamp
                }
            }
        case VOTE_COMMENT:
            return{
                ...state,
                [comment.id]:{
                    ...state[comment.id],
                    voteScore:comment.voteScore
                }
            }
        default:
            return state;
    }
}
//initial state into the application and controll the actions and state
function posts(state=initialState,action){
    const {id,timestamp,title,body,author,category,post, comment, voteScore} = action;
    switch(action.type){
        case FETCH_POST:
            return {
               ...state,
               [post.id]:post
            }
        case ADD_POST:
            //currently working
            return{
                ...state,
                [id]:{
                    id: id,
                    timestamp: timestamp,
                    title: title,
                    body: body,
                    author: author,
                    category: category,
                    voteScore: 1,
                    deleted: false
                }
            }
        case EDIT_POST:
            var result = editPost(id, title, body);
            console.log(result)
            return{
                ...state,
                [id]:{
                    ...state[id],
                    title:[title],
                    body:[body]
                }
            }
        case DELETE_POST:
            return{
                ...state,
                [id]:undefined
            }
        case VOTE_POST:
            return{
                ...state,
                [post.id]:{
                    ...state[post.id],
                    voteScore:post.voteScore
                }
            }
        default:
            return state;
    }
}
const rootReducer =  combineReducers({
  comment,
  posts,
  categories
})
export default rootReducer