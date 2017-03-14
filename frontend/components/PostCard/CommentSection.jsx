import React from 'react'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';


/** React Component representing the comment section of a PostCard */
export default class CommentSection extends React.Component{
  constructor(props){
    super(props)
    this.state = {height: 0, value: undefined}

    this.onSuccesComment = this.onSuccesComment.bind(this)
  }


  componentWillReceiveProps(nextProps) {
    // Handles the open and close animation for the comment section
    if(!this.props.open && nextProps.open){
      this.setState({height: this.refs.wrapper.clientHeight})
      setTimeout(() => this.setState({height: 'auto'}), 500)
    }else if(this.props.open && !nextProps.open){
      this.setState({height: this.refs.wrapper.clientHeight})
      setTimeout(() => this.setState({height: 0}), 100)
    }
  }


  /**
  * Submit handler for the comment form
  * @param {object} event
  */
  handleNewSubmit(event){
    event.preventDefault()
    let value = event.target.elements['comment'].value
    this.props.onRequestNewComment(value)
  }


  /**
  * Callback method for when a comment is submitted
  * Resets the form value
  */
  onSuccesComment(){
    this.setState({value: ''})
    setTimeout(() => this.setState({value: undefined}), 500)
  }



  render(){
    let error = this.props.errors && this.props.errors.comment ? this.props.errors.comment[0] : null

    const commentList = this.props.comments.map( (comment) => {
      let date = moment(comment.created, 'ddd, DD MMM YYYY HH:mm:ss zzz')
        return (
          <li key={comment.id}>
            <div className='comment-box'>
              <pre>
                {comment.comment}
              </pre>
              <div className='comment-bottom'>
                <p>
                  {comment.username}
                </p>
                <p>
                  {date.format('MMM DD, YYYY')}
                </p>
              </div>
            </div>
          </li>
        )
      }
    )

    return(
      <section className='comment-section' style={{height: this.state.height}}>
        <div className='wrapper' ref='wrapper'>
          <form method='POST' action='noneya' onSubmit={this.handleNewSubmit.bind(this)}>
            <TextField
              id='comment'
              name='comment'
              floatingLabelText='New Comment'
              type='text'
              onFocus={this.props.onRequestFocus}
              errorText={error}
              value={this.state.value}
              fullWidth={true}
              multiLine={true}
              autoComplete='off'/>

            <div className='b-wrapper'>
              <RaisedButton
                type='submit'
                label='Comment'
                secondary={true}/>
            </div>
          </form>

          <div className='comments'>
            <h5>Comments</h5>
            <ul>
              {commentList}
            </ul>
            {this.props.hasMore &&
              <FlatButton
                onTouchTap={this.props.onRequestMore}
                label='Load More'
                secondary={true}/>
            }
          </div>
        </div>
      </section>
    )
  }
}
