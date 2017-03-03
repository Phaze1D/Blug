
from google.appengine.ext import ndb
from google.appengine.api.datastore_errors import BadValueError
from flask.ext.bcrypt import Bcrypt
from flask import current_app
import re



class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    hashPassword = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

### Instance Methods

    def valid(self):
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
    def verify_password(cls, hash_password, candidate):
        bcrypt = Bcrypt(current_app)
        return bcrypt.check_password_hash(hash_password, candidate)

    @classmethod
    def hash_password(cls, password):
        bcrypt = Bcrypt(current_app)
        return bcrypt.generate_password_hash(password)

    @classmethod
    def get_posts(cls, user_id):
        pass

    @classmethod
    def get_by_username(cls, username):
        pass


### Private Methods

    def _pre_put_hook(self):
        if not bool(self.key):
            self.hashPassword = User.hash_password(self.hashPassword)

    def __username_errors(self):
        errors = []
        if not bool(re.match("^[a-zA-Z0-9_-]{3,20}$", self.username)):
            errors.append('invalid username')
        if bool(cls.get_by_username(self.username)).get()):
            errors.append('username already exists')
        return errors

    def __password_errors(self):
        errors = []
        if not bool(re.match("^(?=.{6,})", self.password)):
            errors.append('password must have atleast 6 characters')
        if not bool(re.match("^(?=.*[a-z])", self.password)):
            errors.append('password must have atleast 1 lowercase character')
        if not bool(re.match("^(?=.*[A-Z])", self.password)):
            errors.append('password must have atleast 1 uppercase character')
        if not bool(re.match("^(?=.*[0-9])", self.password)):
            errors.append('password must have atleast 1 numeric character')
        return errors

    def __email_errors(self):
        errors = []
        if not bool(re.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", self.email)):
            errors.append('invalid email')
        return errors
