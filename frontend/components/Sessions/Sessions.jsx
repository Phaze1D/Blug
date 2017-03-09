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




@connect((store) => {
  return{
    currentUser: store.currentUser
  }
})
export default class Sessions extends React.Component{
  constructor(props){
    super(props)
    this.state = {isLoginForm: true}
  }

  componentWillMount(){
    this.props.dispatch(verify()).then(this.onLoggedIn.bind(this), this.onLoggedInError.bind(this))
  }

  onLoggedIn(){
    hashHistory.push('/posts');
  }

  onLoggedInError(){
  }

  handleV2Tap(event){
    this.setState({isLoginForm: !this.state.isLoginForm})
    this.props.dispatch(resetErrors('SESSION'))
  }

  handleSubmit(event){
    event.preventDefault()
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if(this.state.isLoginForm){
      this.props.dispatch(login(username, password))
      .then(this.onLoggedIn.bind(this), this.onLoggedInError.bind(this))
    }else{
      this.props.dispatch(userNew(username, password, email))
      .then(this.onLoggedIn.bind(this), this.onLoggedInError.bind(this))
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
