from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor
from backend.helpers.sessions import current_user_id
from backend.models.user import User
import re

import logging

class Post(ndb.Model):
    user = ndb.KeyProperty(kind='User', required=True)
    title = ndb.StringProperty(required=True)
    content = ndb.TextProperty(required=True)
    likes = ndb.IntegerProperty(default=0)
    dislikes = ndb.IntegerProperty(default=0)
    created = ndb.DateTimeProperty(auto_now_add=True)

### Instance Methods

    def is_valid(self):
        if bool( self.__title_errors() ) or bool( self.__content_errors() ):
            return False
        return True

    def errors(self):
        return {
            'title': self.__title_errors(),
            'content': self.__content_errors(),
        }

    def get_user(self):
        return self.user.get()


### Class Methods

    @classmethod
    def index_page_json(cls, user_id=None, cursor=None, per_page=15):
        cursor = Cursor(urlsafe=cursor)
        if user_id:
            posts, next_cursor, more = cls \
            .query(cls.user == ndb.Key('User', long(user_id))) \
            .fetch_page(per_page, start_cursor=cursor)
        else:
            posts, next_cursor, more = cls \
            .query() \
            .fetch_page(per_page, start_cursor=cursor)

        nc = next_cursor.urlsafe() if bool(next_cursor) else ''

        results = {'cursor': nc, 'more': more, 'posts': []}
        for post in posts:
            pd = post.to_dict()
            pd['id'] = post.key.id()
            pd['user'] = pd['user'].id()
            results['posts'].append(pd)

        return results


### Private Methods

    def _pre_put_hook(self):
        if not bool(self.key.id()):
            self.user=ndb.Key(User, long( current_user_id() ) )

    def __title_errors(self):
        errors = []
        if bool(self.title):
            if not bool(re.match("^.{3,64}$", self.title)):
                errors.append('must be between 3 and 64 characters')
        else:
            errors.append('title missing')
        return errors

    def __content_errors(self):
        errors = []
        if bool(self.content):
            if not bool(re.match("^[\s\S]{3,1024}$", self.content)):
                errors.append('must be between 3 and 1024 characters')
        else:
            errors.append('content missing')
        return errors
