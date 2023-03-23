from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm.exc import NoResultFound
from .models import Mission, Organization, Application, Volunteer
from mission_cruds import mission_CRUDS

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


@org_bp.route('/missions/<int:mission_id>', methods=['PATCH'])
@jwt_required()
def update_mission(mission_id):
    """Updates a mission based on the mission_id and user_id"""
    current_user_id = get_jwt_identity()
    try:
        organizer = Organization.query.filter_by(id=current_user_id).one()
        mission = Mission.query.filter_by(id=mission_id, org_id=organizer.id).one()
    except NoResultFound:
        return jsonify({'message': 'Mission not found.'}), 404

    name = request.json.get('name')
    description = request.json.get('description')
    image = request.json.get('image')
    max_people = request.json.get('max_people')
    start_date = request.json.get('start_date')
    end_date = request.json.get('end_date')

    if name:
        mission.name = name
    if description:
        mission.description = description
    if image:
        mission.image = image
    if max_people:
        mission.max_people = max_people
    if start_date:
        mission.start_date = start_date
    if end_date:
        mission.end_date = end_date

    try:
        db.session.commit()
        return jsonify({'message': 'Mission updated successfully.'})
    except:
        db.session.rollback()
        return jsonify({'message': 'Error updating mission.'}), 500