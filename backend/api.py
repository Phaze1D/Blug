from backend.controllers.users import UsersController
from backend.controllers.posts import PostsController
from backend.controllers.sessions import SessionsController
from backend.controllers.comments import CommentsController



def init_api_routes(app):
    usersCon = UsersController()
    app.add_url_rule('/user/create', 'users_create', view_func=usersCon.create, methods=['POST'])
    app.add_url_rule('/user/<username>', 'users_get', view_func=usersCon.get, methods=['GET'])

    postCon = PostsController()
    app.add_url_rule('/post/create', 'posts_create', view_func=postCon.create, methods=['POST'])
    app.add_url_rule('/post/<post_id>', 'posts_update', view_func=postCon.update, methods=['POST'])
    app.add_url_rule('/post/<post_id>', 'posts_get', view_func=postCon.get, methods=['GET'])
    app.add_url_rule('/user/<user_id>/posts', 'user_posts_index', view_func=postCon.index, methods=['GET'])
    app.add_url_rule('/posts', 'posts_index', view_func=postCon.index, methods=['GET'])

    sessionCon = SessionsController()
    app.add_url_rule('/login', 'sessions_create', view_func=sessionCon.create, methods=['POST'])
    app.add_url_rule('/logout', 'sessions_delete', view_func=sessionCon.delete, methods=['DELETE'])

    commentCon = CommentsController()
    app.add_url_rule('/post/<post_id>/comments', 'post_comments_index', view_func=commentCon.index, methods=['GET'])
    app.add_url_rule('/post/<post_id>/comment/create', 'post_comment_create', view_func=commentCon.create, methods=['POST'])
