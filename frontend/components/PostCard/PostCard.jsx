import React from 'react'
import moment from 'moment'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import UpVote from 'material-ui/svg-icons/action/thumb-up'
import DownVote from 'material-ui/svg-icons/action/thumb-down'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/image/edit'
import Comments from 'material-ui/svg-icons/communication/comment'
import CommentSection from './CommentSection'
import classnames from 'classnames'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { likeNew, likeDelete, dislikeNew, dislikeDelete } from '../../actions/LikesDislikes'
import { postDelete, removePost } from '../../actions/Posts'
import { postCommentNew, postCommentIndex, addNewComment, commentsNextPage } from '../../actions/Comments'
import { setGlobalError, resetErrors } from '../../actions/ActionTypes'


/** connects to redux like, dislike, comment, and comments objects */
@connect( (store) => {
  return {
    like: store.like,
    dislike: store.dislike,
    comment: store.comment,
    comments: store.comments
  }
})
/** React Component that represents a single Post card */
export default class PostCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      liked: false,
      disliked: false,
      vl: 0,
      vd: 0,
      copen: false
    }
  }


  componentWillReceiveProps(nextProps) {
    // Close the comment section if the comments array does not belong to the
    // post corrosponding to this PostCard
    if(nextProps.comments.comments_post_id != this.props.post.id){
      this.setState({copen: false})
    }
  }


  /**
  * Handler method for when the edit button is click
  * @param {object} event
  */
  handleEdit(event){
    this.props.onRequestEdit(this.props.post.id, this.props.index)
  }


  /**
  * Handler method for when the dislike button is click
  * This dispatches the dislikeNew action
  * @param {object} event
  */
  handleDislike(event){
    event.preventDefault()
    this.props.dispatch(dislikeNew(this.props.post.id))
    .then(this.onDisliked.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback function for when the dislikeNew action is successful
  * This dispatches the likeDelete action
  */
  onDisliked(){
    this.setState({disliked: true, vd: this.state.vd + 1})
    this.props.dispatch(likeDelete(this.props.post.id))
    .then(() => this.setState({liked: false, vl: this.state.vl - 1 }) )
  }


  /**
  * Handler method for when the like button is click
  * This dispatches the likeNew action
  * @param {object} event
  */
  handleLike(event){
    event.preventDefault()
    this.props.dispatch(likeNew(this.props.post.id))
    .then(this.onLiked.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback function for when the likeNew action is successful
  * This dispatches the dislikeDelete action
  */
  onLiked(){
    this.setState({liked: true, vl: this.state.vl + 1})
    this.props.dispatch( dislikeDelete(this.props.post.id) )
    .then(() => this.setState({disliked: false, vd: this.state.vd - 1}))
  }


  /**
  * Handler method for when the delete button is click
  * This dispatches the postDelete action
  * @param {object} event
  */
  handleDelete(event){
    this.props.dispatch(postDelete(this.props.post.id))
    .then(this.onDeleted.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback function for when the postDelete action is successful
  * This dispatches the removePost action
  */
  onDeleted(){
    this.props.dispatch(removePost(this.props.index))
  }


  /**
  * Handler method for toggling the comments section
  * This dispatches the postCommentIndex action
  * @param {object} event
  */
  toggleComments(event){
    if(!this.state.copen){
      this.props.dispatch(postCommentIndex(this.props.post.id))
      .then(this.onReceivedComments.bind(this), this.onGlobalError.bind(this))
    }else{
      this.setState({copen: false})
    }
  }


  /**
  * Callback function for when the postCommentIndex action is successful
  * This dispatches the resetErrors action on the comment form
  */
  onReceivedComments(){
    if(this.props.comments.comments_post_id == this.props.post.id){
      this.props.dispatch(resetErrors("COMMENT"))
      this.setState({copen: true})
    }
  }


  /**
  * Handler method for when a new comment is submited
  * This dispatches the postCommentNew action
  * @param {object} event
  */
  handleNewCommentSubmit(value){
    this.props.dispatch(postCommentNew(this.props.post.id, value))
    .then(this.onCommentSubmited.bind(this), this.onCommentFailed.bind(this))
  }


  /**
  * Callback function for when the postCommentNew action is successful
  * This dispatches the addNewComment action for adding a comment to
  * the comments array
  */
  onCommentSubmited(){
    this.refs.commentSection.onSuccesComment()
    this.props.dispatch(addNewComment(this.props.comment.comment))
  }


  /**
  * Callback function for when the postCommentNew action failed
  * This Redirects the user to the login page
  */
  onCommentFailed(payload){
    if(payload.response.status == 412){
      hashHistory.push('/login')
    }
  }


  /**
  * Handler method for when the comment form is focus
  * This resets the comment errors
  * @param {object} event
  */
  handleCommentFocus(event){
    this.props.dispatch(resetErrors("COMMENT"))
  }


  /**
  * Handler method for when the user clicks on load more bottom
  * This dispatches the commentsNextPage action
  * @param {object} event
  */
  handleMoreComments(event){
    this.props.dispatch(commentsNextPage(this.props.post.id, this.props.comments.cursor))
    .then(null, this.onGlobalError.bind(this))
  }


  /**
  * Sets the global error
  * @param {object} payload - http response
  */
  onGlobalError(payload){
    if(payload.response){
      if(payload.response.status == 412){
        hashHistory.push('/login')
      }else{
        this.props.dispatch(setGlobalError(payload.response.data.message, true))
      }
    }else{
      this.props.dispatch(setGlobalError(payload.message, true))
    }
  }


  render(){
    const {
      id,
      title,
      content,
      created,
      dislikes,
      likes,
      username,
      isOwner
    } = this.props.post

    const {
      comments,
      comments_post_id,
      more,
    } = this.props.comments

    const {
      errors
    } = this.props.comment

    let fetching = this.props.like.fetching || this.props.dislike.fetching
    let date = moment(created, 'ddd, DD MMM YYYY HH:mm:ss zzz')

    const dcls = classnames({'dislike': this.state.disliked})
    const lcls = classnames({'like': this.state.liked})

    let fcomments = comments_post_id == id ? comments: []

    return(
      <article className='card post-card'>

        { isOwner &&
          <div className='more-menu'>
            <IconMenu
               iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
               anchorOrigin={{horizontal: 'right', vertical: 'top'}}
               targetOrigin={{horizontal: 'right', vertical: 'top'}}>

               <MenuItem
                 primaryText="Edit"
                 leftIcon={<Edit />}
                 onTouchTap={this.handleEdit.bind(this)}/>

               <MenuItem
                 primaryText="Delete"
                 leftIcon={<Delete />}
                 onTouchTap={this.handleDelete.bind(this)}/>

             </IconMenu>
          </div>
        }

        <h1>{title}</h1>

        <pre className='post-content'>{content}</pre>

        <div className='card-bottom'>
          <section>
            {username}
          </section>

          <section className='info'>
            {date.format('MMM DD, YYYY')}
          </section>

          <section className='icons'>
            <IconButton onTouchTap={this.toggleComments.bind(this)} disabled={fetching}>
              <Comments />
            </IconButton>

            <span>{likes + this.state.vl}</span>
            <form id='upvote' onSubmit={this.handleLike.bind(this)}>
              <IconButton className={lcls} type='submit' disabled={fetching}><UpVote /></IconButton>
              <input type='hidden' value={id}/>
            </form>


            <span>{dislikes + this.state.vd}</span>
            <form id='downvote' onSubmit={this.handleDislike.bind(this)}>
              <IconButton className={dcls} type='submit' disabled={fetching}><DownVote/></IconButton>
              <input type='hidden' value={id}/>
            </form>
          </section>
        </div>

        <CommentSection
          ref='commentSection'
          onRequestFocus={this.handleCommentFocus.bind(this)}
          onRequestNewComment={this.handleNewCommentSubmit.bind(this)}
          onRequestMore={this.handleMoreComments.bind(this)}
          comments={fcomments}
          hasMore={more}
          errors={errors}
          open={this.state.copen}/>
      </article>
    )
  }
}
