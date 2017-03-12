from backend.controllers.users import UsersController
from backend.controllers.posts import PostsController
from backend.controllers.sessions import SessionsController
from backend.controllers.comments import CommentsController
from backend.controllers.likes import LikesController
from backend.controllers.dislikes import DislikesController



def init_api_routes(app):
    usersCon = UsersController()
    app.add_url_rule('/api/user/create', 'users_create', view_func=usersCon.create, methods=['POST'])
    app.add_url_rule('/api/user/<username>', 'users_get', view_func=usersCon.get, methods=['GET'])

    postCon = PostsController()
    app.add_url_rule('/api/post/create', 'posts_create', view_func=postCon.create, methods=['POST'])
    app.add_url_rule('/api/post/<post_id>', 'posts_update', view_func=postCon.update, methods=['PUT'])
    app.add_url_rule('/api/post/<post_id>', 'posts_get', view_func=postCon.get, methods=['GET'])
    app.add_url_rule('/api/post/<post_id>', 'posts_delete', view_func=postCon.delete, methods=['DELETE'])
    app.add_url_rule('/api/user/<user_id>/posts', 'user_posts_index', view_func=postCon.index, methods=['GET'])
    app.add_url_rule('/api/posts', 'posts_index', view_func=postCon.index, methods=['GET'])

    sessionCon = SessionsController()
    app.add_url_rule('/api/login', 'sessions_create', view_func=sessionCon.create, methods=['POST'])
    app.add_url_rule('/api/logout', 'sessions_delete', view_func=sessionCon.delete, methods=['DELETE'])
    app.add_url_rule('/api/session/verify', 'sessions_verify', view_func=sessionCon.get, methods=['GET'])

    commentCon = CommentsController()
    app.add_url_rule('/api/post/<post_id>/comment/create', 'post_comment_create', view_func=commentCon.create, methods=['POST'])
    app.add_url_rule('/api/comment/<comment_id>', 'comment_update', view_func=commentCon.update, methods=['PUT'])
    app.add_url_rule('/api/post/<post_id>/comments', 'post_comments_index', view_func=commentCon.index, methods=['GET'])

    likeCon = LikesController()
    app.add_url_rule('/api/post/<post_id>/like', 'post_liked', view_func=likeCon.create, methods=['POST'])
    app.add_url_rule('/api/post/<post_id>/like', 'like_delete', view_func=likeCon.delete, methods=['DELETE'])

    dislikeCon = DislikesController()
    app.add_url_rule('/api/post/<post_id>/dislike', 'post_disliked', view_func=dislikeCon.create, methods=['POST'])
    app.add_url_rule('/api/post/<post_id>/dislike', 'dislike_delete', view_func=dislikeCon.delete, methods=['DELETE'])
