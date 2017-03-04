from flask import session, current_app, request, make_response, jsonify
import hashlib
import logging

def login(userKey):
    # session['user_id'] = str(user_id)
    resp = make_response( jsonify( **userKey.get().to_dict() ) )
    resp.set_cookie('user_id', value=hash_cookie( userKey.id() ), httponly=True)
    return resp

def is_login():
    return verify_user()
    # return 'user_id' in session

def current_user_id():
    if verify_user():
        return long(request.cookies.get('user_id').split('|')[0])

def is_user(user_id):
    if verify_user():
        return request.cookies.get('user_id').split('|')[0] == str(user_id)
    # if 'user_id' in session:
    #     return session['user_id'] == str(user_id)

def logout(response):
    response.set_cookie('user_id', '')
    # session.pop('user_id', None)

def verify_user():
    if bool(request.cookies.get('user_id')):
        user_id = request.cookies.get('user_id').split('|')[0]
        return hash_cookie(user_id) == request.cookies.get('user_id')
    return False

def hash_cookie(user_id):
    hashid = hashlib.sha256(current_app.secret_key + str(user_id)).hexdigest()
    return '%s|%s' % (user_id, hashid)
