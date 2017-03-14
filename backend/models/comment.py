from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor
from backend.helpers.sessions import current_user_id
from backend.models.post import Post
from backend.models.user import User
import re

class Comment(ndb.Model):
    """ A datastore ndb model that represents a Comment

    Attributes:
        post: The Post Key that the comment belongs to
        user: The User Key that created the comment
        username: The user name that created the comment
        comment: The comment text
        created: The date the it was created
    """
    post = ndb.KeyProperty(kind='Post', required=True)
    user = ndb.KeyProperty(kind='User', required=True)
    username = ndb.StringProperty(required=True)
    comment = ndb.TextProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)


### Instance Methods

    def is_valid(self):
        """ Check to see if comment is valid

        Returns:
            True no errors else false
        """

        if bool(self.__comment_errors()) or bool(self.__post_errors()):
            return False
        return True


    def errors(self):
        """ Gets the errors of a comment

        Returns:
            Dictionary of key comments value array of strings
            and key post value array of strings
        """

        return {
            'comment': self.__comment_errors(),
            'post': self.__post_errors()
        }


    def get_user(self):
        """
        Returns:
            The User Entity that created this comment
        """
        return self.user.get()


    def get_post(self):
        """
        Returns:
            The Post Entity this comment belongs to
        """
        return self.post.get()


### Class Methods

    @classmethod
    def index_page_json(cls, post_id, cursor=None, per_page=8):
        """
        Args:
            post_id: The query id to search for comments that belong
                to the corrsponding Post
            cursor: A urlsafe string that detonates the current offset of pagination
            per_page: How many comments should be retrived from datastore

        Returns:
            Dictionary of the next cursor, whether there are more comments left
            and an array of comments
        """

        cursor = Cursor(urlsafe=cursor)
        comments, next_cursor, more = cls.query(
            cls.post == ndb.Key('Post', long(post_id))
        ).order(-cls.created).fetch_page(per_page, start_cursor=cursor)

        nc = next_cursor.urlsafe() if bool(next_cursor) else ''
        results = {'cursor': nc, 'more': more, 'comments': [], 'comments_post_id': post_id}

        for comment in comments:
            cd = comment.to_dict()
            cd['id'] = comment.key.id()
            cd['user'] = cd['user'].id()
            cd['post'] = cd['post'].id()
            results['comments'].append(cd)

        return results


### Private Instance Methods

    def _pre_put_hook(self):
        """ The pre hook method before a comment is saved

        Note: if the comment is newly created it adds the current user id
            and the username
        """

        if not bool(self.key.id()):
            self.user=ndb.Key(User, long( current_user_id() ) )
            self.username = self.user.get().username


    def __comment_errors(self):
        """ Regex validation of the attribute comment

        Return:
            An array of string corrsponding to an error message
        """

        errors = []
        if bool(self.comment):
            if not bool(re.match("^[\s\S]{3,256}$", self.comment)):
                errors.append('must be between 3 and 256 characters')
        else:
            errors.append('comment missing')
        return errors


    def __post_errors(self):
        """ Regex validation of the post

        Return:
            An array of string corrsponding to an error message
        """

        errors = []
        if not bool(self.get_post()):
            errors.append('invalid post id')
        return errors
