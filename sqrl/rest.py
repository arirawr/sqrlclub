from __future__ import print_function

from flask import request, session

import os
from os import path

import json

import sqrl_config

import sqrl as u

def make_routes(app):
    @app.route('/rest/<username>/acorns')
    def rest_get_acorns(username):
        user = u.User(username)
        return json.dumps(user.acorns)

    @app.route('/rest/<username>/acorns/add', methods=['POST'])
    def rest_add_acorn(username):
        req = request.get_json()
        if 'acornName' not in req:
            return json.dumps(
                    {"status": "error",
                    "message": "`acornName` not specified."})

        acorn_name = req['acornName']
        user = u.User(username)
        user.add_acorn(acorn_name)
        return json.dumps({
            "status": "ok", "message": "created."})

    @app.route('/rest/<username>/acorns/<acorn_name>')
    def rest_get_acorn_files(username, acorn_name):
        """ Get the list of files in an acorn of a given user. """
        try:
            user = u.User(username)
        except u.UserNotFoundError:
            return json.dumps({"status": "error", "message": "user not found"})

        filenames = user.get_acorn_files(acorn_name)

        def m(fn):
            return {"fileName": fn, "fileType": fn.split('.')[-1]}

        return json.dumps(map(m, filenames))

    @app.route('/rest/<username>/acorns/<acornname>/<filename>', methods=['GET', 'POST'])
    def rest_acorn(username, acornname, filename):
        """ Get or set the contents of an acorn. To write to this acorn, send a JSON
            object {"file": contents}. """
        if request.method == 'GET':
            return acorn_get(username, acornname, filename)
        elif request.method == 'POST':
            return acorn_put(username, acornname, filename)

    @app.route('/rest/<username>/acorns/<acornname>/<filename>/delete', methods=['POST'])
    def acorn_file_delete(username, acornname, filename):
        user = User(username)
        p = path.join(user.get_acorn_path(acornname), filename)

        if path.exists(p) and state:
           pass

        pass

    def acorn_get(username, acornname, filename):
        user = u.User(username)

        """
        if(not user.is_logged_in()):
            return json.dumps({"status": "error", "message": "user '%s' not "
                "authenticated." % username})
        """

        p = path.join(user.get_acorn_path(acornname), filename)
        l = None
        try:
            with open(p, 'r') as f:
                l = "".join([line for line in f])
            return json.dumps({"file": l})
        except IOError:
            with open(p, 'w') as f:
                f.write('')
            return json.dumps({"file": '', "message": "new file created"})

    def acorn_put(username, acornname, filename):
        """ Write the acorn in the request to the given username and acornname. """
        req = request.get_json()
        try:
            user = u.User(username)
        except u.UserNotFoundError:
            return json.dumps({"status": "error", "message": "no such user"})

        try:
            acorn_path = user.get_acorn_path(acornname)
        except u.AcornNotFoundError:
            return json.dumps({"status": "error", "message": "no such user"})

        if 'file' not in req:
            return json.dumps({"status": "error", "message": "no file given"})

        p = path.join(acorn_path, filename)
        p_existed_before = path.exists(p)

        try:
            with open(p, 'w') as f:
                f.write(req['file'])
        except IOError:
            return json.dumps({"status": "error", "message": "IO error"})

        return json.dumps(
                {"status": "ok",
                "message": "acorn file written" + (
                    (", overwriting " + p) if p_existed_before else " to new file")})

    @app.route('/rest/login', methods=['POST'])
    def rest_login():
        req = request.get_json()
        try:
            user = u.User(req['userName'])
            return json.dumps({"status": "ok", "message": "logged in successfully"})
        except u.UserNotFoundError:
            user = u.User.create(req['userName'], "", "")
            return json.dumps({"status": "ok", "message": "created account"})

