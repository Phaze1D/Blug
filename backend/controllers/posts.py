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
    """ Using MVC and REST pattern for handling all the Post's api methods
    """

    def index(self, user_id = None):
        """ REST index method

        Params:
            cursor: A web safe string that represents the next page of pagination || None
            search: The search string to search for || None

        Args:
            user_id: The post forgien key that represents the user it belongs to

        Returns:
            An array of 15 JSON Post objects
        """

        json_results = {}
        if user_id:
            json_results = Post.users_with_pages(user_id=user_id, cursor=request.args.get('cursor'))
        elif bool(request.args.get('search')):
            json_results = Post.search(search_string=request.args.get('search'), cursor=request.args.get('cursor'))
        else:
            json_results = Post.all_with_pages(cursor=request.args.get('cursor'))

        return jsonify(**json_results)

    def get(self, post_id):
        """ REST get method

        Args:
            post_id: The id the post to get

        Returns:
            A JSON Post object

        Raises:
            OwnerException: if post is not found
        """

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
        """ REST create method

        Returns:
            A JSON object with the new Post information

        Raises:
            LoginException: if user is not logged in
            FormException: if Post info is not valid

        """

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
        """ REST update method

        Args:
            post_id: The post's id that will be updated

        Returns:
            A JSON object with the updated Post information

        Raises:
            LoginException: if user is not logged in
            FormException: if Post info is not valid
            OwnerException: if Post does not belong to current user
        """

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
        """ REST delete method

        Args:
            post_id: The post's id that will be deleted

        Returns:
            A JSON object key deleted set to true

        Raises:
            LoginException: if user is not logged in
            OwnerException: if Post does not belong to current user
        """

        if not is_login():
            raise LoginException(message='not logged in')

        post = Post.get_by_id(long(post_id))
        if post and post.user.id() == current_user_id():
            post.key.delete()
            return jsonify(deleted=True)
        else:
            raise OwnerException(message='unauth data')
