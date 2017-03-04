from google.appengine.ext import ndb
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
    tags = ndb.StringProperty(repeated=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

### Instance Methods

    def is_valid(self):
        if bool( self.__title_errors() ) or bool( self.__content_errors() ) or bool( self.__tags_errors() ):
            return False
        return True

    def errors(self):
        return {
            'title': self.__title_errors(),
            'content': self.__content_errors(),
            'tags': self.__tags_errors()
        }

    def get_user(self):
        return self.user.get()



### Class Methods




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

    def __tags_errors(self):
        errors = []
        if bool(self.tags) and len(self.tags) == 0:
            errors.append('must have atleast 1 tag')
        return errors
