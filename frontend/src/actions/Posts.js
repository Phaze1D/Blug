import axios from "axios"



const POST_NEW = (title, content, tags) => {
  return {
    type: 'POST_NEW',
    payload: axios.post('/post/create', {
      data: {
        title: title,
        content: content,
        tags: tags // CAREFUL ERROR
      }
    })
  }
}

const POST_EDIT = (post_id, title, content, tags) => {
  return {
    type: 'POST_EDIT',
    payload: axios.put(`/post/${post_id}`, {
      data: {
        title: title,
        content: content,
        tags: tags // CAREFUL ERROR
      }
    })
  }
}


const POST_GET = (post_id) => {
  return {
    type: 'POST_GET',
    payload: axios.get(`/post/${post_id}`)
  }
}


const USER_POSTS_INDEX = (user_id) => {
  return {
    type: 'USER_POSTS_INDEX',
    payload: axios.get(`user/${user_id}/posts`)
  }
}


const POSTS_INDEX = () => {
  return {
    type: 'POSTS_INDEX',
    payload: axios.get(`/posts`)
  }
}
