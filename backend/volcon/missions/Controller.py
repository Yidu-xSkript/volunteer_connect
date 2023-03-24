from flask import Blueprint
from volcon.missions.Model import MissionModel
from volcon.auth.authorization import check_access

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

@missions_bp.route('/create/org/<int:user_id>', methods=['post'], strict_slashes=False)
@check_access(['organization'])
def createMission(user_id):
    """Create Mission"""
    return model.Create(user_id)

@missions_bp.route('/<int:mission_id>/update', methods=['patch'], strict_slashes=False)
@check_access(['organization'])
def updateMission(mission_id):
    """Update Mission"""
    return model.Update(mission_id)