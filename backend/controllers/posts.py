from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.post import Post
from backend.models.user import User
from google.appengine.api import search
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException


class PostsController():

    def index(self, user_id = None):
        json_results = {}
        if user_id:
            json_results = Post.users_with_pages(user_id=user_id, cursor=request.args.get('cursor'))
        elif bool(request.args.get('search')):
            json_results = Post.search(search_string=request.args.get('search'), cursor=request.args.get('cursor'))
        else:
            json_results = Post.all_with_pages(cursor=request.args.get('cursor'))

        return jsonify(**json_results)

    def get(self, post_id):
        post = Post.get_by_id(long(post_id))
        if post:
            post_dict = post.to_dict()
            post_dict['id'] = post.key.id()
            user_key = post_dict['user']
            post_dict['isOwner'] = current_user_id() == user_key.id()
            post_dict.pop('user', None)
            return jsonify(**post_dict)
        else:
            raise OwnerException(message='unauth data')


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
            user_key = post_dict['user']
            post_dict['isOwner'] = current_user_id() == user_key.id()
            post_dict.pop('user', None)

            return jsonify(**post_dict)
        else:
            raise FormException(message='invalid post data', payload=post.errors())


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
                user_key = post_dict['user']
                post_dict['isOwner'] = current_user_id() == user_key.id()
                post_dict.pop('user', None)
                return jsonify(**post_dict)
            else:
                raise FormException(message='invalid post data', payload=post.errors())

        raise OwnerException(message='unauth data')

    def delete(self, post_id):
        if not is_login():
            raise LoginException(message='not logged in')

        post = Post.get_by_id(long(post_id))
        if post and post.user.id() == current_user_id():
            post.key.delete()
            return jsonify(deleted=True)
        else:
            raise OwnerException(message='unauth data')
