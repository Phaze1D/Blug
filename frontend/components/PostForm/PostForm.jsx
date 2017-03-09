import React from 'react'
import Portal from 'react-portal'
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import ContentClear from 'material-ui/svg-icons/content/clear'
import ActionDone from 'material-ui/svg-icons/action/done'
import classnames from 'classnames'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { postNew, postEdit } from '../../actions/Posts'


@connect((store) => {
  return {
    post: store.post
  }
})
export default class PostForm extends React.Component{
  constructor(props){
    super(props)
  }


  shouldComponentUpdate(nextProps, nextState) {
    let if_going_to_open = this.props.open && nextProps.open
    let if_done_verifing_and_not_logged_in = !nextProps.currentUser.verifing && !nextProps.currentUser.loggedIn

    if( if_going_to_open && if_done_verifing_and_not_logged_in ){
      hashHistory.push('/login');
      return false
    }

    return true
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post.success && !nextProps.post.fetching && this.props.open){
      nextProps.onRequestChange() 
    }
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
  }

  render(){
    const {
      loggedIn
    } = this.props.currentUser

    const {
      fetching,
      errors
    } = this.props.post

    const asideClasses = classnames('side-view', {'open': this.props.open && loggedIn})
    const overClasses = classnames('overlay', {'open': this.props.open && loggedIn})

    return(
      <Portal isOpened={true}>
        <div className={overClasses} onTouchTap={this.handleOverlayClick.bind(this)}>
          <AutoLockScrolling lock={this.props.open} />
          <aside className={asideClasses}>
            <form id='post-form' onSubmit={this.handleSubmit.bind(this)}>
              <header className='form-bar'>
                <IconButton className='form-button' onTouchTap={this.props.onRequestChange}>
                  <ContentClear/>
                </IconButton>

                <h3>{this.props.title}</h3>

                <IconButton className='form-button right' type='submit'>
                  <ActionDone/>
                </IconButton>
              </header>

              {fetching &&
                <div className='mini-progress-bar'>
                  <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/>
                </div>
              }

              {this.props.open ? <FormFields errors={errors}/> : null}

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
          autoComplete='off'/>
      </div>
    </div>
  )
}
