from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm.exc import NoResultFound
from .models import Mission, Organization, Application, Volunteer

org_bp = Blueprint('org_bp', __name__, url_prefix='/api/v1/organisation')


@org_bp.route('/missions')
@jwt_required()
def get_organizer_missions():
    """Returns missions that an organizer created based on the user_id that has the role of an organizer"""
    current_user_id = get_jwt_identity()
    try:
        organizer = Organization.query.filter_by(id=current_user_id).one()
        missions = organizer.missions
        return jsonify([mission.serialize() for mission in missions])
    except NoResultFound:
        return jsonify({'message': 'User not found.'}), 404

