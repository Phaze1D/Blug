import React from 'react'
import { connect } from 'react-redux'
import { userPostsIndex, postsIndex } from '../../actions/Posts'



@connect((store) => {
  return{
    posts: store.posts
  }
})
export default class Posts extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount() {

  }

  render(){
    return (
      <div>

      </div>
    )
  }
}
