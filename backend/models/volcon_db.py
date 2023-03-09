"""An Implementation of the Project's Database"""


from datetime import datetime
from flask_sqlalchemy import SQLAlchemy



db = SQLAlchemy()


class User(db.Model):
    """Defines the User Table on the Database"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_no = db.Column(db.String(20), nullable=False)
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

    volunteer_id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    profile_pic = db.Column(db.LargeBinary(), nullable=True)

    __mapper_args__ = {
        'polymorphic_identity': 'volunteer'
    }

class Organization(User):
    """Defines the Organization Table; which is a Child Table of the User Table"""

    __tablename__ = 'organizations'

    org_id = db.Column(db.Integer, primary_key=True)
    org_name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.Text, nullable=True)
    profile_logo = db.Column(db.LargeBinary(), nullable=True)

    __mapper_args__ = {
        'polymorphic_identity': 'organization'
    }

class Mission(db.Model):
    """Defines the Mission Table; Which is a Child Table for the User Table
    `Missions` table has a 1:Many Relationship with the Application table"""

    __tablename__ = 'missions'

    mission_id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.org_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    max_people = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Application(db.Model):
    """Defines the Application Table; 
    which has a 1:1 relationship with the `Missions` Table;
    """

    __tablename__ = 'applications'

    application_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('volunteers.user_id'), nullable=False)
    mission_id = db.Column(db.Integer, db.ForeignKey('missions.mission_id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    status = db.Column(db.Boolean, nullable=True)

    mission = db.relationship('Mission', backref='applications')
    volunteer = db.relationship('Volunteer', backref='applications')
