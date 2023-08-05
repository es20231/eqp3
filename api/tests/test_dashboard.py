import json
import pytest
from flask import session, jsonify
from werkzeug.datastructures import FileStorage
from unittest import mock

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

    with open('./data_test/test_image.jpg', 'rb') as f:
        file_mock = mock.MagicMock(spec=f)
        file_mock.read.return_value = f.read()

        with mock.patch('builtins.open', return_value=file_mock):
            response_mock = mock.MagicMock()
            response_mock.status_code = 200
            response_mock.json.return_value = {'message': 'upload success'}

            with mock.patch.object(client, 'post', return_value=response_mock) as mock_post:
                response = client.post('/upload', data={'file': file_mock})

    data = response.json()
    assert response.status_code == 200
    assert data['message'] == 'upload success'

    
def test_upload_unauthorized(client, auth):
    auth.login()

    with open('./data_test/test_image.jpg', 'rb') as f:
        file_mock = mock.MagicMock(spec=f)
        file_mock.read.return_value = f.read()

        with mock.patch('builtins.open', return_value=file_mock):
            response_mock = mock.MagicMock()
            response_mock.status_code = 401

            with mock.patch.object(client, 'post', return_value=response_mock) as mock_post:
                response = client.post('/upload', data={'file': file_mock})

    assert response.status_code == 401

def test_serve_image(client, auth, file_mock):
    auth.login()

    response = client.post('/upload', data={'file': (file_mock, 'test_serve.jpg')})
    assert response.status_code == 200

    response = client.get('/serve-image/test_serve.jpg')
    assert response.status_code == 200
    assert response.headers['Content-Type'] == 'image/jpeg'
    
def test_serve_image_unauthorized(client):
    response = client.get('/serve-image/test.png')
    assert response.status_code == 401
    
def test_delete_image(client, auth):
    auth.login()

    response_mock = mock.MagicMock()
    response_mock.status_code = 200
    response_mock.json.return_value = {'message': 'test_delete.jpg deleted'}

    with mock.patch.object(client, 'get', return_value=response_mock):
        response = client.get('/delete-image/test_delete.jpg')

    assert response.status_code == 200
    assert response.json() == {'message': 'test_delete.jpg deleted'}


    
 