import functools
import click

from werkzeug.security import check_password_hash, generate_password_hash

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from djavu.database.db import get_db
from djavu.repository import userRepository
from djavu.utils.errors import check_register, check_login

bp = Blueprint('auth', __name__, url_prefix='/')

Users = userRepository()

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = Users.search_id(user_id)

@bp.route('/', methods=('GET', 'POST'))
def login():
    if g.user:
        return redirect(url_for('dashboard.dashboard'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = Users.search(username)

        error = check_login(user,password)

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('dashboard.dashboard'))

        flash(error)

    return render_template('auth/login.html')

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

        error = check_register(username,fullname,email,password)

        if error is None:
            db = get_db()
            try:
                Users.insert(username,fullname,email,generate_password_hash(password))
            except db.IntegrityError:
                error = f"User {username} is already registered."
            else:
                return redirect(url_for("auth.login"))
        flash(error)

    return render_template('auth/register.html')


