import functools
import click

from werkzeug.security import check_password_hash, generate_password_hash

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, make_response
)

from api.db import get_db
from api.repository import userRepository
#from api.utils.errors import check_register, check_login

bp = Blueprint('auth', __name__, url_prefix='/')

Users = userRepository()

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = Users.search_id(user_id)

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        user_login = request.get_json()

        user = Users.search(user_login['username'])

        error = None

        if user_login['username'] == "":
            error = 'user is required.'
        elif user_login['password'] == "":
            error = 'password is required.'
        elif user is None: 
            error = 'no user.'

        if error is None:
            if check_password_hash(user['password'],user_login['password']):
                session.clear()
                session['user_id'] = user['id']
                return jsonify({"token": session['user_id']})
            error = 'wrong password'
      

        error_message = jsonify({"error": error})
        return make_response(error_message, 412) 

    #return render_template('auth/login.html')

@bp.route('/logout')
def logout():
    session.clear()
    message = jsonify({"status": "logged out", "session": session.get('user_id')})
    return make_response(message, 200)
    #return jsonify({"token": session}),200
    #return redirect(url_for('auth.login'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            error = jsonify({"error": "no user"})
            return make_response(error, 401)

        return view(**kwargs)
    return wrapped_view

@bp.route('/register', methods=('POST','GET'))
def register_user():
    if request.method == 'POST':

        user = request.get_json()
        error = None

        if user['username'] == "":
            error = 'user is required.'
        elif user['fullname'] == "":
            error = 'Fullname is required.'
        elif user['email'] == "":
            error = 'Email is required.'
        elif user['password'] == "":
            error = 'Password is required.'
       
        password = generate_password_hash(user['password'])
        if error is None:
            try:
                Users.insert(user['username'],user['fullname'],user['email'],password)
                return jsonify(user),201
            except:
                error = f"User already registered."

        error_description = jsonify({"error": error})
        return make_response(error_description, 412)


    #return render_template('register.html')

@bp.route('/users', methods=['GET'])
def users():
    users = Users.get()
    return jsonify(users)

