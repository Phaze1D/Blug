from google.appengine.ext import ndb
from backend.helpers.sessions import current_user_id
from backend.models.post import Post
from backend.models.user import User
import re


class Like(ndb.Model):
    post = ndb.KeyProperty(kind='Post', required=True)
    user = ndb.KeyProperty(kind='User', required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)


    def is_valid(self):
        user = User.get_by_id(self.user.id())
        post = Post.get_by_id(self.post.id())
        if user and post and not ( post.user.id() == user.key.id() ):
            return True
        return False


    @classmethod
    def already_exist(cls, post_id, user_id):
        like = cls.query( cls.post == ndb.Key('Post', long(post_id) ), cls.user == ndb.Key('User', long(user_id) ) ).get()
        return bool(like)

    @classmethod
    def get_by_post_user(cls, post_id, user_id):
        like = cls.query( cls.post == ndb.Key('Post', long(post_id) ), cls.user == ndb.Key('User', long(user_id) ) ).get()
        return like
