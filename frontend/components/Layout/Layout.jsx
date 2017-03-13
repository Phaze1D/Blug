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


@connect((store) => {
  return {
    currentUser: store.currentUser,
    gerror: store.gerror
  }
})
export default class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchOpen: false, menuOpen: false}
  }

  componentWillMount() {
    this.props.dispatch(verify())
  }

  toggleSearch(event){
    if(this.state.searchOpen){
      this.props.onRequestSearchClear(event)
    }
    this.setState({searchOpen: !this.state.searchOpen})
  }


  toggleMenu(event){
    this.setState({menuOpen: !this.state.menuOpen})
  }

  handleLogout(event){
    this.setState({menuOpen: false})
    this.props.dispatch(logout())
      .then(this.onLogout.bind(this), this.onGlobalError.bind(this))
  }

  onLogout(){
    hashHistory.push('/login')
  }

  handleLogin(event){
    this.setState({menuOpen: false})
    hashHistory.push('/login')
  }

  handleSearchSubmit(event){
    event.preventDefault()
    this.props.onRequestSearchSubmit(event)
  }

  onGlobalError(payload){
    if(payload.response){
      this.props.dispatch(setGlobalError(payload.response.data.message, true))
    }else{
      this.props.dispatch(setGlobalError(payload.message, true))
    }
  }

  onErrorShown(){
    this.props.dispatch(setGlobalError('', false))
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


// <nav className='nav-bar'>
//   <ul>
//     <li className='active'><Link to='/posts?page=top'>Top</Link></li>
//     <li><Link to='/posts?page=trending'>Trending</Link></li>
//     <li><Link to='/posts?page=recent'>Recent</Link></li>
//   </ul>
// </nav>
