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

@MissionController.route('/organization', methods=['GET'], strict_slashes=False)
@check_access(['organization'])
def get_org_missions():
    """Gets All Missions by Default until Search
    Filters are Applied
    """
    return model.getOrgMissions()

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

@MissionController.route('/<int:id>/destroy', methods=['DELETE'], strict_slashes=False)
@check_access(['organization'])
def destroyMission(id):
    """Destroy Mission"""
    return model.Destroy(id)