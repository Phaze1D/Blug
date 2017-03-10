from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.models.user import User
from backend.helpers.sessions import login, is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException

import time
import logging

class UsersController():

    def get(self, username):
        return jsonify(**User.get_by_username( username ).to_safe_dict())

    def create(self):
        # time.sleep(5)
        if is_login():
            raise LoginException('already logged in', status_code=301)

        user = User(
            username=request.form.get('username'),
            password=request.form.get('password'),
            email=request.form.get('email')
        )

        if user.is_valid():
            key = user.put()
            return login(key)
        else:
            raise FormException(message='invalid user data', payload=user.errors())
