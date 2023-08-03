import pytest
from flask import json
from api.db import get_db

def test_post(client, app, auth):
    auth.login()  
    data = {'description': 'Peter Sellers is awesome'}
    response = client.post(
        '/post/Sfront.jpg', content_type='application/json', data = json.dumps(data)
    )
    assert response.status_code == 201

    with app.app_context():
        assert get_db().execute(
            "SELECT * FROM post WHERE author_id = '1'",
        ).fetchone() is not None
        
def test_post_image_not_in_dashboard(client, auth):
    auth.login()  
    data = {'description': 'Peter Sellers is awesome'}
    response = client.post(
        '/post/Sfro2.jpg', content_type='application/json', data = json.dumps(data)
    )
    assert response.status_code == 404
    
def test_post_not_logged(client):
    data = {'description': 'Peter Sellers is awesome'}
    response = client.post(
        '/post/Sfro2.jpg', content_type='application/json', data = json.dumps(data)
    )
    assert response.status_code == 401

def test_timeline(client, auth):
    auth.login()
    assert client.get('/timeline/test').status_code == 200

def test_timeline_not_logged(client):
    assert client.get('/timeline/test').status_code == 401

def test_users(client, auth):
    auth.login()
    assert client.get('/users').status_code == 200

def test_users_not_logged(client):
    assert client.get('/users').status_code == 401
