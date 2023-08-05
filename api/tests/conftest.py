from cgi import FieldStorage
from io import BytesIO
import os
import tempfile
from unittest.mock import MagicMock
from api.controllers.dashboard import Images

from flask import json
import pytest
from api import create_app
from api.db import get_db, init_db

with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
    _data_sql = f.read().decode('utf8')


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()

    app = create_app({
        'TESTING': True,
        'DATABASE': db_path,
    })

    with app.app_context():
        init_db()
        get_db().executescript(_data_sql)

    yield app

    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()

class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='test', password='test'):
        data = {'username': username, 'password': password}
        return self._client.post(
            '/login', content_type='application/json', data = json.dumps(data)
        )

    def logout(self):
        return self._client.get('/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)

@pytest.fixture
def mock_images(monkeypatch):
    def get_id_mock(self):
        return [{'filename': 'image1.jpg'}, {'filename': 'image2.png'}]

    monkeypatch.setattr(Images, 'get_id', get_id_mock)

@pytest.fixture
def mock_files(monkeypatch):
    def listdir_mock(self):
        return ['image1.jpg', 'image2.png']

    monkeypatch.setattr(os, 'listdir', listdir_mock)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_PATH = os.path.join(BASE_DIR, '../api', 'tests', 'data_test')

@pytest.fixture
def file_mock():
    with open('./data_test/test_image.jpg', 'rb') as f:
        file_mock = BytesIO(f.read())
        file_mock.name = 'test_serve.jpg'  # Define o nome do arquivo
        return file_mock

