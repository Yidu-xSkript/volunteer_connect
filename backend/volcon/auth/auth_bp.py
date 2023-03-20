from flask import jsonify, request, Blueprint, session
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash
from volcon_db import db, Volunteer, Organization, User
from vol_cruds import vol_CRUDS
from org_cruds import org_CRUDS


auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        role = data['role']
        if role == 'volunteer':
            user = Volunteer(
                email=email,
                password=generate_password_hash(password, method='sha256')
            )
        elif role == 'organization':
            user = Organization(
                email=email,
                password=generate_password_hash(password, method='sha256')
            )
        else:
            return jsonify({'error': 'Invalid role specified.'}), 400
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully.'}), 201
    except SQLAlchemyError as e:
        error = str(e.__dict__.get('orig', e))
        return jsonify({'error': error}), 500


@auth_bp.route('/signin', methods=['POST'])
def login():
    # retrieve credentials from request body
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # credentials verification against database
    volunteer = Volunteer.query.filter_by(username=username, password=password).first()
    organization = Organization.query.filter_by(username=username, password=password).first()

    # check if user exists and assign session ID
    if volunteer:
        session['user_id'] = volunteer.volunteer_id
        session['role'] = 'volunteer'
        return jsonify({'message': 'Login successful'})
    elif organization:
        session['user_id'] = organization.org_id
        session['role'] = 'organization'
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@auth_bp.route('/user', methods=['GET'])
def user():
    """Retrieving User Information"""
    # Fetching user_id from session instance
    user_id = session.get('user_id')
    role = session.get('role')

    # check if user is authenticated
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    # User Information fetch based on role
    if role == 'volunteer':
        volunteer_cruds = vol_CRUDS()
        return volunteer_cruds.get_vol(user_id)
    elif role == 'organization':
        org_cruds = org_CRUDS()
        return org_cruds.get_org(user_id)
