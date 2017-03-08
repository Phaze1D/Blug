from flask import Flask, render_template, jsonify
from backend.api import init_api_routes
from backend.errors.form_exception import FormException
from backend.errors.login_exception import LoginException
from backend.errors.owner_exception import OwnerException

import logging

app = Flask(__name__, template_folder='backend/templates', static_folder='backend/static')
# app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config['SECRET_KEY']


@app.route('/')
def hello():
    return render_template('index.html')


@app.errorhandler(LoginException)
def handle_login_exception(error):
    response = jsonify(**error.to_dict())
    response.status_code = error.status_code
    return response

@app.errorhandler(FormException)
def handle_form_exception(error):
    response = jsonify(**error.to_dict())
    response.status_code = error.status_code
    return response

@app.errorhandler(OwnerException)
def handle_owner_exception(error):
    response = jsonify(**error.to_dict())
    response.status_code = error.status_code
    return response

init_api_routes(app)
