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

