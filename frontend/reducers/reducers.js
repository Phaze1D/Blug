import { combineReducers } from "redux"
import reduceReducers from "reduce-reducers"

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
  logoutReducer,
  verifyReducer
 } from './Sessions'

import {
  postCommentNewReducer,
  commentEditReducer,
  postCommentIndexReducer
} from './Comments'


const currentUserReducer = reduceReducers(
  userNewReducer,
  loginReducer,
  logoutReducer,
  verifyReducer
)

const userReducer = reduceReducers(
  userGetReducer
)

const postReducer = reduceReducers(
  postNewReducer,
  postEditReducer,
  postGetReducer,
)

const postsReducer = reduceReducers(
  userPostsIndexReducer,
  postsIndexReducer
)

const commentReducer = reduceReducers(
  postCommentNewReducer,
  commentEditReducer
)

const commentsReducer = reduceReducers(
  postCommentIndexReducer
)

export default combineReducers({
  currentUser: currentUserReducer,
  user: userReducer,
  post: postReducer,
  posts: postsReducer,
  comment: commentReducer,
  comments: commentsReducer
})
