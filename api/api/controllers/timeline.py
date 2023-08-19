from flask import (
    Blueprint, g, request, jsonify, make_response, session
)

from api.controllers.auth import login_required
from api.repository import (imageRepository, userRepository, postRepository, commentRepository, likeRepository)

from api.utils.utils import rows_to_dict

bp = Blueprint('timeline', __name__, url_prefix='/')

Images = imageRepository()
Users = userRepository()
Posts = postRepository()
Comments = commentRepository()
Likes = likeRepository()

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

@bp.route('/change_post_description/<post_id>', methods=['POST'])
@login_required
def change_post_description(post_id):
    description = request.get_json()
    Posts.alter_post_description(description['description'], post_id)
    return make_response(jsonify({"message": "changed description"}), 200)
    
@bp.route('/delete-post/<post_id>', methods=['GET'])
@login_required
def delete_image(post_id):
    Posts.delete(post_id)
    return jsonify({"message": "OK"})

@bp.route('/get_comments<int:post_id>', methods=['GET'])
@login_required
def get_comments(post_id):
    post_commets = Comments.get_comments(post_id)
    
    return jsonify(post_commets)

@bp.route('/create_comment', methods=['POST'])
@login_required
def create_comment():
    json = request.get_json()
    author_id = session.get('user_id')
    content = json.get('content', '')
    post_id = json.get('post_id', '')
    
    if not str(post_id).isnumeric():
        return make_response(jsonify(message='Id do Post nao fornecido'), 400)
    
    Comments.insert_comment(content, author_id, post_id)
    
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)

@bp.route('/alter_comment', methods=['POST'])
@login_required
def alter_comment():
    json = request.get_json()
    content = json.get('content', '')
    comment_id = json.get('comment_id', '')
    
    if not str(comment_id).isnumeric():
        return make_response(jsonify(message='Id do Comentario nao fornecido'), 400)
    
    Comments.update_comment(content, comment_id)
    
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)

@bp.route('/delete_comment', methods=['POST'])
@login_required
def remove_comment():
    json = request.get_json()
    comment_id = json.get('comment_id', '')
    
    if not str(comment_id).isnumeric():
        return make_response(jsonify(message='Comentario nao fornecido'), 400)
    
    Comments.delete_comment(comment_id)
    
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)

@bp.route('/get_post_likes/<int:post_id>', methods=['GET'])
@login_required
def get_likes_from_post(post_id):
    post_likes = Likes.get_post_likes(post_id)

    return jsonify(post_likes)

@bp.route('/get_comment_likes/<int:comment_id>', methods=['GET'])
@login_required
def get_comment_likes(comment_id):
    comment_likes = Likes.get_comment_likes(comment_id)
    
    return jsonify(comment_likes)

@bp.route('/like_post', methods=['POST'])
@login_required
def like_post():
    json = request.get_json()
    tipo = json.get('tipo', '')
    author_id = (json.get('author_id', ''))
    post_id = (json.get('post_id', ''))
    
    likes_list = Likes.get_post_likes(post_id)
    
    for like in likes_list:
        print(like)
        if like['author_id'] == author_id:
            return make_response(jsonify(message='usuario já realizou like'), 409) 
    
    if tipo is None:
        return make_response(jsonify(message='tipo nao fornecido'), 400)
    
    for like in likes_list:
        if like['author_id'] == int(author_id):
            return make_response(jsonify(message='usuario já realizou like'), 409) 
    
    Likes.insert_like(tipo, author_id, post_id=post_id)
    
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)

@bp.route('/like_comment', methods=['POST'])
@login_required
def like_comment():
    json = request.get_json()
    tipo = json.get('tipo', '')
    author_id = json.get('author_id', '')
    comment_id = json.get('comment_id', '')
    
    likes_list = Likes.get_comment_likes(comment_id)
    
    if not str(comment_id).isnumeric():
        return make_response(jsonify(message='Id do Comentario nao fornecido'), 400)
    
    if tipo is None:
        return make_response(jsonify(message='tipo nao fornecido'), 400)
    
    if not str(author_id).isnumeric():
        return make_response(jsonify(message='Autor do like nao fornecido'), 400)
    
    for like in likes_list:
        if like['author_id'] == int(author_id):
            return make_response(jsonify(message='usuario já realizou like'), 409)
    
    Likes.insert_like(tipo, author_id, comment_id=comment_id)
    
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)

@bp.route('/remove_like', methods=['POST'])
@login_required
def remove_like():
    json = request.get_json()
    like_id = json.get('like_id', '')
    
    if like_id is None:
        return make_response(jsonify(message='Nenhum like fornecido'), 400)
    
    Likes.remove_like(like_id)
    message = jsonify({"message" : "OK"})
    return make_response(message, 200)
