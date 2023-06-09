from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,
    redirect, send_from_directory, current_app
)
from werkzeug.exceptions import (abort, RequestEntityTooLarge)
from werkzeug.utils import secure_filename
from djavu.controllers.auth import login_required
import os

bp = Blueprint('blog', __name__, url_prefix='/')

MAX_CONTENT_LENGTH = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']

@bp.route('/blog')
@login_required
def index():
    files = os.listdir(current_app.config['UPLOAD_FOLDER'])
    images = []

    for file in files:
        print(file)
        extension = os.path.splitext(file)[1].lower()
        if extension in ALLOWED_EXTENSIONS:
            images.append(file)
 
    return render_template('index.html', images=images)

@bp.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files['file']
        extension = os.path.splitext(file.filename)[1].lower()
      
        if file:
            if extension not in ALLOWED_EXTENSIONS:
                return 'File not allowed'
            file.save(os.path.join(
                current_app.config['UPLOAD_FOLDER'],
                secure_filename(file.filename)
             ))
    except RequestEntityTooLarge:
        return 'File is larger than the 16MB limit.'

    return redirect('/blog')

@bp.route('/serve-image/<filename>', methods=['GET'])
def serve_image(filename):
   return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)







