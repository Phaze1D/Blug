from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.models.user import User
from backend.helpers.sessions import login, is_login, current_user_id
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException


class UsersController():
    """ Using MVC and REST pattern for handling all the User's api methods
    """

    def create(self):
        """ REST create method

        Returns:
            A JSON object with new User information

        Raises:
            LoginException: if user is already logged in
            FormException: if user form data is invalid
        """

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
