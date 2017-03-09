import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionSearch from 'material-ui/svg-icons/action/search'
import ContentClear from 'material-ui/svg-icons/content/clear'
import Search from '../Search/Search'
import PostForm from '../PostForm/PostForm'
import { verify } from '../../actions/Sessions'


@connect((store) => {
  return {
    currentUser: store.currentUser
  }
})
export default class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchOpen: false, rightOpen: false}
  }

  toggleSearch(event){
    this.setState({searchOpen: !this.state.searchOpen})
  }

  toggleRightSide(event){
    this.props.dispatch(verify())
    .then(this.onVerified.bind(this), this.onVerifiedError.bind(this))
  }

  onVerified(){
    this.setState({rightOpen: true})
  }

  onVerifiedError(){
    hashHistory.push('/login');
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

        <header className='layout-bar'>
          <img className='logo' src='/static/logo.svg'></img>

          <nav className='nav-bar'>
            <ul>
              <li className='active'><Link to='/posts?page=top'>Top</Link></li>
              <li><Link to='/posts?page=trending'>Trending</Link></li>
              <li><Link to='/posts?page=recent'>Recent</Link></li>
            </ul>
          </nav>

          <IconButton className='search-button' onTouchTap={this.toggleSearch.bind(this)}>
            <ActionSearch/>
          </IconButton>
        </header>


        <FloatingActionButton className='fab' secondary={true} onTouchTap={this.toggleRightSide.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>

        <PostForm
          open={this.state.rightOpen}
          title='New Post'
          currentUser={this.props.currentUser}
          onRequestChange={() => this.setState({rightOpen: false})}/>

        <div className='content'>
          {this.props.children}
        </div>

      </main>
    )
  }
}
