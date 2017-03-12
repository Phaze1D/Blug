from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from google.appengine.ext import ndb
from backend.models.post import Post
from google.appengine.api import search
from backend.helpers.sessions import current_user_id


import logging

class SearchController():

    def get(self):
        out = Post.search(search_string=request.args.get('search'))
        return jsonify(**out)
