from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.helpers.sessions import login, is_login, logout
from backend.models.user import User



class SessionsController():

    def new(self):
        pass

    def create(self):
        if is_login():
            return 'Redirect to user home'

        user = User.get_by_username(request.form['username'])
        if bool(user) and User.verify_password(user,request.form['password']):
            return login(user.key, user)
        else:
            return jsonify(error='invalid username / password combination')

    def delete(self):
        return logout()
