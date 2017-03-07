import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames'




export default class Sessions extends React.Component{
  constructor(props){
    super(props)
    this.state = {isLogin: true}

  }

  handleV2Tap(event){
    this.setState({isLogin: !this.state.isLogin})
  }

  render(){
    let emailClasses = classnames('hidden-wrapper', {'show': !this.state.isLogin})

    return(
      <div className='flex-central'>
        <section className='card sessions-card'>
          <h1>Blug</h1>
          <form method='/login' action='POST'>
            <div className={emailClasses}>
              <TextField
                name='email'
                floatingLabelText='Email'
                type='text'
                fullWidth={true}
              />
            </div>

            <TextField
              name='username'
              floatingLabelText='Username'
              type='text'
              fullWidth={true}
            />

            <TextField
              name='password'
              floatingLabelText='Password'
              type='password'
              fullWidth={true}
            />

            <div className="button-wrapper">
              <RaisedButton
                className='flat-button'
                label={this.state.isLogin ? 'Login' : 'Sign Up'}
                primary={true}
                fullWidth={true}
              />
            </div>

            <div className="button-wrapper">
              <RaisedButton
                onTouchTap={this.handleV2Tap.bind(this)}
                className='flat-button secondary'
                overlayStyle={{backgroundColor: 'rgba(0,0,0,0.07)'}}
                label={this.state.isLogin ? 'Sign Up' : 'Login'}
                fullWidth={true}
              />
            </div>

          </form>
        </section>
      </div>
    )
  }
}


// <div className="button-wrapper">
//   <RaisedButton
//     label="Sign Up"
//     fullWidth={true}
//   />
// </div>
