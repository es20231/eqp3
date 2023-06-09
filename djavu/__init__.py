import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'djavu.sqlite'),
        UPLOAD_FOLDER=os.path.join(app.static_folder, "images")
    )

    from . import db
    db.init_app(app)

    from djavu.controllers import auth
    app.register_blueprint(auth.bp)

    from djavu.controllers import blog
    app.register_blueprint(blog.bp)

    from djavu.controllers import dashboard
    app.register_blueprint(dashboard.bp)

    return app

