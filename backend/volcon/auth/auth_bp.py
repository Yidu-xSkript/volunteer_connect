from flask import jsonify, request, Blueprint, session
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash
from volcon_db import db, Volunteer, Organization, User

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
"""A sign-in API route Complete with Session Management"""
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
        return jsonify({'error': 'Invalid username or password'}), 401)