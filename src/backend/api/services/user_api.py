from flask import Blueprint

user_api = Blueprint("user_api", template_folder="templates")


@user_api.route('/')
def index():
    return "Register/SignIn Page"


@user_api.route('/register',methods=['GET', 'POST'])
def user_registration():
    return 'User registration completed'


@user_api.route('/login',methods=['GET', 'POST'])
def user_login():
    return "Login Success"
