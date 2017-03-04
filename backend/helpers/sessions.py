from flask import session, current_app, request, make_response, jsonify
from backend.models.user import User

import hashlib
import logging

def login(userKey, user=None):
    if not bool(user):
        user = userKey.get()

    resp = make_response( jsonify( **user.to_safe_dict() ) )
    resp.set_cookie('user_id', value=hash_cookie( userKey.id() ), httponly=True)
    return resp

def is_login():
    return verify_user_cookie()

def current_user_id():
    if verify_user_cookie():
        return long(request.cookies.get('user_id').split('|')[0])

def is_user(user_id):
    if verify_user_cookie():
        return request.cookies.get('user_id').split('|')[0] == str(user_id)

def logout():
    resp = make_response( jsonify( logout=True ) )
    resp.set_cookie('user_id', '', expires=0)
    return resp

def verify_user_cookie():
    if bool(request.cookies.get('user_id')):
        user_id = request.cookies.get('user_id').split('|')[0]
        return hash_cookie(user_id) == request.cookies.get('user_id')
    return False

def hash_cookie(user_id):
    hashid = hashlib.sha256(current_app.secret_key + str(user_id)).hexdigest()
    return '%s|%s' % (user_id, hashid)
