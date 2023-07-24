from werkzeug.security import generate_password_hash

from flask import (
    Blueprint, request, session, jsonify, make_response
)

from api.repository import userRepository
from api.controllers.auth import login_required

bp = Blueprint('profile', __name__, url_prefix='/')

Users = userRepository()

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
    new_description = request.get_json().get('new_description', '')
    
    Users.alter_description(user_id, new_description)
    
    message = jsonify({"new_description": new_description})
    return make_response(message, 200)

@bp.route('/change_profile_picture', methods=['POST',])
@login_required
def change_profile_picture():
    user_id = session.get('user_id')
    profile_pic_filename = request.get_json().get('new_profile_pic')
    
    if not profile_pic_filename:
        return make_response(jsonify(message='Nova imagem não fornecida.'), 400)
    
    Users.alter_profile_pic(user_id, profile_pic_filename)
    
    message = jsonify({"new_profile_pic": profile_pic_filename})
    return make_response(message, 200)