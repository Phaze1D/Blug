import React from 'react'
import moment from 'moment'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import UpVote from 'material-ui/svg-icons/action/thumb-up'
import DownVote from 'material-ui/svg-icons/action/thumb-down'
import Edit from 'material-ui/svg-icons/image/edit'
import Comments from 'material-ui/svg-icons/communication/comment'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { likeNew, likeDelete, dislikeNew, dislikeDelete } from '../../actions/LikesDislikes'


@connect( (store) => {
  return {
    currentUser: store.currentUser
  }
})
export default class PostCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {liked: false, disliked: false, vl: 0, vd: 0}
  }

  handleEdit(event){
    this.props.onRequestEdit(this.props.post.id, this.props.index)
  }

  handleDislike(event){
    event.preventDefault()
    this.props.dispatch(dislikeNew(this.props.post.id))
    .then(this.onDisliked.bind(this), this.onError.bind(this))
  }

  onDisliked(){
    this.setState({disliked: true, vd: this.state.vd + 1})

    this.props.dispatch(likeDelete(this.props.post.id))
    .then(() => this.setState({liked: false, vl: this.state.vl - 1 }) )
  }

  handleLike(event){
    event.preventDefault()
    this.props.dispatch(likeNew(this.props.post.id))
    .then(this.onLiked.bind(this), this.onError.bind(this))
  }

  onLiked(){
    this.setState({liked: true, vl: this.state.vl + 1})

    this.props.dispatch( dislikeDelete(this.props.post.id) )
    .then(() => this.setState({disliked: false, vd: this.state.vd - 1}))
  }

  onError(payload){
    if(payload.response.status === 412){
      hashHistory.push('/login')
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
      user,
      isOwner
    } = this.props.post

    let date = moment(created, 'ddd, DD MMM YYYY HH:mm:ss zzz')

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
             </IconMenu>
          </div>
        }

        <h1>{title}</h1>

        <pre>{content}</pre>

        <div className='card-bottom'>
          <section>
            {user}
          </section>

          <section className='info'>
            {date.format('MMM DD, YYYY')}
          </section>

          <section className='icons'>
            <form id='upvote' onSubmit={this.handleLike.bind(this)}>
              <IconButton type='submit'><UpVote /></IconButton>
              <input type='hidden' value={id}/>
            </form>
            <span>{likes + this.state.vl}</span>

            <form id='downvote' onSubmit={this.handleDislike.bind(this)}>
              <IconButton type='submit'><DownVote/></IconButton>
              <input type='hidden' value={id}/>
            </form>
            <span>{dislikes + this.state.vd}</span>

            <IconButton><Comments/></IconButton>
          </section>

        </div>
      </article>
    )
  }
}
