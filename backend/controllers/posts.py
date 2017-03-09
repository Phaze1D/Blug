from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.post import Post
from backend.models.user import User
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException

import logging
import time

class PostsController():

    def index(self, user_id = None):
        # time.sleep(5)
        json_results = Post.index_page_json(user_id=user_id, cursor=request.args.get('cursor'))
        return jsonify(**json_results)

    def get(self, post_id):
        pass

    def new(self):
        pass

    def create(self):
        if not is_login():
            raise LoginException(message='not logged in')

        post = Post(
            title=request.form.get('title'),
            content=request.form.get('content'),
        )

        if post.is_valid():
            key = post.put()
            post_dict = key.get().to_dict()
            post_dict['id'] = key.id()
            post_dict['user'] = post_dict['user'].id()
            return jsonify(**post_dict)
        else:
            raise FormException(message='invalid post data', payload=post.errors())


    def edit(self, post_id):
        pass

    def update(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')

        post = ndb.Key(Post, long(post_id)).get()
        if bool(post) and current_user_id() == post.user.id():
            post.title=request.form.get('title')
            post.content=request.form.get('content')

            if post.is_valid():
                key = post.put()
                post_dict = key.get().to_dict()
                post_dict['id'] = key.id()
                post_dict['user'] = post_dict['user'].id()
                return jsonify(**post_dict)
            else:
                raise FormException(message='invalid post data', payload=post.errors())

        raise OwnerException(message='unauth data')

    def delete(self, post_id):
        pass
