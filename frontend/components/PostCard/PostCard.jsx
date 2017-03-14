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



@connect( (store) => {
  return {
    like: store.like,
    dislike: store.dislike,
    comment: store.comment,
    comments: store.comments
  }
})
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
    if(nextProps.comments.comments_post_id != this.props.post.id){
      this.setState({copen: false})
    }
  }

  handleEdit(event){
    this.props.onRequestEdit(this.props.post.id, this.props.index)
  }

  handleDislike(event){
    event.preventDefault()
    this.props.dispatch(dislikeNew(this.props.post.id))
    .then(this.onDisliked.bind(this), this.onGlobalError.bind(this))
  }

  onDisliked(){
    this.setState({disliked: true, vd: this.state.vd + 1})
    this.props.dispatch(likeDelete(this.props.post.id))
    .then(() => this.setState({liked: false, vl: this.state.vl - 1 }) )
  }

  handleLike(event){
    event.preventDefault()
    this.props.dispatch(likeNew(this.props.post.id))
    .then(this.onLiked.bind(this), this.onGlobalError.bind(this))
  }

  onLiked(){
    this.setState({liked: true, vl: this.state.vl + 1})
    this.props.dispatch( dislikeDelete(this.props.post.id) )
    .then(() => this.setState({disliked: false, vd: this.state.vd - 1}))
  }

  handleDelete(event){
    this.props.dispatch(postDelete(this.props.post.id))
    .then(this.onDeleted.bind(this), this.onGlobalError.bind(this))
  }

  onDeleted(){
    this.props.dispatch(removePost(this.props.index))
  }

  toggleComments(event){
    if(!this.state.copen){
      this.props.dispatch(postCommentIndex(this.props.post.id))
      .then(this.onReceivedComments.bind(this), this.onGlobalError.bind(this))
    }else{
      this.setState({copen: false})
    }
  }

  onReceivedComments(){
    if(this.props.comments.comments_post_id == this.props.post.id){
      this.props.dispatch(resetErrors("COMMENT"))
      this.setState({copen: true})
    }
  }

  handleNewCommentSubmit(value){
    this.props.dispatch(postCommentNew(this.props.post.id, value))
    .then(this.onCommentSubmited.bind(this), this.onCommentFailed.bind(this))
  }

  onCommentSubmited(){
    this.refs.commentSection.onSuccesComment()
    this.props.dispatch(addNewComment(this.props.comment.comment))
  }

  onCommentFailed(payload){
    if(payload.response.status == 412){
      hashHistory.push('/login')
    }
  }

  handleCommentFocus(event){
    this.props.dispatch(resetErrors("COMMENT"))
  }

  handleMoreComments(event){
    this.props.dispatch(commentsNextPage(this.props.post.id, this.props.comments.cursor))
    .then(null, this.onGlobalError.bind(this))
  }

  onGlobalError(payload){
    if(payload.response){
      hashHistory.push('/login')
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
