"""An Implementation of the Project's Database"""


from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from flask_jwt_extended import get_current_user
from mixin.serializer import SerializerMixin
from ast import literal_eval

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    """Defines the User Table on the Database"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_no = db.Column(db.String(20), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    role = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    biography = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': role
    }

    def updateImage(self, imgPath):
        self.image = imgPath
        db.session.commit()


class Volunteer(User):
    """Defines the Volunteers table; which is a Child Table of the User Table"""
    __tablename__ = 'volunteers'

    serialize_rules = ('-missions', '-password',)

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    resume = db.Column(db.String(255), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    applications = db.relationship('Application')

    __mapper_args__ = {
        'polymorphic_identity': 'volunteer'
    }

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

    def destroyResume(self, id):
        vol = self.query.get(id)
        if vol:
            vol.resume = None
            db.session.commit()
        return vol

    def updateResume(self, id, resume):
        vol = self.query.get(id)
        if vol:
            vol.resume = resume
            db.session.commit()
        return vol


class Organization(User):
    """Defines the Organization Table; which is a Child Table of the User Table"""

    __tablename__ = 'organizations'

    serialize_rules = ('-missions.organization', '-password',)

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    location = db.Column(db.String(255), nullable=True)
    missions = db.relationship('Mission', backref='organization')

    __mapper_args__ = {
        'polymorphic_identity': 'organization'
    }

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)


class Requirement(db.Model, SerializerMixin):
    """"""
    __tablename__ = "requirements"

    id = db.Column(db.Integer, primary_key=True)
    mission_id = db.Column(db.Integer, db.ForeignKey(
        'missions.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)


class Mission(db.Model, SerializerMixin):
    """Defines the Mission Table; Which is a Child Table for the User Table
    `Missions` table has a 1:Many Relationship with the Application table"""

    __tablename__ = 'missions'

    serialize_rules = ('-requirements.mission',)

    id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.Integer, db.ForeignKey(
        'organizations.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    max_people = db.Column(db.Integer, nullable=False)
    estTime = db.Column(db.String(255), nullable=False)
    volunteeringHours = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(255), nullable=False)  # Country, City
    deadline = db.Column(db.Date, nullable=False)
    volunteeringLocation = db.Column(
        db.String(255), nullable=False)  # On Site / Remote
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)
    requirements = db.relationship('Requirement', backref='mission')

    def getMyMissions(self):
        user: User = get_current_user()
        missions: list[self] = self.query.filter_by(org_id=user.id).all()
        return missions

    def filter(self, query, orgs, applicants, location, volunteerLocation):
        missions: list[self] = self.query.order_by('updated_at')
        _orgs = literal_eval(orgs) if orgs else []
        _volLoc = literal_eval(volunteerLocation) if volunteerLocation else []
        if query:
            missions = missions.filter(Mission.name.like('%'+query+'%'))
        if applicants and int(applicants) > 0:
            if int(applicants) == 1:
                missions = missions.filter(Mission.max_people <= 5)
            if int(applicants) == 2:
                missions = missions.filter(
                    Mission.max_people > 5, Mission.max_people < 20)
            if int(applicants) == 3:
                missions = missions.filter(
                    Mission.max_people >= 20, Mission.max_people < 50)
            if int(applicants) == 4:
                missions = missions.filter(
                    Mission.max_people >= 50, Mission.max_people < 100)
            if int(applicants) == 5:
                missions = missions.filter(Mission.max_people >= 100)
        if _orgs and len(_orgs) > 0:
            missions = missions.filter(Mission.org_id.in_(tuple(orgs)))
        if location and len(location) > 0:
            missions = missions.filter_by(location=location)
        if _volLoc and len(_volLoc) > 0:
            missions = missions.filter(
                Mission.volunteeringLocation.in_(tuple(volunteerLocation)))
        return missions.all()


class Application(db.Model, SerializerMixin):
    """Defines the Application Table;
    which has a 1:1 relationship with the `Missions` Table;
    """

    __tablename__ = 'applications'

    serialize_rules = ('-mission.requirements',
                       '-mission.organization.missions',
                       '-user.applications',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'volunteers.id'), nullable=False)
    mission_id = db.Column(db.Integer, db.ForeignKey(
        'missions.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)
    status = db.Column(db.Boolean, nullable=True)
    mission = db.relationship('Mission')
    user = db.relationship('Volunteer')


# This could be expanded to fit the needs of the application. For example,
# it could track who revoked a JWT, when a token expires, notes for why a
# JWT was revoked, an endpoint to un-revoke a JWT, etc.
# Making jti an index can significantly speed up the search when there are
# tens of thousands of records. Remember this query will happen for every
# (protected) request
class TokenBlocklist(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    type = db.Column(db.String(16), nullable=False)
    user_id = db.Column(
        db.ForeignKey('users.id'),
        default=lambda: get_current_user().id,
        nullable=False,
    )
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
