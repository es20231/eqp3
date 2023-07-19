import functools

from werkzeug.security import check_password_hash, generate_password_hash

from flask import (
    Blueprint, g, request, session, jsonify, make_response
)

from api.repository import userRepository
from api.utils.errors import check_register, check_login

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

        error = check_login(user_login['username'], user_login['password'], user)

        if error is None:
            if check_password_hash(user['password'],user_login['password']):
                session.clear()
                session['user_id'] = user['id']
                message = jsonify({"token": session['user_id']})
                return make_response(message, 200)
            error = "Wrong Password."

        error_message = jsonify({"error": error})
        return make_response(error_message, 412) 


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            error = jsonify({"error": "no user"})
            return make_response(error, 401)

        return view(**kwargs)
    return wrapped_view


@bp.route('/logout')
@login_required
def logout():
    session.clear()
    message = jsonify({"message": "logged out", "token": session.get('user_id')})
    return make_response(message, 200)


@bp.route('/register', methods=('POST','GET'))
def register_user():
    if request.method == 'POST':

        user = request.get_json()

        error = check_register(user['username'], user['fullname'], user['email'], user['password'])

        password = generate_password_hash(user['password'])
        if error is None:
            try: 
                Users.insert(user['username'], user['fullname'], user['email'], password)
                message = jsonify({"user": user})
                return make_response(message, 201)
            except:
                error = "User Already Registered"

        error_message = jsonify({"error": error})
        return make_response(error_message, 412)


@bp.route('/users', methods=['GET'])
def users():
    users = Users.get()
    message = jsonify(users)
    return make_response(message, 200)

