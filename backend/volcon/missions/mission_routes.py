from flask import jsonify, request, Blueprint, session
from mission_cruds import mission_CRUDS


missions_bp = Blueprint('missions_bp', __name__, url_prefix='/api/v1/missions')
mission_crud = mission_CRUDS()


@missions_bp.route('/', methods=['GET'], strict_slashes=False)
def get_missions():
    """Gets All Missions by Default until Search
    Filters are Applied
    """
    mission_crud.get_all_missions()


@missions_bp.route('/<string:mission_id>', methods=['GET'], strict_slashes=False)
def get_mission(mission_id):
    """Getting missions by ID"""
    mission_crud.get_mission_by_id(mission_id)
