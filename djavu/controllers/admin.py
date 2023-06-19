import functools
import click
from werkzeug.security import generate_password_hash

from flask import (
    Blueprint, g, redirect, render_template, url_for
)

from djavu.repository import userRepository
from djavu.repository import imageRepository

bp = Blueprint('admin', __name__, url_prefix='/')

repoUser = userRepository()
repoImage =  imageRepository()

def admin_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        if g.user['role'] != 'admin': 
            return redirect(url_for('dashboard.dashboard'))
        return view(**kwargs)
    return wrapped_view

@bp.route('/admin/users')
@admin_required
def show_users():
    users = repoUser.list_users()
    return render_template("admin/users.html", users=users)

@bp.route('/images')
@admin_required
def list_images():
    images = repoImage.list_images()
    return render_template('admin/images.html', images=images)

@bp.cli.command('init-admin')
@click.argument('password')
def init_admin_command(password):
    init_admin(generate_password_hash(password))
    click.echo('Initialized admin.')

def init_admin(password):
    repoUser.generate_admin(password)
