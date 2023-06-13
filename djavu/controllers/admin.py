import functools
import click

from werkzeug.security import check_password_hash, generate_password_hash

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from djavu.db import get_db
from djavu.repository import userRepository

bp = Blueprint('admin', __name__, url_prefix='/')

repo = userRepository()

def admin_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        else:
            if g.user['role'] != 'admin': 
                return redirect(url_for('dashboard.dashboard'))

        return view(**kwargs)

    return wrapped_view

@bp.cli.command('init-admin')
@click.argument('password')
def init_admin_command(password):
    init_admin(password)
    click.echo('Initialized admin.')

def init_admin(password):
    repo.generate_admin(password)

@bp.route('/users')
@admin_required
def show_users():
    users = repo.list_users()
    return render_template("users.html", users=users)
