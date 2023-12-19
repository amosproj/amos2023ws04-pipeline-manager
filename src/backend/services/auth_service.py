import os

from functools import wraps
from flask import redirect, url_for, session
from dotenv import load_dotenv


def secure(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        load_dotenv()
        if os.getenv('ENABLE_KEYCLOAK') == 'True':
            if not session.get('oidc_auth_token'):
                return redirect(url_for('auth'))
        else:
            print('keycloak not enabled')

        return f(*args, **kwargs)
    return decorated_function


def public(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        load_dotenv()
        if (os.getenv('DPMS_PASSWORD') != session.get('password')
                or os.getenv('DPMS_USERNAME') != session.get('username')):
            print('Name or password for authentication is wrong')

        return f(*args, **kwargs)
    return decorated_function

