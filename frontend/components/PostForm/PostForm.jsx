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
import { postNew, postEdit } from '../../actions/Posts'
import { resetErrors } from '../../actions/ActionTypes'


@connect((store) => {
  return {
    post: store.post
  }
})
export default class PostForm extends React.Component{
  constructor(props){
    super(props)
  }


  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.props.onRequestChange()
    }
  }

  handleSubmit(event){
    event.preventDefault()
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    this.props.dispatch(postNew(title, content))
    .then(this.onPostSuccess.bind(this), this.onPostError.bind(this))
  }

  onPostSuccess(){
    this.props.onRequestChange()
  }

  onPostError(){

  }

  handleOnFocus(event){
    this.props.dispatch(resetErrors("POST"))
  }

  render(){
    const {
      loggedIn
    } = this.props.currentUser

    const {
      fetching,
      errors
    } = this.props.post

    const asideClasses = classnames('side-view', {'open': this.props.open})
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

                <h3>{this.props.title}</h3>

                <IconButton className='form-button right' type='submit' disabled={fetching}>
                  <ActionDone/>
                </IconButton>
              </header>

              {fetching &&
                <div className='mini-progress-bar'>
                  <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/>
                </div>
              }

              {this.props.open ? <FormFields errors={errors} onFocus={this.handleOnFocus.bind(this)}/> : null}

            </form>
          </aside>
        </div>
      </Portal>
    )
  }
}


const FormFields = (props) => {
  let titleError = props.errors && props.errors.title ? props.errors.title[0] : null
  let contentError = props.errors && props.errors.content ? props.errors.content[0] : null
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
          autoComplete='off'/>
      </div>
    </div>
  )
}
