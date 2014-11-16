from flask import session

import json
import os
import subprocess as sp
from os import path

import sqrl_config

""" The idea is that each user owns a directory on the server, where they can
    upload / code HTML, CSS, and JavaScript. Well not really. That's their user
    directory. In there, they can create so-called acorns. Each acorn is like a
    mini-site that the users own.
    """

class UserAlreadyExistsError(Exception):
    pass

class UserNotFoundError(Exception):
    pass

class AcornAlreadyExistsError(Exception):
    pass

class AcordNotFoundError(Exception):
    pass

class User:
    """ A User is an entity owning one or more ACORNs, and therefore owning a directory
        in the main ACORNs directory,
        """
    @staticmethod
    def create(name, email, password):
        p = path.join(sqrl_config.ACORN_PATH, name)
        if path.exists(p):
            raise UserAlreadyExistsError()
        os.makedirs(p)

        return User(name)

    def __init__(self, name):
        """ Load the user with the given `name` from disk. """
        self.name = name
        user_dir = self.get_userdir_path()
        self.acorns = os.listdir(user_dir)

    def get_userdir_path(self):
        p = path.join(sqrl_config.ACORN_PATH, self.name)
        if not path.exists(p):
            raise UserNotFoundError()
        return p

    def get_acorn_files(self, acorn_name):
        p = self.get_acorn_path(acorn_name)
        if not path.exists(p):
            raise AcornNotFoundError()
        return os.listdir(p)

    def get_acorn_path(self, acorn_name):
        if acorn_name not in self.acorns:
            raise AcornNotFoundError()
        return path.join(self.get_userdir_path(), acorn_name)

    def add_acorn(self, acorn_name):
        if acorn_name in self.acorns:
            raise AcornAlreadyExistsError()

        self.acorns.append(acorn_name)
        os.makedirs(self.get_acorn_path(acorn_name))

    def is_logged_in(self):
        """ Determine whether the current user session is logged in as this user. """
        if 'user' not in session:
            return False # the user isn't logged in at all.
        else:
            return self == session['user']

    def __eq__(self, other):
        """ Usernames are unique, so User instances are the same if their usernames match.
            """
        return self.name == other.name
