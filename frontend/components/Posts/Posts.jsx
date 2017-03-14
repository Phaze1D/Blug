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

/** connects to redux posts and post object */
@connect((store) => {
  return{
    posts: store.posts,
    post: store.post
  }
})


/** React Component representing the Post list */
export default class Posts extends React.Component{
  constructor(props){
    super(props)
    this.state = {rightOpen: false, updateIndex: -1}
    this.searchString = ''
  }

  componentWillMount() {
    // dispatches the postsIndex
    this.props.dispatch(postsIndex())
    .then(null, this.onGlobalError.bind(this))
  }


  /**
  * Handler for when the FAB button is clicked
  * dispatches the verify action
  * @param {object} event
  */
  handleNew(event){
    this.setState({updateIndex: -1})
    this.props.dispatch(resetErrors('POST'))
    this.props.dispatch(verify())
    .then(this.onVerified.bind(this), this.onVerifiedError.bind(this))
  }


  /**
  * Callback function call when verify succeeded
  */
  onVerified(){
    this.setState({rightOpen: true})
  }


  /**
  * Callback function when verify fails
  * Redirects to login page
  */
  onVerifiedError(){
    hashHistory.push('/login');
  }


  /**
  * Handler call when edit button on any PostCard is clicked
  * dispatches resetErrors and postGet actions
  * @param {string} id - id of the post to edit
  * @param {int} index - index of the post in the post array
  */
  handleEdit(id, index){
    this.setState({updateIndex: index})
    this.props.dispatch(resetErrors('POST'))
    this.props.dispatch(postGet(id, index))
    .then(this.onPostGot.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback function for when post get succeeds
  */
  onPostGot(){
    if(this.props.post.post.isOwner){
      this.setState({rightOpen: true})
    }else{
      hashHistory.push('/login');
    }
  }


  /**
  * Handle function when the user hits the bottom of the list while scorlling
  * dispatches postsNextPage action
  * @param {object} event
  */
  handleScroll(event){
    let hitBottom = (window.innerHeight + window.pageYOffset) >= document.getElementsByTagName('main')[0].offsetHeight
    if (hitBottom && !this.props.posts.fetching &&this.props.posts.more){
      this.props.dispatch(postsNextPage(this.props.posts.cursor, this.searchString))
      .then(null, this.onGlobalError.bind(this))
    }
  }


  /**
  * Handler function when the search form is submit
  * dispatches search action
  * @param {object} event
  */
  handleSearchSubmit(event){
    let value = event.target.getElementsByTagName("input")[0].value
    this.searchString = value
    this.props.dispatch(search(value))
    .then(null, this.onGlobalError.bind(this))
  }


  /**
  * Handler function when the search form is closed
  * this dispatch the postsIndex
  * @param {object} event
  */
  handleSearchClear(event){
    this.searchString = ''
    this.props.dispatch(postsIndex())
    .then(null, this.onGlobalError.bind(this))
  }


  /**
  * Callback for when any async actions fails
  * dispatches setGlobalError
  * @param {object} payload - http responses
  */
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
