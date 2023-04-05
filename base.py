from flask import Flask
from backend.models.volcon_db import db, User, TokenBlocklist
from backend.volcon.auth.Controller import AuthController
from backend.volcon.missions.Controller import MissionController
from backend.volcon.applications.Controller import AppController
from backend.volcon.org.org_routes import org_bp
from datetime import timedelta, datetime, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    JWTManager
from os import environ
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IlZvbHVudGVlckNvbm5lY3QiLCJleHAiOjE2NzkzMTExNzgsImlhdCI6MTY3OTMxMTE3OH0.bj5LJGeR2mT3vs3iIGkW7BnnxEyF9s5tp_5SaUKf4mQ"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

# Connecting to xampp mysql engine using database URI
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/volcon_db_test'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:ocRnOeq9tX9NX6dFB4zl@containers-us-west-78.railway.app:6177/railway?charset=utf8mb4'
# We're not using flask_sqlalchemy event system -
# we can remove the warning using the statement below
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.app_context().push()

db.init_app(app)
app.register_blueprint(AuthController)
app.register_blueprint(MissionController)
app.register_blueprint(AppController)
app.register_blueprint(org_bp)

# here define callback function which returns current user model


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    """ callback for fetching authenticated user from db """
    identity = jwt_data["sub"]
    return User.query.filter_by(email=identity).one_or_none()

# Callback function to check if a JWT exists in the database blocklist


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    try:
        token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    except:
        db.session.rollback()
        raise
    return token is not None


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

db.create_all()