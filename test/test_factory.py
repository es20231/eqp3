from djavu import create_app

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def test_hello(client):
    assert client.get('/').status_code == 200
    #response = client.get('/')
    #assert response.data == b'Login'
