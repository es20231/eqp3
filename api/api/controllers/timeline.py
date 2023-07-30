

from flask import (
    Blueprint, g, request, jsonify, make_response
)

from api.controllers.auth import login_required
from api.repository import imageRepository
from api.repository import userRepository
from api.db import get_db

from api.utils.utils import rows_to_dict

bp = Blueprint('timeline', __name__, url_prefix='/')

repo = imageRepository()
repoUsers = userRepository()

@bp.route('/timeline/<username>')
@login_required
def index(username):
    db = get_db()
    posts = db.execute(
        'SELECT p.id, p.description, filename, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id WHERE u.username = ? '
        ' ORDER BY created DESC', (username,)
    ).fetchall()
    posts = rows_to_dict(posts)
    return jsonify(posts)

@bp.route('/post/<filename>', methods=['POST'])
@login_required
def post(filename):

    description = request.get_json()

    db = get_db()
    db.execute(
        'INSERT INTO post (description, filename, author_id)'
        ' VALUES (?, ?, ?)',
        (description['description'], filename, g.user['id'])
    )
    db.commit()

    return jsonify({"message": "posted"})


@bp.route('/users')
def show_users():
    users = repoUsers.list_users()
    return jsonify(users)