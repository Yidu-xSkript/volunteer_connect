from flask import jsonify, request, Blueprint, session
from volcon.missions.Model import MissionModel

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

@missions_bp.route('/create/org/<int:org_id>', methods=['post'], strict_slashes=False)
def createMission(org_id):
    """Create Mission"""
    return model.Create(org_id)