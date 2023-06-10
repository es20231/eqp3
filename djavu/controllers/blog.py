from flask import (
    Blueprint, flash, session, g, redirect, render_template, request, url_for,
    redirect, send_from_directory, current_app
)
from werkzeug.exceptions import (abort, RequestEntityTooLarge)
from werkzeug.utils import secure_filename
from djavu.controllers.auth import login_required
import os

from djavu.repository import imageRepository

repo = imageRepository()

bp = Blueprint('blog', __name__, url_prefix='/')

MAIN_PATH = os.path.abspath(os.getcwd())
UPLOAD_FOLDER = os.path.join(MAIN_PATH,'djavu/static/images')
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']

@bp.route('/blog')
@login_required
def index():
    files = os.listdir(UPLOAD_FOLDER)
    images = []

    for file in files:
        print(file)
        extension = os.path.splitext(file)[1].lower()
        if extension in ALLOWED_EXTENSIONS:
            images.append(file)
 
    return render_template('index.html', images=images)

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

    return redirect('/blog')

@bp.route('/serve-image/<filename>', methods=['GET'])
def serve_image(filename):
   return send_from_directory(UPLOAD_FOLDER, filename)







