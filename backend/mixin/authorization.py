from functools import wraps

from flask_jwt_extended import get_current_user, verify_jwt_in_request
from flask_jwt_extended.exceptions import NoAuthorizationError

from models.volcon_db import User

# @check_access decorator function
def check_access(roles = []):
    def decorator(f):
        @wraps(f)
        def decorator_function(*args, **kwargs):
            # calling @jwt_required()
            verify_jwt_in_request()
            # fetching current user from db
            current_user: User = get_current_user()
            # checking user role
            if current_user.role not in roles:
                raise NoAuthorizationError("Role is not allowed.")
            return f(*args, **kwargs)
        return decorator_function
    return decorator