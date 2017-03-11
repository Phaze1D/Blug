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
import { logout } from '../../actions/Sessions'


@connect((store) => {
  return {
    currentUser: store.currentUser
  }
})
export default class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchOpen: false, menuOpen: false}
  }

  toggleSearch(event){
    this.setState({searchOpen: !this.state.searchOpen})
  }


  toggleMenu(event){
    this.setState({menuOpen: !this.state.menuOpen})
  }

  handleLogout(event){
    this.setState({menuOpen: false})
    this.props.dispatch(logout()).then(this.props.onRequestLogout)
  }

  handleLogin(event){
    this.setState({menuOpen: false})
    hashHistory.push('/login')
  }

  render(){

    return(
      <main>
        <Search
          isWindow={true}
          showOverlay={false}
          backIcon={<ContentClear/>}
          open={this.state.searchOpen}
          onRequestChange={this.toggleSearch.bind(this)}/>

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
