from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.helpers.sessions import login, is_login, logout
from backend.models.user import User
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException

import logging

class SessionsController():

    def get(self):
        if is_login():
            return jsonify(logged_in=True)

        raise LoginException('not logged in')

    def new(self):
        pass

    def create(self):
        if is_login():
            raise LoginException('already logged in', status_code=301)

        user = User.get_by_username(request.form.get('username'))
        if bool(user) and User.verify_password(user, request.form.get('password')):
            return login(user.key, user)
        else:
            raise FormException(message='invalid user data', payload=user.errors())


    def delete(self):
        return logout()
