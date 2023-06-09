from djavu.db import get_db
from werkzeug.security import generate_password_hash

class userRepository:
    def list_users(self):
        db = get_db()
        return db.execute(
            'SELECT * FROM user'
        ).fetchall()

    def insert_user(self, username, fullname, email, password):
        db = get_db()
        try:
            db.execute(
                "INSERT INTO user (username, fullname, email, password) VALUES (?, ?, ?, ?)",
                (username, fullname,
                 email, generate_password_hash(password)),
            )
            db.commit()
        except db.IntegrityError:
            error = f"User {username} is already registered."

    def search_user(self, username):
        db = get_db()
        return db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

    def search_user_id(self, user_id):
        return get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
            ).fetchone()

