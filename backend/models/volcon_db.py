"""An Implementation of the Project's Database"""


from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from flask_jwt_extended import get_current_user
from models.serializer import SerializerMixin

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

    serialize_rules = ('-missions','-password',)

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    resume = db.Column(db.String(255), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    # applications = db.relationship('Application')

    __mapper_args__ = {
        'polymorphic_identity': 'volunteer'
    }

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)


class Organization(User):
    """Defines the Organization Table; which is a Child Table of the User Table"""

    __tablename__ = 'organizations'

    serialize_rules = ('-missions.organization','-password',)

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    location = db.Column(db.String(255), nullable=True)
    missions = db.relationship('Mission')

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


class Application(db.Model, SerializerMixin):
    """Defines the Application Table;
    which has a 1:1 relationship with the `Missions` Table;
    """

    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'volunteers.id'), nullable=False)
    mission_id = db.Column(db.Integer, db.ForeignKey(
        'missions.id'), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)
    status = db.Column(db.Boolean, nullable=True)
    mission = db.relationship('Mission')


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
