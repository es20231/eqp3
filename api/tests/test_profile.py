import pytest
from flask import g, session, json
from api.db import get_db

def test_userdata_without_login(client):
    response = client.get('/userdata')
    assert response.status_code == 401

def test_userdata(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.get('/userdata')
    assert response.status_code == 200

    expected_data = {
        'id': 1,
        'username': 'test',
        'fullname': 'test',
        'email': 'test',
        'description': '',
        'profile_picture': ''
    }
    assert response.json == expected_data
    
def test_change_username_without_login(client):
    response = client.post('/change_username', json={"new_username": "new_username"})
    assert response.status_code == 401

def test_change_username_same_username(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_username', json={"new_username": "test"})
    assert response.status_code == 409

def test_change_username_with_existing_username(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_username', json={"new_username": "other"})
    assert response.status_code == 409

def test_change_username(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_username', json={"new_username": "new_username"})
    assert response.status_code == 200
    assert response.json == {"new_username": "new_username"}

def test_change_username_without_new_username(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_username', json={})
    assert response.status_code == 400

def test_change_fullname_without_login(client):
    response = client.post('/change_fullname', json={"new_fullname": "Novo Nome Completo"})
    assert response.status_code == 401

def test_change_fullname(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_fullname', json={"new_fullname": "Novo Nome Completo"})
    assert response.status_code == 200
    assert response.json == {"new_fullname": "Novo Nome Completo"}
def test_change_fullname_without_new_fullname(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_fullname', json={})
    assert response.status_code == 400

def test_change_email_without_login(client):
    response = client.post('/change_email', json={"new_email": "novo_email@example.com"})
    assert response.status_code == 401

def test_change_email_same_email(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_email', json={"new_email": "test"})
    assert response.status_code == 409

def test_change_email_existing_email(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_email', json={"new_email": "other"})
    assert response.status_code == 409

def test_change_email(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_email', json={"new_email": "novo_email@example.com"})
    assert response.status_code == 200  
    assert response.json == {"new_email": "novo_email@example.com"}

def test_change_email_without_new_email(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_email', json={})
    assert response.status_code == 400
    
def test_change_password_without_login(client):
    response = client.post('/change_password', json={"new_password": "nova_senha"})
    assert response.status_code == 401

def test_change_password(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_password', json={"new_password": "nova_senha"})
    assert response.status_code == 200
    assert response.json == {"new_password": "nova_senha"}

def test_change_password_without_new_password(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_password', json={})
    assert response.status_code == 400
    
def test_change_description_without_login(client):
    response = client.post('/change_description', json={"new_description": "Nova descrição do usuário"})
    assert response.status_code == 401

def test_change_description_route(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

    response = client.post('/change_description', json={"new_description": "Nova descrição do usuário"})
    assert response.status_code == 200
    assert response.json == {"new_description": "Nova descrição do usuário"}
