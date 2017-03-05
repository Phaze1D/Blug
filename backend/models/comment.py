from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor
from backend.helpers.sessions import current_user_id
from backend.models.post import Post
from backend.models.user import User
import re

import logging

class Comment(ndb.Model):
    post = ndb.KeyProperty(kind='Post', required=True)
    user = ndb.KeyProperty(kind='User', required=True)
    comment = ndb.TextProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

### Instance Methods

    def is_valid(self):
        if bool(self.__comment_errors()) or bool(self.__post_errors()):
            return False
        return True

    def errors(self):
        return {
            'comment': self.__comment_errors(),
            'post': self.__post_errors()
        }

    def get_user(self):
        return self.user.get()

    def get_post(self):
        return self.post.get()


### Class Methods

    @classmethod
    def index_page_json(cls, post_id, cursor=None, per_page=15):
        cursor = Cursor(urlsafe=cursor)
        comments, next_cursor, more = cls \
        .query(cls.post == ndb.Key('Post', long(post_id))) \
        .fetch_page(per_page, start_cursor=cursor)

        nc = next_cursor.urlsafe() if bool(next_cursor) else ''
        results = {'cursor': nc, 'more': more, 'comments': []}

        for comment in comments:
            cd = comment.to_dict()
            cd['id'] = comment.key.id()
            cd['user'] = cd['user'].id()
            cd['post'] = cd['post'].id()
            results['comments'].append(cd)

        return results


### Private methods

    def _pre_put_hook(self):
        if not bool(self.key.id()):
            self.user=ndb.Key(User, long( current_user_id() ) )

    def __comment_errors(self):
        errors = []
        if bool(self.comment):
            if not bool(re.match("^[\s\S]{3,256}$", self.comment)):
                errors.append('must be between 3 and 256 characters')
        else:
            errors.append('comment missing')
        return errors

    def __post_errors(self):
        errors = []
        if not bool(self.get_post()):
            errors.append('invalid post id')
        return errors
