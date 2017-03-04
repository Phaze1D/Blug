from backend.controllers.users import UsersController
from backend.controllers.posts import PostsController



def init_api_routes(app):
    usersCon = UsersController()
    app.add_url_rule('/users/create', 'users_create', view_func=usersCon.create, methods=['POST'])
    app.add_url_rule('/users/<username>', 'users_get', view_func=usersCon.get, methods=['GET'])

    postCon = PostsController()
    app.add_url_rule('/post/create', 'posts_create', view_func=postCon.create, methods=['POST'])
    app.add_url_rule('/post/<post_id>', 'posts_get', view_func=postCon.get, methods=['GET'])
    pass
