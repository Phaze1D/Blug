import { combineReducers } from "redux"
import {
  userNewReducer,
  userGetReducer
} from './Users'

import {
  postNewReducer,
  postEditReducer,
  postGetReducer,
  userPostsIndexReducer,
  postsIndexReducer
 } from './Posts'

import {
  loginReducer,
  logoutReducer
 } from './Sessions'

import {
  postCommentNewReducer,
  commentEditReducer,
  postCommentIndexReducer
} from './Comments'


export default combineReducers({
  userNewReducer,
  userGetReducer,
  postNewReducer,
  postEditReducer,
  postGetReducer,
  userPostsIndexReducer,
  postsIndexReducer,
  loginReducer,
  logoutReducer,
  postCommentNewReducer,
  commentEditReducer,
  postCommentIndexReducer
})
