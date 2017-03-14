from flask import session, current_app, request, make_response, jsonify
from backend.models.user import User
import hashlib


def login(user_key, user=None):
    """ Logins in a user

    Args:
        user_key: A datastore User key
        user: A datastore User entity

    Return:
        A response with json object of the user and with a secured cookie
    """

    if not bool(user):
        user = user_key.get()

    resp = make_response( jsonify( **user.to_safe_dict() ) )
    resp.set_cookie('user_id', value=hash_cookie( user_key.id() ), httponly=True)
    return resp


def is_login():
    """ Checks if a user is logged in by verifing user cookie

    Return:
        True if logged in False if not
    """

    return verify_user_cookie()


def current_user_id():
    """ Gets the current user id

    Return:
        current user id
    """

    if verify_user_cookie():
        return long(request.cookies.get('user_id').split('|')[0])


def is_user(user_id):
    """ Checks if a user_id is the current user id

    Return:
        True if current user id is user id else False
    """

    if verify_user_cookie():
        return request.cookies.get('user_id').split('|')[0] == str(user_id)


def logout():
    """ Deletes the user cookie

    Return:
        response with a JSON object with key logout set to True
        and empty string user_id
    """

    resp = make_response( jsonify( logout=True ) )
    resp.set_cookie('user_id', '', expires=0)
    return resp


def verify_user_cookie():
    """ Verifies the current user cookie

    Return:
        if current user id exist and hash cookie is verified
    """

    if bool(request.cookies.get('user_id')):
        user_id = request.cookies.get('user_id').split('|')[0]
        key = User.get_by_id(long(user_id))
        return bool(key) and hash_cookie(user_id) == request.cookies.get('user_id')
    return False


def hash_cookie(user_id):
    """ Hashs user_id and secret_key with sha256

    Return:
        The cookie string with hash and user_id
    """

    hashid = hashlib.sha256(current_app.secret_key + str(user_id)).hexdigest()
    return '%s|%s' % (user_id, hashid)
