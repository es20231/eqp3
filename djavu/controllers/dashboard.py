import os

from werkzeug.exceptions import (abort, RequestEntityTooLarge)
from werkzeug.utils import secure_filename

from flask import (
    Blueprint, flash, redirect, render_template, request, session, send_from_directory
)

from djavu.controllers.auth import login_required
from djavu.repository import imageRepository

MAIN_PATH = os.path.abspath(os.getcwd())
UPLOAD_FOLDER = os.path.join(MAIN_PATH,'djavu/static/images')
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']

bp = Blueprint('dashboard', __name__, url_prefix='/')

repo = imageRepository()

@bp.route('/dashboard')
@login_required
def dashboard():
    user_id = session.get('user_id')
    user_images = repo.dashboard(user_id)

    files = os.listdir(UPLOAD_FOLDER)
    images = []

    for user_image in user_images:
        for file in files:
            if file == user_image['filename']:
                images.append(file)
 
    return render_template('user/index.html', images=images)

@bp.route('/upload', methods=['POST'])
def upload():
    user_id = session.get('user_id')
    try:
        file = request.files['file']
        extension = os.path.splitext(file.filename)[1].lower()
      
        if file:
            if extension not in ALLOWED_EXTENSIONS:
                return 'File not allowed'
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER,filename))
            repo.insert_image(filename,os.path.join(UPLOAD_FOLDER,filename), user_id)
    except RequestEntityTooLarge:
        return 'File is larger than the 16MB limit.'

    return redirect('/dashboard')

@bp.route('/serve-image/<filename>', methods=['GET'])
def serve_image(filename):
   return send_from_directory(UPLOAD_FOLDER, filename)

