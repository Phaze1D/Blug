import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



export default class ErrorBox extends React.Component{
  constructor(props){
    super(props)
    this.state = {show: false}
  }

  componentWillReceiveProps(nextProps) {
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

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
