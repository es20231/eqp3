import functools

from werkzeug.security import check_password_hash, generate_password_hash

from flask import (
    Blueprint, g, request, session, jsonify, make_response
)

from api.repository import userRepository
from api.utils.errors import check_register, check_login

bp = Blueprint('profile', __name__, url_prefix='/')

Users = userRepository()

@bp.route('/description', methods=['POST',])
def description():
    user_id = session.get('user_id')
    new_description = request.form.get('new_description')
    
    Users.alter_description(user_id=user_id, new_description=new_description)
    
    return make_response(message, 200)
