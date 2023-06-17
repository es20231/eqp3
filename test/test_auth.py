import pytest
from flask import g, session
from djavu.database.db import get_db

def test_register(client, app):
    assert client.get('/register').status_code == 200
    response = client.post(
            '/register', data={'username': 'a', 'fullname': 'a', 'email': 'a', 'password': 'a'}
    )
    assert response.headers["Location"] == "/"

    with app.app_context():
        assert get_db().execute(
            "SELECT * FROM user WHERE username = 'a'",
        ).fetchone() is not None

@pytest.mark.parametrize(('username', 'fullname', 'email', 'password', 'message'), (
    ('', '', '', '', b'Username is required.'),
    ('a', '', '', '', b'Fullname is required.'),
    ('test', 'test', 'test@t.t', 'teste', b'already registered'),
))
def test_register_validate_input(client, username, fullname, email, password, message):
    response = client.post(
        '/register',
        data={'username': username, 'fullname': fullname, 'email': email, 'password': password}
    )
    assert message in response.data

def test_login(client, auth):
    assert client.get('/').status_code == 200
    response = auth.login()
    assert response.headers["Location"] == "/dashboard"

    with client:
        client.get('/')
        assert session['user_id'] == 1
        assert g.user['username'] == 'test'

@pytest.mark.parametrize(('username', 'password', 'message'), (
    ('a', 'test', b'Incorrect username.'),
    ('test', 'a', b'Incorrect password.'),
))

def test_login_validate_input(auth, username, password, message):
    response = auth.login(username, password)
    assert message in response.data

def test_logout(client, auth):
    auth.login()
    with client:
        auth.logout()
        assert 'user_id' not in session
