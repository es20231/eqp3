import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'djavu.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from djavu.database import db
    db.init_app(app)

    from djavu.controllers import admin
    app.register_blueprint(admin.bp)

    from djavu.controllers import auth
    app.register_blueprint(auth.bp)

    from djavu.controllers import dashboard
    app.register_blueprint(dashboard.bp)

    from djavu.controllers import timeline
    app.register_blueprint(timeline.bp)

    return app

