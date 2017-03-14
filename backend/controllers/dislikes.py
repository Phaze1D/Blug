from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.dislike import Dislike
from backend.models.post import Post
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException



class DislikesController():
    """ Using MVC and REST pattern for handling all the Dislike's api methods
    """

    def create(self, post_id):
        """ REST create method

        Note:
            This also updates the corresponding Post by adding 1 to its dislike property

        Args:
            post_id: The post's id that will be disliked

        Returns:
            A JSON object with the dislike information

        Raises:
            LoginException: if user is not logged in
            FormException: if dislike is invalid || dislike already exist
        """

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
            raise FormException(message='not auth')



    def delete(self, post_id):
        """ REST delete method

        Note:
            This also updates the corresponding Post by subtracting 1 to its dislike property

        Args:
            post_id: The post's id that will be undisliked

        Returns:
            A JSON object with a simple deleted key value true

        Raises:
            LoginException: if user is not logged in
            OwnerException: if dislike was not found
        """

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
