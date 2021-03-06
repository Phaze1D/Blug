import React from 'react'
import Portal from 'react-portal'
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import ContentClear from 'material-ui/svg-icons/content/clear'
import ActionDone from 'material-ui/svg-icons/action/done'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { postNew, postEdit, addNewPost, addUpdatePost } from '../../actions/Posts'
import { resetErrors } from '../../actions/ActionTypes'

/** connects to redux post object*/
@connect((store) => {
  return {
    post: store.post
  }
})

/** React Component representing the right drawer and the post form */
export default class PostForm extends React.Component{
  constructor(props){
    super(props)
  }


  /**
  * Handler method for when the overlay is clicked
  * @param {object} event
  */
  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.props.onRequestChange()
    }
  }


  /**
  * Submit handler for the for. This handles both update and create
  * This dispatches postEdit or postNew actions
  * @param {object} event
  */
  handleSubmit(event){
    event.preventDefault()
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value

    if(this.props.updateIndex >= 0){
      this.props.dispatch(postEdit(this.props.post.post.id, title, content))
      .then(this.onPostSuccess.bind(this), this.onPostFailed.bind(this))
    }else{
      this.props.dispatch(postNew(title, content))
      .then(this.onPostSuccess.bind(this), this.onPostFailed.bind(this))
    }

  }


  /**
  * Callback method for the postEdit or postNew action
  * if they are successful
  * This dispatches the addUpdatePost or addNewPost actions
  */
  onPostSuccess(){
    if(this.props.updateIndex >= 0){
      this.props.dispatch(addUpdatePost(this.props.post.post, this.props.updateIndex))
    }else{
      this.props.dispatch(addNewPost(this.props.post.post))
    }
    this.props.onRequestChange()
  }


  /**
  * Callback method for when the postEdit or postNew action fails
  * Redirects the user if not logged in
  */
  onPostFailed(payload){
    if(payload.response.status == 412){
      hashHistory.push('/login')
    }
  }


  /**
  * Handler for the focus event
  * This dispatch the resetErrors for post form
  * @param {object} event
  */
  handleOnFocus(event){
    this.props.dispatch(resetErrors("POST"))
  }

  render(){
    const {
      fetching,
      errors,
      post
    } = this.props.post

    const asideClasses = classnames('side-form', {'open': this.props.open})
    const overClasses = classnames('overlay', {'open': this.props.open})

    return(
      <Portal isOpened={true}>
        <div className={overClasses} onTouchTap={this.handleOverlayClick.bind(this)}>
          <AutoLockScrolling lock={this.props.open} />
          <aside className={asideClasses}>
            <form id='post-form' onSubmit={this.handleSubmit.bind(this)}>
              <header className='form-bar'>
                <IconButton className='form-button' onTouchTap={this.props.onRequestChange} disabled={fetching}>
                  <ContentClear/>
                </IconButton>

                <h3>{this.props.updateIndex >= 0 ? 'Update Post' : 'New Post'}</h3>

                <IconButton className='form-button right' type='submit' disabled={fetching || !this.props.open}>
                  <ActionDone/>
                </IconButton>
              </header>

              {fetching &&
                <div className='mini-progress-bar'>
                  <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/>
                </div>
              }

              {this.props.open ?
                <FormFields
                  post={post}
                  errors={errors}
                  onFocus={this.handleOnFocus.bind(this)}/> : null}

            </form>
          </aside>
        </div>
      </Portal>
    )
  }
}


/** React Component that represents the form fields */
const FormFields = (props) => {
  let titleError = props.errors && props.errors.title ? props.errors.title[0] : null
  let contentError = props.errors && props.errors.content ? props.errors.content[0] : null
  let title = props.post ? props.post.title : null
  let content = props.post ? props.post.content : null
  return (
    <div className='form-fields'>
      <div className='input-wrapper'>
        <TextField
          id='title'
          name='title'
          className='input-lg'
          floatingLabelText='Title'
          type='text'
          fullWidth={true}
          errorText={titleError}
          onFocus={props.onFocus}
          defaultValue={title}
          autoComplete='off'/>
      </div>

      <div className='input-wrapper'>
        <TextField
          id='content'
          name='content'
          floatingLabelText='Content'
          type='text'
          fullWidth={true}
          multiLine={true}
          errorText={contentError}
          onFocus={props.onFocus}
          defaultValue={content}
          autoComplete='off'/>
      </div>
    </div>
  )
}
