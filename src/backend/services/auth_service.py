import os

from functools import wraps
from flask import request, redirect, url_for, session
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

