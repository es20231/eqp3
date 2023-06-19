from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
import os

from djavu.controllers.auth import login_required
from djavu.repository import imageRepository
from djavu.repository import userRepository
from djavu.database.db import get_db

bp = Blueprint('timeline', __name__, url_prefix='/')

repo = imageRepository()
repoUsers = userRepository()

@bp.route('/timeline/<username>')
@login_required
def index(username):
    db = get_db()
    posts = db.execute(
        'SELECT p.id, description, filename, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id WHERE u.username = ? '
        ' ORDER BY created DESC', (username,)
    ).fetchall()
    return render_template('timeline/timeline.html', posts=posts)

@bp.route('/post/<filename>', methods=['GET','POST'])
@login_required
def post(filename):
    image = repo.search_image(filename)
    validate = repo.search_image_id(g.user['id'],image['id'])  
    if validate is None:
        return redirect(url_for('dashboard.dashboard'))

    if request.method == 'POST':
        description = request.form['description']
        error = None

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO post (description, filename, author_id)'
                ' VALUES (?, ?, ?)',
                (description, filename, g.user['id'])
            )
            db.commit()
            return redirect(url_for('dashboard.dashboard'))

    return render_template('timeline/post.html', image=image)

@bp.route('/users')
def show_users():
    users = repoUsers.list_users()
    return render_template("timeline/users.html", users=users)
