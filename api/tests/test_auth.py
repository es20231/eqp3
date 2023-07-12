import pytest
from flask import g, session, json
from api.db import get_db

def test_register(client, app):
    data = {'username': 'a', 'fullname': 'a', 'email': 'a', 'password': 'a'}
    response = client.post(
        '/register', content_type='application/json', data = json.dumps(data)
    )
    assert response.status_code == 201

    with app.app_context():
        assert get_db().execute(
            "SELECT * FROM user WHERE username = 'a'",
        ).fetchone() is not None
    
@pytest.mark.parametrize(('username', 'fullname', 'email', 'password', 'message'), (
    ('', '', '', '', b'Username is Required.'),
    ('a', '', '', '', b'Fullname is Required.'),
    ('a', 'a', '', '', b'Email is Required.'),
    ('a', 'a', 'a', '', b'Password is Required.'),
    ('test', 'test', 'teste', 'teste', b'User Already Registered'),
))
def test_register_validate_input(client, username, fullname, email, password, message):
    data = {'username': username, 'fullname': fullname, 'email': email, 'password': password}
    response = client.post(
        '/register', content_type='application/json', data = json.dumps(data)
    )
    assert message in response.data
    assert response.status_code == 412

def test_login(client, auth):
    response = auth.login()

    with client:
        client.get('/')
        assert session['user_id'] == 1
        assert g.user['username'] == 'test'

def test_logout(client, auth):
    auth.login()

    with client:
        auth.logout()
        assert 'user_id' not in session

@pytest.mark.parametrize(('username', 'password', 'message'), (
    ('a', 'test', b'Wrong Username.'),
    ('test', 'a', b'Wrong Password.'),
))
def test_login_validate_input(auth, username, password, message):
    response = auth.login(username, password)
    assert message in response.data
    assert response.status_code == 412

def test_users(client, app):
    assert client.get('/users').status_code == 200

def test_login_required(client, app):
    assert client.get('/dashboard').status_code == 401