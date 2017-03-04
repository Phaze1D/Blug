from flask import Flask
from backend.api import init_api_routes



app = Flask(__name__, template_folder='app/templates')
app.config.from_pyfile('config.cfg')
app.secret_key = app.config['SECRET_KEY']


@app.route('/')
def hello():
    return 'Hello daf!sdf'

init_api_routes(app)
