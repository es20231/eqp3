from api.db import get_db
from api.utils.utils import rows_to_dict

class userRepository:
    def get(self):
        db = get_db()
        rows = db.execute(
            'SELECT username, fullname, description, profile_picture FROM user'
        ).fetchall()
        users = rows_to_dict(rows)
        return users

    def insert(self, username, fullname, email, password):
        db = get_db()
        role = "user"
        db.execute(
            "INSERT INTO user (username, fullname, email, password, role) VALUES (?, ?, ?, ?, ?)",
            (username, fullname, email, password, role),
        )
        db.commit()

    def search(self, username):
        db = get_db()
        return db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

    def search_id(self, user_id):
        return get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
            ).fetchone()

    def search_username(self, username):
        return get_db().execute(
            'SELECT * FROM user WHERE username = ?', (username,)
            ).fetchone()

    def generate_admin(self, password):
        db = get_db()
        db.execute(
            "INSERT INTO user (username, fullname, email, password, role) VALUES (?, ?, ?, ?, ?)",
            ("admin", "admin", "admin", password, "admin"),
        )
        db.commit()
        
    def alter_username(self, user_id, new_username):
        db = get_db()
        db.execute(
            "UPDATE user SET username = ? WHERE id = ?",
            (new_username, user_id)
        )
        db.commit()
    
    def alter_fullname(self, user_id, new_fullname):
        db = get_db()
        db.execute(
            "UPDATE user SET fullname = ? WHERE id = ?",
            (new_fullname, user_id)
        )
        db.commit()
    
    def alter_email(self, user_id, new_email):
        db = get_db()
        db.execute(
            "UPDATE user SET email = ? WHERE id = ?",
            (new_email, user_id)
        )
        db.commit()
    
    def alter_password(self, user_id, new_password):
        db = get_db()
        db.execute(
            "UPDATE user SET password = ? WHERE id = ?",
            (new_password, user_id)
        )
        db.commit()
        
    def alter_description(self, user_id, new_description):
        db = get_db()
        db.execute(
            "UPDATE user SET description = ? WHERE id = ?",
            (new_description, user_id)
        )
        db.commit()

    def set_profile_picture(self, user_id, filename):
        db = get_db()
        db.execute(
            "UPDATE user SET profile_picture = ? WHERE id = ?",
            (filename, user_id)
        )
        db.commit()

class imageRepository:
    def insert(self, filename, path_name, user_id):
        db = get_db()
        db.execute(
            "INSERT INTO image (filename, path_name, user_id) VALUES (?, ?, ?)",
            (filename, path_name, user_id),
        )
        db.commit()

    def insertProfilePicture(self, filename, path_name, user_id):
        db = get_db()
        type = "profile_picture"
        db.execute(
            "INSERT INTO image (filename, path_name, user_id, type) VALUES (?, ?, ?, ?)",
            (filename, path_name, user_id, type),
        )
        db.commit()

    def search(self, filename):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE filename = ?', (filename,)
        ).fetchone()

    def getImage_id(self, filename):
        db = get_db()
        return db.execute(
            'SELECT id FROM image WHERE filename = ?', (filename,)
        ).fetchone()


    def delete(self, filename):
        db = get_db()
        db.execute('PRAGMA foreign_keys = ON')
        db.execute(
            'DELETE FROM image WHERE filename = ?', (filename,)
        )
        db.commit()
        
    def search_id(self, filename, user_id):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE filename = ? AND user_id = ?', (filename, user_id,)
        ).fetchone()

    def get(self):
        db = get_db()
        images = db.execute(
            'SELECT * FROM image'
        ).fetchall()
        return rows_to_dict(images)

    def get_id(self, user_id):
        db = get_db()
        type = "dashboard"
        images = db.execute(
            'SELECT * FROM image WHERE user_id = ? AND type = ?', (user_id, type,)
        ).fetchall()
        return images

class postRepository:
    def timeline(self, username):
        db = get_db()
        posts = db.execute(
            'SELECT p.id, p.description, filename, created, author_id, username, image_id'
            ' FROM post p JOIN user u ON p.author_id = u.id WHERE u.username = ? '
            ' ORDER BY created DESC', (username,)
        ).fetchall()
        return rows_to_dict(posts)

    def insert(self, description, filename, author_id, image_id):
        db = get_db()
        db.execute(
            'INSERT INTO post (description, filename, author_id, image_id)'
            ' VALUES (?, ?, ?, ?)',
            (description, filename, author_id, image_id)
        )
        db.commit()
        
    def get_all_posts(self):
        db = get_db()
        rows = db.execute(
            'SELECT * FROM post ORDER BY created DESC'
        ).fetchall()
        
        posts = rows_to_dict(rows)
        
        return posts
    
    def get_user_posts(self, author_id):
        db = get_db()
        rows = db.execute(
            'SELECT * FROM post WHERE author_id = ? ORDER BY created DESC', (author_id,)
        ).fetchall()
        
        posts = rows_to_dict(rows)
        
        return posts
    
    def alter_post_description(self, new_description, post_id):
        db = get_db()
        db.execute(
            "UPDATE post SET description = ? WHERE id = ?", (new_description, post_id),
        )
        db.commit()

    def delete(self, post_id):
        db = get_db()
        db.execute(
            'DELETE FROM post WHERE id = ?', (post_id,)
        )
        db.commit()

class commentRepository:
    def insert_comment(self, content, author_id, post_id):
        db = get_db()
        
        db.execute(
            "INSERT INTO comment (content, author_id, post_id) VALUES (?, ?, ?)",
            (content, author_id, post_id),
        )
        db.commit()
    
    def get_comments(self, post_id):
        db = get_db()

        rows = db.execute(
            'SELECT c.id, c.content, c.created, u.username, u.profile_picture'
            ' FROM comment c JOIN user u ON c.author_id = u.id WHERE c.post_id = ? '
            ' ORDER BY created DESC', (post_id,)
        ).fetchall()
        
        comments = rows_to_dict(rows)
        
        return comments
    
    def update_comment(self, content, comment_id):
        db = get_db()
        db.execute(
            "UPDATE comment SET content = ? WHERE id = ?",
            (content, comment_id)
        )
        db.commit()
        
    def delete_comment(self, id):
        db = get_db()
        db.execute(
            'DELETE FROM comment WHERE id = ?', (id,)
        )
        db.commit()

class likeRepository:
    def insert_like(self, tipo, author_id, post_id=None, comment_id=None):
        db = get_db()
        db.execute(
            "INSERT INTO likes (tipo, author_id, post_id, comment_id) VALUES (?, ?, ?, ?)",
            (tipo, author_id, post_id, comment_id),
        )
        db.commit()
    
    def get_post_likes(self, post_id):
        db = get_db()
        
        rows = db.execute(
            'SELECT l.id, l.tipo, l.author_id, u.username, u.profile_picture'
            ' FROM likes l JOIN user u ON l.author_id = u.id WHERE l.post_id = ? '
            ' ORDER BY l.id DESC', (post_id,)
        ).fetchall()
        
        post_likes = rows_to_dict(rows)
        
        return post_likes
    
    def get_comment_likes(self, comment_id):
        db = get_db()
        rows = db.execute(
            'SELECT id, tipo, author_id, comment_id FROM likes WHERE comment_id = ?',
            (comment_id,)
        ).fetchall()
        
        comment_likes = rows_to_dict(rows)
        
        return comment_likes
    
    def remove_like(self, id):
        db = get_db()
        db.execute(
            'DELETE FROM likes WHERE id = ?', (id,)
        )
        db.commit()
