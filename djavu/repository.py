from djavu.database.db import get_db

class userRepository:
    def get(self):
        db = get_db()
        return db.execute(
            'SELECT * FROM user'
        ).fetchall()

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
        return db.execute(
            'SELECT * FROM image WHERE user_id = ?', (user_id,)
        ).fetchall()

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








