import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import classnames from 'classnames'
import { connect } from "react-redux"
import { hashHistory } from 'react-router';
import { login, verify } from '../../actions/Sessions'
import { userNew } from '../../actions/Users'




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

  componentWillMount() {
    this.props.dispatch(verify())
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.currentUser.loggedIn){
      hashHistory.push('/posts');
      return false
    }
    return true
  }

  handleV2Tap(event){
    this.setState({isLoginForm: !this.state.isLoginForm})
  }

  handleSubmit(event){
    event.preventDefault()
    let form = document.getElementById('login-form')
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if(this.state.isLoginForm){
      this.props.dispatch(login(username, password))
    }else{
      this.props.dispatch(userNew(username, password, email))
    }
  }

  render(){
    const {
      verifing,
      fetching,
      errors
    } = this.props.currentUser

    let emailErrors = errors && errors.email ? errors.email[0] : null
    let usernameErrors = errors && errors.username ? errors.username[0] : null
    let passwordErrors = errors && errors.password ? errors.password[0] : null

    let emailWrapper = classnames('hidden-wrapper', {'show': !this.state.isLoginForm})


    if(verifing){
      return(
        <div className='flex-central'>
          <div className='session-progress-bar'>
            <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/>
          </div>
        </div>
      )
    }

    return(
      <div className='flex-central'>
        <div className='session-progress-bar'>
          {fetching ? <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/> : null}
        </div>
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
                errorText={emailErrors}
                autoComplete='off'
              />

            </div>

            <div className='input-wrapper'>
              <TextField
                id='username'
                name='username'
                floatingLabelText='Username'
                type='text'
                fullWidth={true}
                errorText={usernameErrors}
                autoComplete='off'
              />
            </div>

            <div className='input-wrapper'>
              <TextField
                id='password'
                name='password'
                floatingLabelText='Password'
                type='password'
                fullWidth={true}
                errorText={passwordErrors}
                autoComplete='off'
              />
            </div>

            <div className="button-wrapper">
              <RaisedButton
                className='flat-button'
                label={this.state.isLoginForm ? 'Login' : 'Sign Up'}
                secondary={true}
                fullWidth={true}
                disabled={fetching}
                type='submit'
              />
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
