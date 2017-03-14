from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.like import Like
from backend.models.post import Post
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException


class LikesController():
    """ Using MVC and REST pattern for handling all the Like's api methods
    """

    def create(self, post_id):
        """ REST create method

        Note:
            This also updates the corresponding Post by adding 1 to its like property

        Args:
            post_id: The post's id that will be liked

        Returns:
            A JSON object with the like information

        Raises:
            LoginException: if user is not logged in
            FormException: if the like is invalid || like already exist
        """

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
            raise FormException(message='not auth')



    def delete(self, post_id):
        """ REST delete method

        Note:
            This also updates the corresponding Post by subtracting 1 to its like property

        Args:
            post_id: The post's id that will be unliked

        Returns:
            A JSON object with a simple deleted key value true

        Raises:
            LoginException: if user is not logged in
            OwnerException: if like was not found
        """

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
