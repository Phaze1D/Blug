import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import classnames from 'classnames'
import { connect } from "react-redux"
import { hashHistory } from 'react-router';
import { login, verify } from '../../actions/Sessions'
import { userNew } from '../../actions/Users'
import { resetErrors } from '../../actions/ActionTypes'



/** connects to redux currentUser object */
@connect((store) => {
  return{
    currentUser: store.currentUser
  }
})

/** React Component representing the login page */
export default class Sessions extends React.Component{
  constructor(props){
    super(props)
    this.state = {isLoginForm: true}
  }

  componentWillMount(){
    // dispatches the verify action
    this.props.dispatch(verify()).then(this.onLoggedIn.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback for the verify action
  * Redirects if user is loggedIn
  */
  onLoggedIn(){
    hashHistory.push('/posts');
  }


  /**
  * Handler switching between login form and signup form
  * dispatch resetErrors for SESSION
  * @param {object} event
  */
  handleV2Tap(event){
    this.setState({isLoginForm: !this.state.isLoginForm})
    this.props.dispatch(resetErrors('SESSION'))
  }


  /**
  * Submit handler for when the login or sign up
  * dispatches the login or userNew action
  * @param {object} event
  */
  handleSubmit(event){
    event.preventDefault()
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if(this.state.isLoginForm){
      this.props.dispatch(login(username, password))
      .then(this.onLoggedIn.bind(this), this.onGlobalError.bind(this))
    }else{
      this.props.dispatch(userNew(username, password, email))
      .then(this.onLoggedIn.bind(this), this.onGlobalError.bind(this))
    }
  }


  /**
  * Callback for when any async actions fails
  * dispatches setGlobalError
  * @param {object} payload - http responses
  */
  onGlobalError(payload){
    if(payload.response){
      // this.props.dispatch(setGlobalError(payload.response.data.message, true))
    }else{
      this.props.dispatch(setGlobalError(payload.message, true))
    }
  }


  render(){
    const {
      verifing,
      fetching,
      errors
    } = this.props.currentUser

    this.emailErrors = errors && errors.email ? errors.email[0] : null
    this.usernameErrors = errors && errors.username ? errors.username[0] : null
    this.passwordErrors = errors && errors.password ? errors.password[0] : null

    let emailWrapper = classnames('hidden-wrapper', {'show': !this.state.isLoginForm})

    if( verifing ){
      return null
    }

    return(
      <div className='flex-central'>
        <section className='card sessions-card'>
          <h1>Blug</h1>
          <form id='login-form' method='#noneya' action='POST' onSubmit={this.handleSubmit.bind(this)} >
            <div className={emailWrapper}>
              <TextField
                id='email'
                name='email'
                floatingLabelText='Email'
                type='text'
                fullWidth={true}
                errorText={this.emailErrors}
                autoComplete='off'/>

            </div>

            <div className='input-wrapper'>
              <TextField
                id='username'
                name='username'
                floatingLabelText='Username'
                type='text'
                fullWidth={true}
                errorText={this.usernameErrors}
                autoComplete='off'/>
            </div>

            <div className='input-wrapper'>
              <TextField
                id='password'
                name='password'
                floatingLabelText='Password'
                type='password'
                fullWidth={true}
                errorText={this.passwordErrors}
                autoComplete='off'/>
            </div>

            <div className="button-wrapper">
              <RaisedButton
                className='flat-button'
                label={this.state.isLoginForm ? 'Login' : 'Sign Up'}
                secondary={true}
                fullWidth={true}
                disabled={fetching}
                type='submit'/>
            </div>

            <div className="button-wrapper">
              <RaisedButton
                onTouchTap={this.handleV2Tap.bind(this)}
                className='flat-button secondary'
                overlayStyle={{backgroundColor: 'rgba(0,0,0,0.07)'}}
                label={this.state.isLoginForm ? 'Sign Up' : 'Login'}
                fullWidth={true}
                disabled={fetching}
              />
            </div>
          </form>
        </section>
      </div>
    )
  }
}
