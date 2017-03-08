import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../../utils/Theme.js'


const mtheme = getMuiTheme(Theme)

export default class Intro extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    setTimeout( () => {
      document.getElementById('top').style.transform = 'translate(0,-110%)'
      document.getElementById('bottom').style.transform = 'translate(0,110%)'
    }, 1000)
  }

  render(){

    return(
      <MuiThemeProvider muiTheme={mtheme}>
        <div className='intro'>
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
