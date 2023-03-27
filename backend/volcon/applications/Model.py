"""Implementation of API CRUD Operations for the Applications Class"""


from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.volcon_db import db, Application


class ApplicationModel:
    @staticmethod
    def Create(user_id, mission_id):
        try:
            application = Application(
                user_id=user_id,
                mission_id=mission_id
            )
            db.session.add(application)
            db.session.commit()
            return application.to_dict()
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def getAllForUser(user_id, role):
        try:
            if role == 'volunteer':
                applications: Application = Application.query.filter_by(
                    user_id=user_id).all()
            if role == 'organization':
                applications: Application = Application.query.join(
                    Application.mission, aliased=True).filter_by(org_id=user_id).all()
            return [application.to_dict() for application in applications]
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    # @staticmethod
    # def get_application(application_id):
    #     try:
    #         application = Application.query.get(application_id)
    #         if application:
    #             return jsonify(application.serialize())
    #         else:
    #             return jsonify({'error': 'Application not found'}), 404
    #     except SQLAlchemyError as e:
    #         error = str(e.__dict__.get('orig', e))
    #         return jsonify({'error': error}), 500

    @staticmethod
    def Update(id):
        try:
            data = request.get_json()
            application: Application = Application.query.get(id)
            if application:
                application.status = data.get('status', application.status)
                db.session.commit()
                return application.to_dict()
            else:
                return jsonify({'error': 'Application not found'}), 404
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    # @staticmethod
    # def Destroy(application_id):
    #     try:
    #         application = Application.query.get(application_id)
    #         if application:
    #             db.session.delete(application)
    #             db.session.commit()
    #             return jsonify({'message': 'Application deleted successfully'})
    #         else:
    #             return jsonify({'error': 'Application not found'}), 404
    #     except SQLAlchemyError as e:
    #         error = str(e.__dict__.get('orig', e))
    #         return jsonify({'error': error}), 500
