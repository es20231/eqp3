import os

from werkzeug.exceptions import RequestEntityTooLarge
from werkzeug.utils import secure_filename

from flask import (
    Blueprint, request, session, send_from_directory, jsonify
)

from api.utils.utils import PATH, FILE
from api.controllers.auth import login_required
from api.repository import imageRepository

bp = Blueprint('dashboard', __name__, url_prefix='/')

Images = imageRepository()

@bp.route('/dashboard')
@login_required
def dashboard():
    user_id = session.get('user_id')
    user_images = Images.get_id(user_id)

    files = os.listdir(PATH.UPLOAD)
    filenames = []

    for user_image in user_images:
        for file in files:
            if file == user_image['filename']:
                filenames.append(file)
 
    return jsonify(user_images)


@bp.route('/upload', methods=['POST', 'OPTIONS'])
@login_required
def upload():
    user_id = session.get('user_id')
    try:
        file = request.files['file']
        extension = os.path.splitext(file.filename)[1].lower()
      
        if file:
            if extension not in FILE.ALLOWED_EXTENSIONS:
                return 'File not allowed'
            filename = secure_filename(file.filename)
            file.save(os.path.join(PATH.UPLOAD,filename))
            Images.insert(filename,os.path.join(PATH.UPLOAD,filename), user_id)
    except RequestEntityTooLarge:
        return 'File is larger than the 16MB limit.'

    return jsonify({"message": "upload success"})

@bp.route('/serve-image/<filename>', methods=['GET'])
def serve_image(filename):
   return send_from_directory(PATH.UPLOAD, filename)

