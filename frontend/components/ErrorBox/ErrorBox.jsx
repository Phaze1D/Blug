import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


/** React Component  representing the global Error Box */
export default class ErrorBox extends React.Component{

  constructor(props){
    super(props)
    this.state = {show: false}
  }

  componentWillReceiveProps(nextProps) {
    // Set the show state to true if the nextProps.show is true
    // Then set is to false after 2 seconds
    if(nextProps.show){
      this.setState({show: true})
      setTimeout(() => {
        this.props.onRequestErrorShown()
        this.setState({show: false})
      }, 2000)
    }
  }

  render(){
    return(
      <ReactCSSTransitionGroup
        component={FirstChild}
        transitionName={ {
          enter: 'enter-error',
          leave: 'leave-error',
          appear: 'appear-error'
        } }
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        transitionAppearTimeout={400}>

        {this.state.show &&
          <div className='error-box'>
            <h2>Error</h2>
            <p>{this.props.message}</p>
          </div>
        }

      </ReactCSSTransitionGroup>
    )
  }
}

/**
* Component that handles empty ReactCSSTransitionGroup Component
* @param {object} props
* @return {component} if it is not empty else null
*/
function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
