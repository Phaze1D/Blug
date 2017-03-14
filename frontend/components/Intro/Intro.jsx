import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import LinearProgress from 'material-ui/LinearProgress'
import Theme from '../../utils/Theme.js'
import { connect } from 'react-redux'

const mtheme = getMuiTheme(Theme)

/** connect to the entire redux store */
@connect((store) => {
  return store
})

/** React Component  representing the intro animation and initialize the app */
export default class Intro extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    // Removes the intro screen afte 1 second
    setTimeout( () => {
      document.getElementById('top').style.transform = 'translate(0,-110%)'
      document.getElementById('bottom').style.transform = 'translate(0,110%)'
    }, 1000)
  }

  render(){
    const {
      currentUser,
      posts,
      comments
    } = this.props

    const showBar = currentUser.verifing || posts.fetching || currentUser.fetching || comments.fetching

    return(
      <MuiThemeProvider muiTheme={mtheme}>

        <div className='intro'>

          { showBar &&
            <div className='progress-bar'>
              <LinearProgress mode="indeterminate" className='bar' color='rgb(41,121,255)'/>
            </div>
          }

          <section id='top' className='intro-section'>
            <div className='top'>
              Blug
            </div>
          </section>

          <section id='bottom' className='intro-section'>
            <div className='bottom'>
              Blug
            </div>
          </section>

          {this.props.children}

        </div>
      </MuiThemeProvider>
    )
  }
}
