import os
from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'api.sqlite'),
    )

    from . import db
    db.init_app(app)

    from api.controllers import auth
    app.register_blueprint(auth.bp)

    from api.controllers import dashboard
    app.register_blueprint(dashboard.bp)

    return app

