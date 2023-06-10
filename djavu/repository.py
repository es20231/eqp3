from djavu.db import get_db

class userRepository:
    def list_users(self):
        db = get_db()
        return db.execute(
            'SELECT * FROM user'
        ).fetchall()

    def insert_user(self, username, fullname, email, password):
        db = get_db()
        db.execute(
            "INSERT INTO user (username, fullname, email, password) VALUES (?, ?, ?, ?)",
            (username, fullname,
             email, password),
        )
        db.commit()

    def search_user(self, username):
        db = get_db()
        return db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

    def search_user_id(self, user_id):
        return get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
            ).fetchone()

class imageRepository:
    def insert_image(self, filename, path_name, user_id):
        db = get_db()
        db.execute(
            "INSERT INTO image (filename, path_name, user_id) VALUES (?, ?, ?)",
            (filename, path_name, user_id),
        )
        db.commit()

    def list_images(self):
        db = get_db()
        return db.execute(
            'SELECT * FROM image'
        ).fetchall()

    def dashboard(self, user_id):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE user_id = ?', (user_id,)
        ).fetchall()

