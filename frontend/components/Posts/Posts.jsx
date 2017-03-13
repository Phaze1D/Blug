import React from 'react'
import Layout from '../Layout/Layout'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import PostCard from '../PostCard/PostCard'
import PostForm from '../PostForm/PostForm'
import EventListener, {withOptions} from 'react-event-listener';
import { postsNextPage, postsIndex, postGet, search } from '../../actions/Posts'
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
    this.searchString = ''
  }

  componentWillMount() {
    this.props.dispatch(postsIndex())
    .then(null, this.onGlobalError.bind(this))
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

  handleEdit(id, index){
    this.setState({updateIndex: index})
    this.props.dispatch(resetErrors('POST'))
    this.props.dispatch(postGet(id, index))
    .then(this.onPostGot.bind(this), this.onGlobalError.bind(this))
  }

  onPostGot(){
    if(this.props.post.post.isOwner){
      this.setState({rightOpen: true})
    }else{
      hashHistory.push('/login');
    }
  }

  handleScroll(event){
    let hitBottom = (window.innerHeight + window.pageYOffset) >= document.getElementsByTagName('main')[0].offsetHeight
    if (hitBottom && !this.props.posts.fetching &&this.props.posts.more){
      this.props.dispatch(postsNextPage(this.props.posts.cursor, this.searchString))
      .then(null, this.onGlobalError.bind(this))
    }
  }

  handleSearchSubmit(event){
    let value = event.target.getElementsByTagName("input")[0].value
    this.searchString = value
    this.props.dispatch(search(value))
    .then(null, this.onGlobalError.bind(this))
  }

  handleSearchClear(event){
    this.searchString = ''
    this.props.dispatch(postsIndex())
    .then(null, this.onGlobalError.bind(this))
  }

  onGlobalError(payload){
    if(payload.response){
      this.props.dispatch(setGlobalError(payload.response.data.message, true))
    }else{
      this.props.dispatch(setGlobalError(payload.message, true))
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
        onRequestSearchSubmit={this.handleSearchSubmit.bind(this)}
        onRequestSearchClear={this.handleSearchClear.bind(this)}>

        <EventListener
          target="window"
          onScroll={withOptions(this.handleScroll.bind(this), {passive: true, capture: false})}/>

        <PostForm
          open={this.state.rightOpen}
          updateIndex={this.state.updateIndex}
          onRequestChange={() => this.setState({rightOpen: false})}/>

        {cards}
      </Layout>
    )
  }
}
