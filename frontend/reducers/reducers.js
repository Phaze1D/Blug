import { combineReducers } from "redux"
import reduceReducers from "reduce-reducers"

import {
  userNewReducer,
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
  postCommentIndexReducer,
  addNewCommentReducer,
  commentsNextPageReducer
} from './Comments'

import {
  likeNewReducer,
  likeDeleteReducer,
  dislikeNewReducer,
  dislikeDeleteReducer
} from './LikesDislikes'

import { globalErrorReducer } from './GlobalError'

const currentUserReducer = reduceReducers(
  userNewReducer,
  loginReducer,
  logoutReducer,
  verifyReducer
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
)

const commentsReducer = reduceReducers(
  postCommentIndexReducer,
  addNewCommentReducer,
  commentsNextPageReducer
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
  post: postReducer,
  posts: postsReducer,
  comment: commentReducer,
  comments: commentsReducer,
  like: likeReducer,
  dislike: dislikeReducer,
  gerror: globalErrorReducer
})
