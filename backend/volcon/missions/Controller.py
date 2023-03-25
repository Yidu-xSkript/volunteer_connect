from flask import Blueprint
from volcon.missions.Model import MissionModel
from volcon.auth.authorization import check_access
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Application, Mission


missions_bp = Blueprint('missions_bp', __name__, url_prefix='/api/v1/missions')
model = MissionModel()


@missions_bp.route('/', methods=['GET'], strict_slashes=False)
def get_missions():
    """Gets All Missions by Default until Search
    Filters are Applied
    """
    return model.get_all_missions()


@missions_bp.route('/<string:mission_id>', methods=['GET'], strict_slashes=False)
def get_mission(mission_id):
    """Getting missions by ID"""
    return model.get_mission_by_id(mission_id)


@missions_bp.route('/create/org/<int:user_id>', methods=['POST'], strict_slashes=False)
@check_access(['organization'])
def createMission(user_id):
    """Create Mission"""
    return model.Create(user_id)


@missions_bp.route('/<int:mission_id>/update', methods=['PATCH'], strict_slashes=False)
@check_access(['organization'])
def updateMission(mission_id):
    """Update Mission"""
    return model.Update(mission_id)

@missions_bp.route('/applied', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_applied_missions_status():
    """Returns The Status of all Missions associated with a Particular User_id"""
    user_id = get_jwt_identity()

    applications = Application.query.filter_by(user_id=user_id).all()
    mission_data = []

    for app in applications:
        mission_data.append({
            'mission_id': app.mission_id,
            'status': app.status
        })

    return jsonify(mission_data)
