import pytest
from djavu.database.db import get_db


def test_index(client, auth):
    response = client.get('/')
    assert b"login" in response.data
    assert b"register" in response.data

    auth.login()
    response = client.get('/dashboard')
    assert b'href="/logout"' in response.data
    assert b'href="/users"' in response.data
    assert b'href="/images"' in response.data
    assert b'Upload' in response.data
    # need to fully add CRUD before finishing first complete test
    # create post.py


