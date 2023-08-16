import os

from werkzeug.security import generate_password_hash
from werkzeug.exceptions import RequestEntityTooLarge
from werkzeug.utils import secure_filename

from flask import (
    Blueprint, request, session, jsonify, make_response, send_from_directory
)

from api.utils.utils import PATH, FILE
from api.controllers.auth import login_required

from api.repository import userRepository
from api.repository import imageRepository

bp = Blueprint('profile', __name__, url_prefix='/')

Users = userRepository()
Images = imageRepository()

@bp.route('/userdata', methods=['GET',])
@login_required
def userdata():
    user_id = session.get('user_id')
    raw_data = Users.search_id(user_id)
    data = {}
    for atributo in raw_data.keys():
        if atributo != "password" and atributo != "role":
            data[atributo] = raw_data[atributo]
    
    return jsonify(data)

@bp.route('/user/<username>', methods=['GET',])
def userData(username):
    raw_data = Users.search_username(username)
    data = {}
    for atributo in raw_data.keys():
        if atributo != "password" and atributo != "role":
            data[atributo] = raw_data[atributo]
    
    return jsonify(data)
    
@bp.route('/change_username', methods=['POST',])
@login_required
def change_username():
    user_id = session.get('user_id')
    new_username = request.get_json().get('new_username', '')
    
    if not new_username:
        return make_response(jsonify(message='Novo nome de usuário não fornecido.'), 400)
    
    user_with_this_username = Users.search(new_username)
    if user_with_this_username == new_username:
        return make_response(jsonify(message='O novo nome de usuário é igual ao atual.'), 409)
    if user_with_this_username is not None:
        return make_response(jsonify(message='O novo nome de usuário já está em uso.'), 409)
    
    Users.alter_username(user_id, new_username)
    
    message = jsonify({"new_username": new_username})
    return make_response(message, 200)

@bp.route('/change_fullname', methods=['POST',])
@login_required
def change_fullname():
    user_id = session.get('user_id')
    new_fullname = request.get_json().get('new_fullname', '')
    
    if not new_fullname:
        return make_response(jsonify(message='Novo nome completo não fornecido.'), 400)
    
    Users.alter_fullname(user_id, new_fullname)
    
    message = jsonify({"new_fullname": new_fullname})
    return make_response(message, 200)

@bp.route('/change_email', methods=['POST',])
@login_required
def change_email():
    user_id = session.get('user_id')
    new_email = request.get_json().get('new_email', '')
    
    if not new_email:
        return make_response(jsonify(message='Novo email não fornecido.'), 400)
    
    user_with_this_email = Users.search(new_email)
    if user_with_this_email == new_email:
        return make_response(jsonify(message='O novo email é igual ao atual.'), 409)
    if user_with_this_email is not None:
        return make_response(jsonify(message='O novo email já está em uso.'), 409)
    
    Users.alter_email(user_id, new_email)
    
    message = jsonify({"new_email": new_email})
    return make_response(message, 200)

@bp.route('/change_password', methods=['POST',])
@login_required
def change_password():
    user_id = session.get('user_id')
    new_password = request.get_json().get('new_password', '')
    hashed_new_password = generate_password_hash(new_password)
    
    if not new_password:
        return make_response(jsonify(message='Nova senha não fornecida.'), 400)
    
    Users.alter_password(user_id, hashed_new_password)
    
    message = jsonify({"new_password": new_password})
    return make_response(message, 200)

@bp.route('/change_description', methods=['POST',])
@login_required
def change_description():
    user_id = session.get('user_id')
    new_description = request.get_json()
    
    Users.alter_description(user_id=user_id, new_description=new_description['new_description'])
    
    message = jsonify({"new_description": new_description['new_description']})
    return make_response(message, 200)

@bp.route('/set-profile-picture', methods=['POST', 'OPTIONS'])
@login_required
def set_profile_picture():
    user_id = session.get('user_id')

    try:
        file = request.files['file']
        extension = os.path.splitext(file.filename)[1].lower()

        if file:
            if extension not in FILE.ALLOWED_EXTENSIONS:
                return 'File not allowed'
            filename = secure_filename(file.filename)
            file.save(os.path.join(PATH.UPLOAD, filename))
            Images.insertProfilePicture(filename, os.path.join(PATH.UPLOAD, filename), user_id)
            Users.set_profile_picture(user_id, filename)
    except RequestEntityTooLarge:
        return 'File is larger than the 16MB limit.'

    return jsonify({"uptaded profile picture": "upload success"})
    
@bp.route('/serve-profile-picture', methods=['GET'])
@login_required
def serve_profile_picture():
    user_id = session.get('user_id')
    filename = Users.search_id(user_id)['profile_picture']
    return send_from_directory(PATH.UPLOAD, filename)