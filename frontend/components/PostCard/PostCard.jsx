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


export default class PostCard extends React.Component{
  constructor(props){
    super(props)
  }

  handleEdit(event){
    this.props.onRequestEdit(this.props.post.id, this.props.index)
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
            <IconButton><UpVote /></IconButton>
            <span>{likes}</span>
            <IconButton><DownVote/></IconButton>
            <span>{dislikes}</span>
            <IconButton><Comments/></IconButton>
          </section>

        </div>
      </article>
    )
  }
}
