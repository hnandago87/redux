const url = `http://localhost:3001/`;
const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};
export function getCategories(){
   return fetch(url+'categories', { headers: { 'Authorization': 'whatever-you-want', 'Content-Type':'application/json' }})
      .then( (res) => { return(res.json()) });
}
export function getPosts(){
    console.log("Calling Fetch Post")
   return fetch(url+'posts', { headers: { 'Authorization': 'whatever-you-want', 'Content-Type':'application/json' }})
      .then( (res) => { return(res.json()) });
}
export function getPost(id){
    return fetch(url+'posts'+id, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type':'application/json' }})
      .then( (res) => { return(res.text()) });
}
export function createPost(id, timestamp, title, body, author, category){
    var payload = {
        id: id.toString(),
        timestamp: timestamp,
        title: title,
        body: body,
        author: author,
        category: category,
        voteScore:0
        };
    return fetch(url+'posts', {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    })
      //.then((res) => { return(res.json()) });
}
export function editPost(id, title, body){
    var payload = {
        "title": title,
        "body": body
        };
    return fetch(url+'posts/'+id, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    })
      .then( (res) => { return(res.json()) });
}
export function deletePost(id){
    return fetch(url+'posts/'+id, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        }
    })
      .then( (res) => { return(res.json()) });
}
export function postVote(id, vote){
    var payload = {"option":vote>0?"upVote":"downVote"};
    return fetch(url+'posts/'+id, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    })
      .then( (res) => { return(res.json()) });
}

export function getComments(id){
    return fetch(url+'posts/'+id+'/comments', {
        method: 'GET',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        }
    })
    .then((res)=>{return (res.json())});
}

export function getSingleComment(id){
    return fetch(url+'comments/'+id, {
        method:'GET',
        headers:{
            ...headers,
            'Content-Type':'application/json',
            'Cache-Control':'no-cache'
        }
    }).then((res)=>{return res.json()});
}
export function createComment(id, timestamp, body, author, parentId){
    var payload = {
        id: id,
        timestamp: timestamp,
        body: body,
        author: author,
        parentId:parentId
    };
    return fetch(url+'comments', {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    }).then((res) => { return(res.json()) });
}

export function editComment(id, body, timestamp){
    var payload = {
        "timestamp": timestamp,
        "body": body
        };
    return fetch(url+'comments/'+id, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    })
      .then( (res) => { return(res.json()) });
}

export function deleteComment(id){
    return fetch(url+'comments/'+id, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        }
    })
      .then( (res) => { return(res.json()) });
}

export function commentVote(id, vote){
    var payload = {"option":vote==="upVote"?"upVote":"downVote"};
    return fetch(url+'comments/'+id, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload)
    })
      .then( (res) => { return(res.json()) });
}