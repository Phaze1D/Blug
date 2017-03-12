from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.like import Like
from backend.models.post import Post
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException


class LikesController():

    def create(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')

        like = Like(
            post=ndb.Key('Post', long(post_id)),
            user=ndb.Key('User', long( current_user_id() ) ),
        )

        if like.is_valid() and not Like.already_exist(like.post.id(), like.user.id()):
            post = Post.get_by_id(long(post_id))
            post.likes = post.likes + 1
            post.put()

            key = like.put()
            ld = like.to_dict()
            ld['id'] = key.id()
            ld['post'] = like.post.id()
            ld['user'] = like.user.id()
            return jsonify(**ld)
        else:
            raise OwnerException(message='not auth')



    def delete(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')


        like = Like.get_by_post_user(long(post_id), current_user_id())

        if like:
            post = Post.get_by_id(long(post_id))
            post.likes = post.likes - 1
            post.put()
            like.key.delete()
            return jsonify(delete=True)
        else:
            raise OwnerException(message='not auth')
