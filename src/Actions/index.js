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
export function fetchCategory(category){
    return {
        type:GET_CATEGORY,
        category
    }
}
//Fetch post
export default function fetchPost(post){
    return {
        type:FETCH_POST,
        post
    }
}
//Action creator to create a new post
export function addPost({id,timestamp,title,body,author,category}){
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

//Action creator to edit a post
export function editPost({id,title,body}){
    return {
        type:EDIT_POST,
        id,
        title,
        body
    }
}

//Action creator to delete a post
export function deletePost({id}){
    return {
        type:DELETE_POST,
        id
    }
}

//Action to vote for post
export function votePost(post){
    return {
        type:VOTE_POST,
        post
    }
}
//Action creator to add comment into a post
export function loadCommentToPost(comment){
    return {
        type:GET_POST_COMMENT,
        comment
    }
}

//Action creator to add new comment for a post
export function addComment(comment){
    return{
        type:ADD_COMMENT,
        comment
    }
}

//Action creator to edit comment for a post
export function editComment(comment){
    return {
        type:EDIT_COMMENT,
        comment
    }
}

//Action creator to delete comment for a post
export function deleteComment(comment){
    return {
        type:DELETE_COMMENT,
        comment
    }
}

//Action creator to vote comment in a post
export function voteForComment(comment){
    return{
        type:VOTE_COMMENT,
        comment
    }
}


