from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.models.user import User
from backend.helpers.sessions import login, is_login, current_user_id


import logging

class UsersController():

    def index(self):
        pass

    def get(self, username):
        return jsonify(**User.get_by_username( username ).to_safe_dict())

    def new(self):
        pass

    def create(self):
        if is_login():
            user = User.get_by_id(current_user_id())
            return redirect( url_for('users_get', username=user.username ) )

        user = User(
            username=request.form.get('username'),
            password=request.form.get('password'),
            email=request.form.get('email')
        )

        if user.is_valid():
            key = user.put()
            return login(key)
        else:
            return jsonify(**user.errors())


    def edit(self, user_id):
        pass

    def update(self, user_id):
        pass

    def delete(self, user_id):
        pass
