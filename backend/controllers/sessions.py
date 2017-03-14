from flask import abort, redirect, url_for, request, make_response, jsonify, current_app
from backend.helpers.sessions import login, is_login, logout, current_user_id
from backend.models.user import User
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException



class SessionsController():
    """ Using MVC and REST pattern for handling all the Current User Session's api methods
    """

    def get(self):
        """ REST get method

        Returns:
            A JSON object of the user with out their password

        Raises:
            LoginException: if user is not logged in
        """

        if is_login():
            user = User.get_by_id(current_user_id())
            return jsonify(**user.to_safe_dict())


        raise LoginException('not logged in')


    def create(self):
        """ REST creates method

        Returns:
            A JSON object of the user with out their password

        Raises:
            LoginException: if user is not logged in
            FormException: if user and password and invalid
        """

        if is_login():
            raise LoginException('already logged in', status_code=301)

        user = User.get_by_username(request.form.get('username'))
        if bool(user) and User.verify_password(user, request.form.get('password')):
            return login(user.key, user)
        else:
            error = {
                'password': ['invalid username/password combination']
            }
            raise FormException(message='invalid login', payload=error)


    def delete(self):
        """ REST delete method

        Note:
            This just deletes the user cookie and logs them out

        Returns:
            A JSON object key logout value true
        """

        return logout()
