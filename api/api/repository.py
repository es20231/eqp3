from api.db import get_db
from api.utils.utils import rows_to_dict
import json

class userRepository:
    def get(self):
        db = get_db()
        rows = db.execute(
            'SELECT * FROM user'
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
    
    def alter_profile_pic(self, user_id, new_filename):
        db = get_db()
        db.execute(
            "UPDATE user SET profile_picture = ? WHERE id = ?",
            (new_filename, user_id)
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

    def search(self, filename):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE filename = ?', (filename,)
        ).fetchone()

    def delete(self, filename):
        db = get_db()
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
        return db.execute(
            'SELECT * FROM image'
        ).fetchall()

    def get_id(self, user_id):
        db = get_db()
        images = db.execute(
            'SELECT * FROM image WHERE user_id = ?', (user_id,)
        ).fetchall()
        return images

class postRepository:
    def timeline(self, username):
        db = get_db()
        return db.execute(
            'SELECT p.id, description, filename, created, author_id, username'
            ' FROM post p JOIN user u ON p.author_id = u.id WHERE u.username = ? '
            ' ORDER BY created DESC', (username,)
        ).fetchall()

    def insert(self, description, filename, author_id):
        db = get_db()
        db.execute(
            'INSERT INTO post (description, filename, author_id)'
            ' VALUES (?, ?, ?)',
            (description, filename, author_id)
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








