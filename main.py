from flask import Flask, render_template
from backend.api import init_api_routes



app = Flask(__name__, template_folder='backend/templates', static_folder='backend/static')
# app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.secret_key = app.config['SECRET_KEY']


@app.route('/')
def hello():
    return render_template('index.html')

init_api_routes(app)
