from flask import Blueprint
from volcon.missions.Model import MissionModel
from mixin.authorization import check_access
from flask_jwt_extended import get_current_user, jwt_required

MissionController = Blueprint('MissionController', __name__, url_prefix='/api/v1/missions')
model = MissionModel()


@MissionController.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_missions():
    """Gets All Missions by Default until Search
    Filters are Applied
    """
    return model.get_all_missions()


@MissionController.route('/<string:mission_id>', methods=['GET'], strict_slashes=False)
def get_mission(mission_id):
    """Getting missions by ID"""
    return model.get_mission_by_id(mission_id)


@MissionController.route('/create/org', methods=['POST'], strict_slashes=False)
@check_access(['organization'])
def createMission():
    """Create Mission"""
    user_id = get_current_user().id
    return model.Create(user_id)


@MissionController.route('/<int:id>/update', methods=['PATCH'], strict_slashes=False)
@check_access(['organization'])
def updateMission(id):
    """Update Mission"""
    return model.Update(id)


@MissionController.route('/applied', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_applied_missions_status():
    """Returns The Status of all Missions associated with a Particular User_id"""
    user_id = get_jwt_identity().get('id')

    applications = Application.query.filter_by(user_id=user_id).all()
    mission_data = []

    for app in applications:
        mission_data.append({
            'mission_id': app.mission_id,
            'status': app.status
        })

    return jsonify(mission_data)


@MissionController.route('/<int: mission_id>/apply', methods=['POST'], strict_slashes=False)
@jwt_required()
def apply_to_mission(mission_id):
    """Creating New Application Entry Based on Mission_id and user_id"""
    user_id = get_jwt_identity.get('id')

    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404

    application = Application.query.filter_by(
        user_id = user_id, mission_id=mission_id).first()
    if application:
        return jsonify({'error': 'Application already exists'}), 400

    new_application = Application(
        user_id=user_id, 
        mission_id=mission_id
        )

    db.session.add(new_application)
    db.session.commit()

    return jsonify({'message': 'Application submitted successfully!'}), 201


@MissionController.route('/<int:id>/destroy', methods=['DELETE'], strict_slashes=False)
@check_access(['organization'])
def destroyMission(id):
    """Destroy Mission"""
    return model.Destroy(id)