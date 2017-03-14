from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.post import Post
from backend.models.comment import Comment
from backend.helpers.sessions import is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException

class CommentsController():
    """ Using MVC and REST pattern for handling all the comment's api methods
    """

    def index(self, post_id):
        """ REST index method

        Params:
            cursor: A web safe string that represents the next page of pagination || None

        Args:
            post_id: The comments forgien key that belows to a post.

        Returns:
            An array of length 15 of JSON Comments objects
        """

        json_results = Comment.index_page_json(post_id=post_id, cursor=request.args.get('cursor'))
        return jsonify(**json_results)


    def create(self, post_id):
        """ REST create method

        Args:
            post_id: The id of the comment's owner

        Returns:
            A JSON object with the new Comment information

        Raises:
            LoginException: if user not login
            FormException: if form data is invalid
        """

        if not is_login():
            raise LoginException(message='not logged in')

        comment = Comment(
            post=ndb.Key('Post', long(post_id)),
            comment=request.form.get('comment'),
        )

        if comment.is_valid():
            key = comment.put()
            comment_dict = key.get().to_dict()
            comment_dict['id'] = key.id()
            comment_dict['user'] = comment_dict['user'].id()
            comment_dict['post'] = comment_dict['post'].id()
            return jsonify(**comment_dict)
        else:
            raise FormException(message='invalid comment data', payload=comment.errors())




    def update(self, comment_id):
        """ REST update method

        Args:
            comment_id: The id of the comment

        Returns:
            A JSON object with the updated Comment information

        Raises:
            LoginException: if user not login
            FormException: if form data is invalid
            OwnerException: if comment's user is not the current user
        """

        if not is_login():
            raise LoginException(message='not logged in')

        comment = ndb.Key(Comment, long(comment_id)).get()

        if bool(comment) and comment.user.id() == current_user_id():
            comment.comment = request.form.get('comment')
            if comment.is_valid():
                key = comment.put()
                comment_dict = key.get().to_dict()
                comment_dict['id'] = key.id()
                comment_dict['user'] = comment_dict['user'].id()
                comment_dict['post'] = comment_dict['post'].id()
                return jsonify(**comment_dict)
            else:
                raise FormException(message='invalid comment data', payload=comment.errors())

        raise OwnerException(message='unauth data')
