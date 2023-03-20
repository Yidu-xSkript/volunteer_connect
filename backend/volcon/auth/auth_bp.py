from flask import jsonify, request, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_current_user, get_jwt
from models.volcon_db import db, Volunteer, Organization, User, TokenBlocklist
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash
from volcon.volunteer.vol_cruds import vol_CRUDS
from volcon.org.org_cruds import org_CRUDS
from volcon.auth.authorization import check_access

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')


@auth_bp.route('/signup', methods=['POST'], strict_slashes=False)
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

        return jsonify({'user': user.serialize(), 'token': access_token}), 201
    except SQLAlchemyError as e:
        error = str(e.__dict__.get('orig', e))
        return jsonify({'error': error}), 500

@auth_bp.route('/signin', methods=['POST'], strict_slashes=False)
def login():
    # retrieve credentials from request body
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # credentials verification against database
    volunteer = Volunteer.query.filter_by(email=email).one_or_none()
    organization = Organization.query.filter_by(email=email).one_or_none()

    if volunteer and volunteer.verify_password(password):
        return jsonify({'user': volunteer.serialize(), 'token':  create_access_token(identity=email)}), 200

    elif organization and organization.verify_password(password):
        return jsonify({'user': organization.serialize(), 'token':  create_access_token(identity=email)}), 200

    else:
        return jsonify({'error': 'Invalid email or Password'}), 401

# Endpoint for revoking the current users access token. Saved the unique
# identifier (jti) for the JWT into our database.
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    db.session.add(TokenBlocklist(jti=jti, type=ttype))
    db.session.commit()
    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked"), 200

# Just to test role access jwt middleware => passed
# Replace check_access decorator with @jwt_required
@auth_bp.route('/user', methods=['GET'], strict_slashes=False)
@check_access(['volunteer', 'organization'])
def user():
    """Retrieving User Information"""
    current_user: User = get_current_user()
    if current_user.role == 'volunteer':
        return vol_CRUDS().get_vol(current_user.id)
    elif current_user.role == 'organization':
        return org_CRUDS().get_org(current_user.id)

@auth_bp.route('/user/<int:user_id>/update', methods=['PATCH'], strict_slashes=False)
def update_user(user_id):
    role = session.get('role')

    if role == 'volunteer':
        volunteer_cruds = vol_CRUDS()
        vol_id = Volunteer.query.filter_by(user_id=user_id).first().volunteer_id
        return volunteer_cruds.update_vol(vol_id)
    elif role == 'organization':
        organization_cruds = vol_CRUDS()
        org_id = Organization.query.filter_by(user_id=user_id).first().org_id
        return organization_cruds.update_org(org_id)