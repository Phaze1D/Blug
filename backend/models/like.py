from google.appengine.ext import ndb
from backend.helpers.sessions import current_user_id
from backend.models.post import Post
from backend.models.user import User
import re


class Like(ndb.Model):
    """ A datastore ndb model that represents a Like

    Attributes:
        post: The Post Key that the dislike belongs to
        user: The User Key that created the dislike
        created: The date it was created
    """
    post = ndb.KeyProperty(kind='Post', required=True)
    user = ndb.KeyProperty(kind='User', required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)


    def is_valid(self):
        """ Check if Like is valid

        Returns:
            True if user and post exist and the user is not the owner of the post

        """

        user = User.get_by_id(self.user.id())
        post = Post.get_by_id(self.post.id())
        if user and post and not ( post.user.id() == user.key.id() ):
            return True
        return False


    @classmethod
    def already_exist(cls, post_id, user_id):
        """ Checks if post already exist

        Args:
            post_id: the post id to query
            user_id: the user id to query

        Returns:
            True if there is a like with the same user and post
        """

        like = cls.query(
            ndb.AND(
                cls.post == ndb.Key('Post', long(post_id) ),
                cls.user == ndb.Key('User', long(user_id) )
                )
            ).get()
        return bool(like)


    @classmethod
    def get_by_post_user(cls, post_id, user_id):
        """
        Args:
            post_id: the post id to query
            user_id: the user id to query

        Returns:
            The like that has a Post Key and User Key with the
            corrsponding ids
        """

        like = cls.query(
            ndb.AND(
                cls.post == ndb.Key('Post', long(post_id) ),
                cls.user == ndb.Key('User', long(user_id) )
                )
            ).get()
        return like
