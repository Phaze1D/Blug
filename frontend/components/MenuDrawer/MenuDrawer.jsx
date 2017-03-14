import React from 'react'
import Portal from 'react-portal'
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import Enter from 'material-ui/svg-icons/action/power-settings-new'
import MenuItem from 'material-ui/MenuItem'
import classnames from 'classnames'


/** React Component representing the left menu drawer */
export default class MenuDrawer extends React.Component{
  constructor(props){
    super(props)

  }

  /**
  * Handler for when the ovelay is click so as to close the drawer
  * @param {object} event
  */
  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.props.onRequestChange()
    }
  }

  render(){

    const asideClasses = classnames('menu-drawer', {'open': this.props.open})
    const overClasses = classnames('overlay', {'open': this.props.open})

    return(
      <Portal isOpened={true}>
        <div className={overClasses} onTouchTap={this.handleOverlayClick.bind(this)}>
          <AutoLockScrolling lock={this.props.open} />
          <aside className={asideClasses}>
            {this.props.loggedIn ?
              <MenuItem
                onTouchTap={this.props.onRequestLogout}
                primaryText="Logout"
                rightIcon={<Exit />} />
              :
              <MenuItem
                onTouchTap={this.props.onRequestLogin}
                primaryText="Login"
                rightIcon={<Enter />} />
            }
          </aside>
        </div>
      </Portal>
    )
  }
}
