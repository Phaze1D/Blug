from google.appengine.ext import ndb

class Post(ndb.Model):
    user_id = ndb.StringProperty(required=True)
    title = ndb.StringProperty(required=True)
    text = ndb.TextProperty(required=True)
    likes = ndb.IntegerProperty(default=0)
    dislikes = ndb.IntegerProperty(default=0)
    tags = ndb.StringProperty(repeated=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_user(cls, user_id):
        pass
