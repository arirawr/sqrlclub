from flask import Flask, session, request, url_for, redirect, escape, render_template, send_from_directory
import os
from os import path

import json

import sqrl_config

import sqrl as u
from sqrl import UserNotFoundError

import rest

app = Flask(__name__)

@app.route('/')
@app.route('/<page>')
def main(page='index.html'):
    with open(path.join("ui/build", page), 'r') as f:
        l = "".join([line for line in f])
    return l

@app.route('/css/<path:res>')
def css_provider(res):
    return send_from_directory(path.join("ui", "build", "css"), res)

@app.route('/js/<path:res>')
def js_provider(res):
    return send_from_directory(path.join("ui", "build", "js"), res)

@app.route('/views/<path:res>')
def view_provider(res):
    return send_from_directory(path.join("ui", "build", "views"), res)

@app.route('/img/<path:res>')
def img_provider(res):
    return send_from_directory(path.join("ui", "build", "img"), res)

@app.route('/acorn/<username>/<acornname>/')
@app.route('/acorn/<username>/<acornname>/<filename>')
def acorn(username, acornname, filename="index.html"):
    """ Function to actually serve the acorns to the users. """
    p = path.join(sqrl_config.ACORN_PATH, username, acornname, filename)
    if not path.exists(p):
        return render_template("acorn_not_found.html")
    else:
        pf = None
        with open(p, 'r') as f:
            pf = "".join([line for line in f])
        return pf

@app.route('/edit')
def edit():
    # If not logged in, then fail somehow
    pass

    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            pass # process the registration request
        else:
            pass # display the registration page

if __name__ == "__main__":
    rest.make_routes(app)
    app.run(host="0.0.0.0", debug=True)
