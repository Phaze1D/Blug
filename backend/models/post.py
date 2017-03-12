from google.appengine.ext import ndb
from google.appengine.api import search
from google.appengine.datastore.datastore_query import Cursor
from backend.helpers.sessions import current_user_id
from backend.models.user import User
import re

class Post(ndb.Model):
    user = ndb.KeyProperty(kind='User', required=True)
    username = ndb.StringProperty(required=True)
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
    def search(cls, search_string, cursor=None, per_page=15):
        cursor = search.Cursor(web_safe_string=cursor)
        options = search.QueryOptions(cursor=cursor, limit=per_page)
        query = search.Query(query_string=search_string, options=options)
        results = search.Index('api-post').search(query)
        keys = []
        if results:
            for item in results:
                k = ndb.Key(Post, long(item.doc_id))
                keys.append(k)

        posts = ndb.get_multi(keys)

        cs = ''
        more = False
        if bool(results.cursor):
            cs = results.cursor.web_safe_string
            more = True

        out =  {'cursor': cs, 'more': more, 'posts': []}
        out['posts'] = cls.posts_to_array(posts)

        return out

    @classmethod
    def users_with_pages(cls, user_id=None, cursor=None, per_page=15):
        cursor = Cursor(urlsafe=cursor)
        posts, next_cursor, more = cls.query(
            cls.user == ndb.Key('User', long(user_id))
        ).order(-cls.created).fetch_page(per_page, start_cursor=cursor)

        nc = next_cursor.urlsafe() if bool(next_cursor) else ''
        results = {'cursor': nc, 'more': more, 'posts': []}
        results['posts'] = cls.posts_to_array(posts)

        return results

    @classmethod
    def all_with_pages(cls, cursor=None, per_page=15):
        cursor = Cursor(urlsafe=cursor)
        posts, next_cursor, more = cls.query(

        ).order(-cls.created).fetch_page(per_page, start_cursor=cursor)

        nc = next_cursor.urlsafe() if bool(next_cursor) else ''
        results = {'cursor': nc, 'more': more, 'posts': []}
        results['posts'] = cls.posts_to_array(posts)

        return results

    @classmethod
    def posts_to_array(cls, posts):
        results = []
        for post in posts:
            pd = post.to_dict()
            pd['id'] = post.key.id()
            user_key = pd['user']
            pd['isOwner'] = current_user_id() == user_key.id()
            pd.pop('user', None)
            results.append(pd)
        return results


    @classmethod
    def _post_delete_hook(cls, key, future):
	    search.Index('api-post').delete(str(key.id()))


### Private Methods

    def _post_put_hook(self, future):
        doc = search.Document(doc_id=str(self.key.id()), fields=[
            search.TextField(name='title', value=self.title),
            search.TextField(name='content', value=self.content),
            search.DateField(name='created', value=self.created),
            search.TextField(name='username', value=pieces(self.username))]
        )
        search.Index('api-post').put(doc)


    def _pre_put_hook(self):
        if not bool(self.key.id()):
            self.user=ndb.Key(User, long( current_user_id() ) )
            self.username=self.user.get().username

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


def pieces(string):
    pieces = []

    for word in string.split():
        cursor = 1
    while True:
        pieces.append(word[:cursor])
        if cursor == len(word): break
        cursor += 1

    return ','.join(pieces)
