from flask import (
    Blueprint, g, request, jsonify, make_response
)

from api.controllers.auth import login_required
from api.repository import (imageRepository, userRepository, postRepository)

from api.utils.utils import rows_to_dict

bp = Blueprint('timeline', __name__, url_prefix='/')

Images = imageRepository()
Users = userRepository()
Posts = postRepository()

@bp.route('/timeline/<username>')
@login_required
def index(username):
    if Users.search(username):
        posts = Posts.timeline(username)
        return jsonify(posts)
    else:
        return make_response(jsonify({"error": "user not found"}),404)

@bp.route('/post/<filename>', methods=['POST'])
@login_required
def post(filename):

    description = request.get_json()

    if Images.search_id(filename, g.user['id']) is not None:
        #image_id = int(str(Images.getImage_id(filename))
        image = Images.search(filename)
        Posts.insert(description['description'],filename,g.user['id'],image['id'])
        return make_response(jsonify({"message": "posted"}), 201)
    else: 
        return make_response(jsonify({"error": "image not in dashboard"}), 404)


@bp.route('/users', methods=['GET'])
@login_required
def users():
    users = Users.get()
    message = jsonify(users)
    return make_response(message, 200)