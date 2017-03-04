
from google.appengine.ext import ndb
import re

import logging


class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

### Instance Methods

    def is_valid(self):
        if bool(self.__username_errors()) or bool(self.__password_errors()) or bool(self.__email_errors()):
            return False
        return True

    def errors(self):
        return {
            'username': self.__username_errors(),
            'password': self.__password_errors(),
            'email': self.__email_errors()
        }


### Class Methods

    @classmethod
    def verify_password(cls, hashPassword, candidate):
        return hashPassword == cls.hash_password(candidate, hashPassword.split('|')[0])

    @classmethod
    def hash_password(cls, password, salt=None):
        if not salt:
            salt = ''.join([random.choice(string.lowercase) for i in xrange(8)])
        hashed = hashlib.sha512(password + salt).hexdigest()
        return '%s|%s' % (salt, hashed)

    @classmethod
    def get_posts(cls, user_id):
        pass

    @classmethod
    def get_by_username(cls, username):
        return cls.query(cls.username == username).get()


### Private Methods

    def _pre_put_hook(self):
        if not bool(self.key):
            self.password = User.hash_password(self.password)

    def __username_errors(self):
        errors = []
        if bool(self.username):
            if not bool(re.match("^[a-zA-Z0-9_-]{3,42}$", self.username)):
                errors.append('must be between 3 and 42 characters')
            if bool(User.get_by_username(self.username)):
                errors.append('username already exists')
        else:
            errors.append('username missing')
        return errors

    def __password_errors(self):
        errors = []
        if bool(self.password):
            if not bool(re.match("^(?=.{6,})", self.password)):
                errors.append('password must have atleast 6 characters')
            if not bool(re.match("^(?=.*[a-z])", self.password)):
                errors.append('password must have atleast 1 lowercase character')
            if not bool(re.match("^(?=.*[A-Z])", self.password)):
                errors.append('password must have atleast 1 uppercase character')
            if not bool(re.match("^(?=.*[0-9])", self.password)):
                errors.append('password must have atleast 1 numeric character')
        else:
            errors.append('password missing')
        return errors

    def __email_errors(self):
        errors = []
        if bool(self.email):
            if not bool(re.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", self.email)):
                errors.append('invalid email')
        else:
            errors.append('email missing')
        return errors
