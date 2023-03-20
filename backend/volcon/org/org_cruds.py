"""Implementations of CRUD OPS in API for `Organization` Objects"""


from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.volcon_db import db, Organization

class org_CRUDS:
    def __init__(self):
        pass

    def get_all_orgs(self):
        """Retrieves a Jsonified Object of all Organizations"""
        try:
            orgs = Organization.query.all()
            return jsonify([org.to_dict() for org in orgs])
        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500

    def get_org(self, org_id):
        """Retrieving a Single Volunteer by ID"""
        try:
            org = Organization.query.filter_by(org_id=org_id).first()
            if org:
                return jsonify(org.to_dict())
            else:
                return jsonify({'error': f'Organization with ID {org_id} not found.'}), 404
        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500

    def create_org(self):
        """Creating a New Organization"""
        try:
            data = request.get_json()
            org = Organization(org_name=data['org_name'],
                               location=data['location'],
                               biography=data.get('biography'),
                               profile_logo=data.get('profile_logo'),
                               org_id=str(uuid.uuid4()))
            db.session.add(org)
            db.session.commit()
            return jsonify(org.to_dict()), 201
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def update_org(self, org_id):
        """Updating Details of an Existing Organization"""
        try:
            data = request.get_json()
            org = Organization.query.filter_by(org_id=org_id).first()
            if org:
                org.org_name = data.get('org_name', org.org_name)
                org.location = data.get('location', org.location)
                org.biography = data.get('biography', org.biography)
                org.profile_logo = data.get('profile_logo', org.profile_logo)
                db.session.commit()
                return jsonify(org.to_dict())
            else:
                return jsonify({'error': f'Organization with ID {org_id} not found.'}), 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def delete_org(self, org_id):
        """Deleting an Organization by the Organization ID"""
        try:
            org = Organization.query.filter_by(org_id=org_id).first()
            if org:
                db.session.delete(org)
                db.session.commit()
                return jsonify({'message': f'Organization with ID {org_id} deleted.'})
            else:
                return jsonify({'error': f'Organization with ID {org_id} not found.'}), 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500