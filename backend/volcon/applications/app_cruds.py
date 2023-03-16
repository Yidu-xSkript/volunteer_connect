"""Implementation of API CRUD Operations for the Applications Class"""


from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from volcon_db import db, Applications


class application_cruds:
    @staticmethod
    def create_application():
        try:
            data = request.get_json()
            application = Applications(
                volunteer_id=data['volunteer_id'],
                mission_id=data['mission_id'],
                status=data['status']
            )
            db.session.add(application)
            db.session.commit()
            return jsonify({'message': 'Application created successfully'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def get_all_applications():
        try:
            applications = Applications.query.all()
            return jsonify([application.serialize() for application in applications])
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def get_application(application_id):
        try:
            application = Applications.query.get(application_id)
            if application:
                return jsonify(application.serialize())
            else:
                return jsonify({'error': 'Application not found'}), 404
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def update_application(application_id):
        try:
            data = request.get_json()
            application = Applications.query.get(application_id)
            if application:
                application.volunteer_id = data.get('volunteer_id', application.volunteer_id)
                application.mission_id = data.get('mission_id', application.mission_id)
                application.status = data.get('status', application.status)
                db.session.commit()
                return jsonify({'message': 'Application updated successfully'})
            else:
                return jsonify({'error': 'Application not found'}), 404
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def delete_application(application_id):
        try:
            application = Applications.query.get(application_id)
            if application:
                db.session.delete(application)
                db.session.commit()
                return jsonify({'message': 'Application deleted successfully'})
            else:
                return jsonify({'error': 'Application not found'}), 404
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500