import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ContentClear from 'material-ui/svg-icons/content/clear'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Search from '../Search/Search'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import ErrorBox from '../ErrorBox/ErrorBox'
import { verify, logout } from '../../actions/Sessions'
import { setGlobalError } from '../../actions/ActionTypes'


/** connect to the currentUser and global error on the redux store */
@connect((store) => {
  return {
    currentUser: store.currentUser,
    gerror: store.gerror
  }
})

/** React Component representing the layout of the app with the left and
*   right drawers and the FAB and toolbar
*/
export default class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchOpen: false, menuOpen: false}
  }

  componentWillMount() {
    this.props.dispatch(verify())
  }


  /**
  * Toggle event for the search bar
  * @param {object} event
  */
  toggleSearch(event){
    if(this.state.searchOpen){
      this.props.onRequestSearchClear(event)
    }
    this.setState({searchOpen: !this.state.searchOpen})
  }


  /**
  * Toggle event for the left menu drawer
  * @param {object} event
  */
  toggleMenu(event){
    this.setState({menuOpen: !this.state.menuOpen})
  }


  /**
  * Handler for the logout event. This dispatches the logout action
  * @param {object} event
  */
  handleLogout(event){
    this.setState({menuOpen: false})
    this.props.dispatch(logout())
      .then(this.onLogout.bind(this), this.onGlobalError.bind(this))
  }


  /**
  * Callback method if the logout action succeeded.
  * Redirects to the login page
  */
  onLogout(){
    hashHistory.push('/login')
  }


  /**
  * Handler for the login button event. Called when the login button on
  * the menu drawer is pressed. Redirects to the login page
  * @param {object} event
  */
  handleLogin(event){
    this.setState({menuOpen: false})
    hashHistory.push('/login')
  }


  /**
  * Submit Handler for the search form
  * @param {object} event
  */
  handleSearchSubmit(event){
    event.preventDefault()
    this.props.onRequestSearchSubmit(event)
  }


  /**
  * Callback method for when any async action fails. This sets a new global
  * error from http response
  * @param {object} payload - The http response
  */
  onGlobalError(payload){
    if(payload.response){
      this.props.dispatch(setGlobalError(payload.response.data.message, true))
    }else{
      this.props.dispatch(setGlobalError(payload.message, true))
    }
  }


  /**
  * Callback method for when the global error box disappears
  * This just sets the global redux object to show false
  */
  onErrorShown(){
    this.props.dispatch(setGlobalError(this.props.gerror.error, false))
  }



  render(){
    const {
      error,
      show
    } = this.props.gerror

    return(
      <main>
        <Search
          isWindow={true}
          showOverlay={false}
          name='main-search'
          backIcon={<ContentClear/>}
          open={this.state.searchOpen}
          onRequestClear={this.toggleSearch.bind(this)}
          onRequestSearch={this.handleSearchSubmit.bind(this)}/>

        <ErrorBox
          onRequestErrorShown={this.onErrorShown.bind(this)}
          show={show}
          message={error}/>

        <MenuDrawer
          loggedIn={this.props.currentUser.loggedIn}
          open={this.state.menuOpen}
          onRequestChange={this.toggleMenu.bind(this)}
          onRequestLogout={this.handleLogout.bind(this)}
          onRequestLogin={this.handleLogin.bind(this)}/>

        <header className='layout-bar'>
            <IconButton className='menu-button' onTouchTap={this.toggleMenu.bind(this)}>
              <Menu/>
            </IconButton>

          <h1>Blug</h1>

          <IconButton className='search-button' onTouchTap={this.toggleSearch.bind(this)}>
            <ActionSearch/>
          </IconButton>
        </header>

        <div className='content'>
          {this.props.children}
        </div>

        <FloatingActionButton className='fab' secondary={true} onTouchTap={this.props.onRequestNew}>
          <ContentAdd />
        </FloatingActionButton>
      </main>
    )
  }
}
