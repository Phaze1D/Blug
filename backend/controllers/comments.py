from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.post import Post
from backend.models.comment import Comment
from backend.helpers.sessions import is_login, current_user_id

import logging


class CommentsController():
    def index(self, post_id):
        json_results = Comment.index_page_json(post_id=post_id, cursor=request.args.get('cursor'))
        return jsonify(**json_results)

    def get(self):
        pass

    def new(self):
        pass

    def create(self, post_id):
        if not is_login():
            return 'redirect to login'

        comment = Comment(
            post=ndb.Key('Post', long(post_id)),
            comment=request.form.get('comment'),
        )

        if comment.is_valid():
            key = comment.put()
            comment_dict = key.get().to_dict()
            comment_dict['user'] = comment_dict['user'].id()
            comment_dict['post'] = comment_dict['post'].id()
            return jsonify(**comment_dict)
        else:
            return jsonify(**comment.errors())


    def edit(self, comment_id):
        pass

    def update(self, comment_id):
        pass

    def delete(self, comment_id):
        pass
