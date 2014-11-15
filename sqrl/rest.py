from __future__ import print_function

from flask import request

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

    @app.route('/rest/<username>/acorns/<acorn_name>', methods=['POST', 'GET'])
    def rest_get_acorn(username, acorn_name):
        if request.method == 'GET':
            try:
                user = u.User(username)
            except u.UserNotFoundError:
                return json.dumps({"status": "error", "message": "user not found"})

            filenames = user.get_acorn_files(acorn_name)

            def m(fn):
                return {"fileName": fn, "fileType": fn.split('.')[-1]}

            return json.dumps(map(m, filenames))
        elif request.method == 'POST':
            # NEED TO DEAL WITH SESSIONS!!! Otherwise, this would allow anyone to write
            # acorns to anyone's account!
            return json.dumps({"status": "error", "message": "not implemented"})

    @app.route('/rest/<username>/acorns/<acornname>/<filename>')
    def rest_get_file(username, acornname, filename):
        user = u.User(username)
        p = path.join(user.get_acorn_path(acornname), filename)
        l = None
        with open(p, 'r') as f:
            l = "".join([line for line in f])
        return json.dumps({"file": l})

    @app.route('/rest/login', methods=['POST'])
    def rest_login():
        req = request.get_json()
        try:
            user = u.User(req['userName'])
            return json.dumps({"status": "ok", "message": "logged in successfully"})
        except UserNotFoundError:
            user = u.User.create(req['userName'], "", "")
            return json.dumps({"status": "ok", "message": "created account"})

    @app.route('/rest/<username>/acorns/<acornname>/put')
    def rest_acorn_put(username, acornname):
        req = request.get_json()
        try:
            user = u.User(req['userName'])
        except u.UserNotFoundError:
            return json.dumps({"status": "error", "message": "no such user"})

        try:
            acorn_path = user.get_acorn_path(acornname)
        except u.AcornNotFoundError:
            return json.dumps({"status": "error", "message": "no such user"})

        if 'fileName' not in req:
            return json.dumps({"status": "error", "message": "no filename specified"})
        if 'file' not in req:
            return json.dumps({"status": "error", "message": "no file given"})

        p = path.join(acorn_path, req['filename'])
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
