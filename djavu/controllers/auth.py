import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from djavu.db import get_db
from djavu.repository import userRepository

bp = Blueprint('auth', __name__, url_prefix='/')

repo = userRepository()

@bp.route('/', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        user = repo.search_user(username)

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('blog.index'))

        flash(error)

    return render_template('login.html')

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view

@bp.route('/register', methods=('POST','GET'))
def register_user():
    if request.method == 'POST':
        username = request.form['username']
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        error = None

        if not username:
            error = 'Username is required.'
        elif not fullname:
            error = 'Fullname is required.'
        elif not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            repo.insert_user(username,fullname,email,password)
            return redirect(url_for("register.users"))
        else:
            flash(error)

    return render_template('register.html')

@bp.route('/users')
def show_users():
    users =repo.list_users()
    return render_template('users.html', users=users)
