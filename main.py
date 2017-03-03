from flask import Flask



app = Flask(__name__, template_folder='app/templates')
app.config.from_pyfile('config.cfg')



@app.route('/')
def hello():
    return 'Hello daf!'
