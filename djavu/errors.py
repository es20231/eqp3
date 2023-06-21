from werkzeug.security import check_password_hash, generate_password_hash


def check_register(username,fullname,email,password):
    error = None
    if not username:
        error = 'Username is required.'
    elif not fullname:
        error = 'Fullname is required.'
    elif not email:
        error = 'Email is required.'
    elif not password:
        error = 'Password is required.'

    return error

def check_login(user,password):
    error = None
    if user is None:
        error = 'Incorrect username.'
    elif not check_password_hash(user['password'], password):
        error = 'Incorrect password.'
    
    return error

