import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from djavu.db import get_db
from djavu.repository import userRepository

bp = Blueprint('register', __name__, url_prefix='/')

repo = userRepository()

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
def users():
    users = repo.list_users()
    return render_template('users.html', users=users)
