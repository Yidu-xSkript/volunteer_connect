from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from backend.models.volcon_db import db, Volunteer
import uuid


class vol_CRUDS:
    """
    A Class That Defined all API CRUD Methods
    For All Volunteer Objects
    """

    def __init__(self):
        pass

    def get_all_vols(self):
        """Retrieves a Jsonified Object of all Volunteers"""
        try:
            vols = Volunteer.query.all()
            return [vol.to_dict() for vol in vols]
        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500

    def get_vol(self, user_id):
        """Retrieving a Single Volunteer by ID"""
        try:
            vol = Volunteer.query.filter_by(id=user_id).first()
            if vol:
                return vol.to_dict()
            else:
                return jsonify({'error': f'Volunteer with ID {user_id} not found.'}), 404
        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500

    def create_vol(self):
        """Creating a New Volunteer"""
        try:
            data = request.get_json()
            vol_id = str(uuid.uuid4()) # Generating a Unique vol_id
            vol = Volunteer(volunteer_id=vol_id, full_name=data['full_name'], age=data['age'], email=data['email'], phone_no=data['phone_no'], password=data['password'], profile_pic=data.get('profile_pic'))
            db.session.add(vol)
            db.session.commit()
            return jsonify(vol.to_dict()), 201
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def update_vol(self, vol_id):
        """Updating Details of an Existing Volunteer"""
        try:
            data = request.get_json()
            vol: Volunteer = Volunteer.query.get(vol_id)
            vol.name = data.get('name', vol.name)
            vol.phone_no = data.get('phone_no', vol.phone_no)
            vol.image = data.get('image', vol.image)
            vol.resume = data.get('resume', vol.resume)
            vol.biography = data.get('bio', vol.biography)
            db.session.commit()
            return vol.to_dict(), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def delete_vol(self, vol_id):
        """Deleting an Existing Volunteer"""
        try:
            vol = Volunteer.query.filter_by(volunteer_id=vol_id).first()
            if not vol:
                return jsonify({'error': f'Volunteer with ID {vol_id} not found.'}), 404
            db.session.delete(vol)
            db.session.commit()
            return jsonify({'message': f'Volunteer with ID {vol_id} deleted successfully.'}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
