import React from 'react'
import Layout from '../Layout/Layout'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import PostCard from '../PostCard/PostCard'
import PostForm from '../PostForm/PostForm'
import { userPostsIndex, postsIndex, postGet } from '../../actions/Posts'
import { resetErrors } from '../../actions/ActionTypes'
import { verify } from '../../actions/Sessions'


@connect((store) => {
  return{
    posts: store.posts,
    post: store.post
  }
})
export default class Posts extends React.Component{
  constructor(props){
    super(props)
    this.state = {rightOpen: false, updateIndex: -1}
  }

  componentWillMount() {
    this.props.dispatch(postsIndex())
  }

  handleNew(event){
    this.setState({updateIndex: -1})
    this.props.dispatch(resetErrors('POST'))
    this.props.dispatch(verify())
    .then(this.onVerified.bind(this), this.onVerifiedError.bind(this))
  }

  onVerified(){
    this.setState({rightOpen: true})
  }

  onVerifiedError(){
    hashHistory.push('/login');
  }

  onLogout(){
    this.props.dispatch(postsIndex())
  }

  handleEdit(id, index){
    this.setState({updateIndex: index})
    this.props.dispatch(resetErrors('POST'))
    this.props.dispatch(postGet(id, index))
    .then(this.onPostGot.bind(this))
  }

  onPostGot(){
    if(this.props.post.post.isOwner){
      this.setState({rightOpen: true})
    }else{
        hashHistory.push('/login');
    }
  }

  render(){
    let {
      posts,
      cursor,
      more
    } = this.props.posts

    posts = posts ? posts : []

    let cards = posts.map( (post, index) =>
      <PostCard
        key={post.id}
        post={post}
        index={index}
        onRequestEdit={this.handleEdit.bind(this)} />
    )

    return (
      <Layout
        onRequestNew={this.handleNew.bind(this)}
        onRequestLogout={this.onLogout.bind(this)}>

        <PostForm
          open={this.state.rightOpen}
          updateIndex={this.state.updateIndex}
          onRequestChange={() => this.setState({rightOpen: false})}/>

        {cards}
      </Layout>
    )
  }
}
