def check_register(username,fullname,email,password):
    error = None
    if username == "":
        error = 'Username is Required.'
    elif fullname == "":
        error = 'Fullname is Required.'
    elif email == "":
        error = 'Email is Required.'
    elif password == "":
        error = 'Password is Required.'

    return error

def check_login(username, password, user):
    error = None
    if username == "":
        error = 'Username is Required.'
    elif password == "":
        error = 'Password is Required.'
    elif user is None:
        error = 'Wrong Username.'
    
    return error

