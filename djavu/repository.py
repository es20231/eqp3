from djavu.database.db import get_db

class userRepository:
    def list_users(self):
        db = get_db()
        return db.execute(
            'SELECT * FROM user'
        ).fetchall()

    def insert_user(self, username, fullname, email, password):
        db = get_db()
        role = "user"
        db.execute(
            "INSERT INTO user (username, fullname, email, password, role) VALUES (?, ?, ?, ?, ?)",
            (username, fullname, email, password, role),
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

    def generate_admin(self, password):
        db = get_db()
        db.execute(
            "INSERT INTO user (username, fullname, email, password, role) VALUES (?, ?, ?, ?, ?)",
            ("admin", "admin", "admin", password, "admin"),
        )
        db.commit()

class imageRepository:
    def insert_image(self, filename, path_name, user_id):
        db = get_db()
        db.execute(
            "INSERT INTO image (filename, path_name, user_id) VALUES (?, ?, ?)",
            (filename, path_name, user_id),
        )
        db.commit()

    def search_image(self, filename):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE filename = ?', (filename,)
        ).fetchone()

    def search_image_id(self, user_id, img_id):
        db = get_db()
        return db.execute(
            'SELECT * FROM image WHERE image.user_id=? AND image.id=?', (user_id, img_id)
        ).fetchone()

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

   
