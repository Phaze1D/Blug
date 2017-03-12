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
  addNewPostReducer,
  postsNextPageReducer,
  postsIndexReducer,
  addUpdatePostReducer,
  removePostReducer,
  searchReducer
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

import {
  likeNewReducer,
  likeDeleteReducer,
  dislikeNewReducer,
  dislikeDeleteReducer
} from './LikesDislikes'


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
  postGetReducer
)

const postsReducer = reduceReducers(
  postsNextPageReducer,
  postsIndexReducer,
  addNewPostReducer,
  addUpdatePostReducer,
  removePostReducer,
  searchReducer
)

const commentReducer = reduceReducers(
  postCommentNewReducer,
  commentEditReducer
)

const commentsReducer = reduceReducers(
  postCommentIndexReducer
)

const likeReducer = reduceReducers(
  likeNewReducer,
  likeDeleteReducer
)

const dislikeReducer = reduceReducers(
  dislikeNewReducer,
  dislikeDeleteReducer
)

export default combineReducers({
  currentUser: currentUserReducer,
  user: userReducer,
  post: postReducer,
  posts: postsReducer,
  comment: commentReducer,
  comments: commentsReducer,
  like: likeReducer,
  dislike: dislikeReducer
})
