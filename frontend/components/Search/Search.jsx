import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Overlay from 'material-ui/internal/Overlay';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';
import classnames from 'classnames'




export default class Search extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const seaClasses = classnames('msearch-bar', {'window': this.props.isWindow})
    const backIcon = this.props.backIcon ? this.props.backIcon : <ArrowBack/> ;

    return(
        <div>
          {this.props.showOverlay &&
            <Overlay
              show={this.props.open}
              className='msearch-overlay'
              onTouchTap={this.props.onRequestClear}/>
          }


          <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-search',
            leave: 'leave-search',
            appear: 'appear-search'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>
            {this.props.open &&
              <form method='GET' className={seaClasses} style={this.props.barStyle} onSubmit={this.props.onRequestSearch}>
                <IconButton className='msearch-back' onTouchTap={this.props.onRequestClear} disableTouchRipple={true}>
                  {backIcon}
                </IconButton>
                <TextField
                  type="search"
                  name={this.props.name}
                  hintStyle={{fontSize: '20px'}}
                  className='msearch-input'
                  hintText='Search...'
                  autoComplete='off'
                  underlineShow={false}/>

              </form>
            }
          </ReactCSSTransitionGroup>

        </div>
    )
  }
}
