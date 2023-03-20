"""An Implementation of the Project's Database"""


from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from flask_jwt_extended import get_current_user

db = SQLAlchemy()
class User(db.Model):
    """Defines the User Table on the Database"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_no = db.Column(db.String(20), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    role = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': role
    }

class Volunteer(User):
    """Defines the Volunteers table; which is a Child Table of the User Table"""

    __tablename__ = 'volunteers'

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    age = db.Column(db.Integer, nullable=True)

    __mapper_args__ = {
        'polymorphic_identity': 'volunteer'
    }

    def to_dict(self):
        """A Function to Convert Volunteer Object to Python Dict"""
        return {
            'id':self.id,
            'name': self.name,
            'age': self.age,
            'image': self.image,
            'email': self.email,
            'phone_no': self.phone_no,
            'role': self.role,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def serialize(self):
        return {
            'id':self.id,
            'age': self.age,
            'name': self.name,
            'image': self.image,
            'email': self.email,
            'phone_no': self.phone_no,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

class Organization(User):
    """Defines the Organization Table; which is a Child Table of the User Table"""

    __tablename__ = 'organizations'

    id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location = db.Column(db.String(255), nullable=True)
    biography = db.Column(db.Text, nullable=True)

    __mapper_args__ = {
        'polymorphic_identity': 'organization'
    }

    def to_dict(self):
        """Function to Convert entry data to a python dict"""
        return {
            'id': self.id,
            'org_name': self.name,
            'location': self.location,
            'biography': self.biography,
            'image': self.image,
            'email': self.email,
            'phone_no': self.phone_no,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def serialize(self):
        return {
            'id':self.id,
            'age': self.age,
            'name': self.name,
            'image': self.image,
            'email': self.email,
            'phone_no': self.phone_no,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

class Mission(db.Model):
    """Defines the Mission Table; Which is a Child Table for the User Table
    `Missions` table has a 1:Many Relationship with the Application table"""

    __tablename__ = 'missions'

    id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    max_people = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def serialize(self):
        return {
            'mission_id': self.mission_id,
            'org_id': self.org_id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat()
        }

class Application(db.Model):
    """Defines the Application Table;
    which has a 1:1 relationship with the `Missions` Table;
    """

    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('volunteers.id'), nullable=False)
    mission_id = db.Column(db.Integer, db.ForeignKey('missions.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    status = db.Column(db.Boolean, nullable=True)

    mission = db.relationship('Mission', backref='applications')
    volunteer = db.relationship('Volunteer', backref='applications')

    def serialize(self):
        return {
            'id': self.id,
            'org_id': self.org_id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat()
        }


# This could be expanded to fit the needs of your application. For example,
# it could track who revoked a JWT, when a token expires, notes for why a
# JWT was revoked, an endpoint to un-revoked a JWT, etc.
# Making jti an index can significantly speed up the search when there are
# tens of thousands of records. Remember this query will happen for every
# (protected) request,
# If your database supports a UUID type, this can be used for the jti column
# as well
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    type = db.Column(db.String(16), nullable=False)
    user_id = db.Column(
        db.ForeignKey('users.id'),
        default=lambda: get_current_user().id,
        nullable=False,
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)