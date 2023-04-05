from flask import Blueprint
from backend.volcon.applications.Model import ApplicationModel
from backend.mixin.authorization import check_access
from flask_jwt_extended import get_current_user, jwt_required

AppController = Blueprint('AppController', __name__,
                          url_prefix='/api/v1/application')
model = ApplicationModel()


@AppController.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def getApplications():
    """Gets All Application listings the volunteer applied to.
    """
    user = get_current_user()
    return model.getAllForUser(user.role)


@AppController.route('/mission/<int:mission_id>/apply', methods=['post'], strict_slashes=False)
@check_access(['volunteer'])
def createApplication(mission_id):
    """Create Application - Use this for when user applies."""
    user = get_current_user()
    return model.Create(user.id, mission_id)


@AppController.route('/<int:id>/update', methods=['patch'], strict_slashes=False)
@check_access(['organization'])
def updateApplication(id):
    """Update Application"""
    return model.Update(id)
