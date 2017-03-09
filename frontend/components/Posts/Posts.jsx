import React from 'react'
import Layout from '../Layout/Layout'
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
    this.props.dispatch(postsIndex())
  }

  render(){
    const {
      posts,
      cursor,
      more
    } = this.props.posts

    return (
      <Layout>
        
      </Layout>
    )
  }
}
