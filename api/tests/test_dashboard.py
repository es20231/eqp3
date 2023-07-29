import os
import json
import pytest
from flask import session, jsonify
from werkzeug.datastructures import FileStorage

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_PATH = os.path.join(BASE_DIR, 'data_test')

def test_dashboard_unauthorized(client):
    response = client.get('/dashboard')
    assert response.status_code == 401


def test_dashboard_authorized(client, auth):
    auth.login()
    
    response = client.get('/dashboard')
    assert response.status_code == 200

    data = json.loads(response.data)
    assert isinstance(data, list)

@pytest.mark.usefixtures('mock_images', 'mock_files')
def test_dashboard_data(client, auth):
    auth.login()
    response = client.get('/dashboard')

    data = response.json
    assert data == ['image1.jpg', 'image2.png']
    
def test_upload(client, auth):
    auth.login()
    
    #with open('data_test/test_image.jpg', 'rb') as f:
    with open(UPLOAD_PATH + '//test_image.jpg', 'rb') as f:
        response = client.post('/upload', data={'file': f})
    data = response.json
    assert response.status_code == 200
    assert data['message'] == 'upload success'
    
def test_upload_unauthorized(client):
    with open(UPLOAD_PATH + '//test_image.jpg', 'rb') as f:
        response = client.post('/upload', data={'file': f})
    assert response.status_code == 401

def test_serve_image(client, auth):
    auth.login()
    
    with open(UPLOAD_PATH + '//test_image.jpg', 'rb') as f:
        file = FileStorage(f, filename='test_serve.jpg')
        response = client.post('/upload', data={'file': file})
    
    response = client.get('/serve-image/test_serve.jpg')
    assert response.status_code == 200
    assert response.headers['Content-Type'] == 'image/jpeg' 
    
def test_serve_image_unauthorized(client):
    response = client.get('/serve-image/test.png')
    assert response.status_code == 401
    
def test_delete_image(client, auth):
    auth.login()
    
    with open(UPLOAD_PATH+'//test_image.jpg', 'rb') as f:
        file = FileStorage(f, filename='test_delete.jpg')
        response = client.post('/upload', data={'file': file})
    
    response = client.get('/delete-image/test_delete.jpg')
    data = response.json
    assert response.status_code == 200
    assert data['message'] == 'test_delete.jpg deleted'

    
 