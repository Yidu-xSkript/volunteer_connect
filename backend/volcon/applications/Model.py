"""Implementation of API CRUD Operations for the Applications Class"""


from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.volcon_db import db, Application, Volunteer, User
from flask_jwt_extended import get_current_user

class ApplicationModel:
    @staticmethod
    def Create(user_id, mission_id):
        try:
            data = request.get_json()
            volunteer: Volunteer = Volunteer.query.get(user_id)
            if volunteer.resume is None and data.get("resume"):
                volunteer.updateResume(user_id, data.get("resume", volunteer.resume))
            if volunteer.resume is None:
                return jsonify({'error': 'Resume Not Found! Please add your resume!'}), 404
            application = Application(
                user_id=user_id,
                mission_id=mission_id
            )
            db.session.add(application)
            db.session.commit()
            return volunteer.to_dict()
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def getAllForUser(self, role):
        try:
            user: User = get_current_user()
            if role == 'volunteer':
                applications: Application = Application.query.filter_by(
                    user_id=user.id).all()
            if role == 'organization':
                applications: Application = Application.query.join(
                    Application.mission).filter_by(org_id=user.id).all()
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

    def Update(self, id):
        try:
            data = request.get_json()
            application: Application = Application.query.get(id)
            if application:
                application.status = data.get('status', application.status)
                db.session.commit()
                return self.getAllForUser("organization")
            else:
                return jsonify({'error': 'Application not found'}), 404
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def Destroy(self, mission_id):
        """Destroy all applications based mission r/n ship"""
        try:
            apps = Application.__table__.delete().where(Application.mission_id == mission_id)
            db.session.execute(apps)
            db.session.commit()
            return
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return error, 500
