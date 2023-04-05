from flask import jsonify, request, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_current_user, get_jwt
from backend.models.volcon_db import db, Volunteer, Organization, User, TokenBlocklist
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash
from backend.volcon.volunteer.vol_cruds import vol_CRUDS
from backend.volcon.org.org_cruds import org_CRUDS
from backend.mixin.authorization import check_access

AuthController = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

@AuthController.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        name = data['name']
        role = data['role']

        if role == 'volunteer':
            user = Volunteer(email=email, password=generate_password_hash(password, method='sha256'), role=role, name=name)
        elif role == 'organization':
            user = Organization(email=email, password=generate_password_hash(password, method='sha256'), role=role, name=name)
        else:
            return jsonify({'error': 'Invalid role specified.'}), 400

        access_token = create_access_token(identity=email)

        db.session.add(user)
        db.session.commit()

        return jsonify({'user': user.to_dict(), 'token': access_token}), 201
    except SQLAlchemyError as e:
        error = str(e.__dict__.get('orig', e))
        return jsonify({'error': error}), 500

@AuthController.route('/signin', methods=['POST'])
def login():
    # retrieve credentials from request body
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # credentials verification against database
    volunteer = Volunteer.query.filter_by(email=email).one_or_none()
    organization = Organization.query.filter_by(email=email).one_or_none()

    if volunteer and volunteer.verify_password(password):
        return jsonify({'user': volunteer.to_dict(), 'token':  create_access_token(identity=email)}), 200

    elif organization and organization.verify_password(password):
        return jsonify({'user': organization.to_dict(), 'token':  create_access_token(identity=email)}), 200

    else:
        return jsonify({'error': 'Invalid email or Password'}), 401

# Endpoint for revoking the current users access token. Saved the unique
# identifier (jti) for the JWT into our database.
@AuthController.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    db.session.add(TokenBlocklist(jti=jti, type=ttype))
    db.session.commit()
    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked"), 200

# Just to test role access jwt middleware (check_access) => passed
# Replace check_access decorator with @jwt_required
@AuthController.route('/user', methods=['GET'])
@jwt_required()
# @check_access(['volunteer', 'organization'])
def user():
    """Retrieving User Information"""
    current_user: User = get_current_user()
    if current_user.role == 'volunteer':
        return vol_CRUDS().get_vol(current_user.id)
    elif current_user.role == 'organization':
        return org_CRUDS().get_org(current_user.id)

# On-Boarding
# Both have bio - remove bio from organization table and add it to user table
# Add resume to volunteer table.
# We don't use session anymore since we're using tokens to track users.
@AuthController.route('/user/update', methods=['PATCH'], strict_slashes=False)
@jwt_required()
def update_user():
    current_user: User = get_current_user()
    if current_user.role == 'volunteer':
        return vol_CRUDS().update_vol(current_user.id)
    elif current_user.role == 'organization':
        return org_CRUDS().update_org(current_user.id)

@AuthController.route('/user/<int:user_id>/image/update', methods=['PATCH'], strict_slashes=False)
@jwt_required()
def updateUserImage(userId):
    user: User = User.query.filter_by(id=userId).one_or_none()
    user.updateImage(request.get_json().get('image', user.image))
    return jsonify({'image': user.image})

@AuthController.route('/user/resume/destroy', methods=['PATCH'], strict_slashes=False)
@check_access(['volunteer'])
def destroyResume():
    user: User = get_current_user()
    volunteer: Volunteer = Volunteer()
    volunteer.destroyResume(user.id)
    return jsonify({'user': volunteer.to_dict()}), 200