from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.dislike import Dislike
from backend.models.post import Post
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException


import logging

class DislikesController(object):

    def create(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')

        dislike = Dislike(
            post=ndb.Key('Post', long( post_id) ),
            user=ndb.Key('User', long( current_user_id() ) ),
        )

        if dislike.is_valid() and not Dislike.already_exist(dislike.post.id(), dislike.user.id()):
            post = Post.get_by_id(long(post_id))
            post.dislikes = post.dislikes + 1
            post.put()

            key = dislike.put()
            ld = dislike.to_dict()
            ld['id'] = key.id()
            ld['post'] = dislike.post.id()
            ld['user'] = dislike.user.id()
            return jsonify(**ld)
        else:
            raise OwnerException(message='not auth')



    def delete(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')

        dislike = Dislike.get_by_post_user(long(post_id), current_user_id())
        if dislike:
            post = Post.get_by_id(long(post_id))
            post.dislikes = post.dislikes - 1
            post.put()
            dislike.key.delete()
            return jsonify(delete=True)
        else:
            raise OwnerException(message='not auth')
