from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
import os

from djavu.controllers.auth import login_required
from djavu.repository import *
from djavu.database.db import get_db

bp = Blueprint('timeline', __name__, url_prefix='/')

Images = imageRepository()
Users = userRepository()
Posts = postRepository()

@bp.route('/timeline/<username>')
@login_required
def index(username):
    db = get_db()
    posts = Posts.timeline(username)
    return render_template('timeline/timeline.html', posts=posts)

@bp.route('/post/<filename>', methods=['GET','POST'])
@login_required
def post(filename):
    
    image = Images.search_id(filename, g.user['id'])

    if request.method == 'POST' and image is not None:
        description = request.form['description']
        Posts.insert(description, filename, g.user['id'])

        return redirect(url_for('dashboard.dashboard'))

    return render_template('timeline/post.html', image=image)

@bp.route('/users')
def show_users():
    users = Users.get()
    return render_template("timeline/users.html", users=users)
