import functools
import os

from flask import (
    Blueprint, flash, current_app, g, redirect, render_template, request, session, url_for
)

from djavu.db import get_db
from djavu.repository import imageRepository

bp = Blueprint('dashboard', __name__, url_prefix='/')

repo = imageRepository()

@bp.route('/dashboard')
def dashboard():
    user_id = session.get('user_id')
    user_images = (repo.dashboard(user_id))

    files = os.listdir(current_app.config['UPLOAD_FOLDER'])
    images = []

    for user_image in user_images:
        for file in files:
            if file == user_image['filename']:
                images.append(file)
 
    return render_template('index.html', images=images)

@bp.route('/images')
def list_images():
    images = repo.list_images()
    return render_template('images.html', images=images)
