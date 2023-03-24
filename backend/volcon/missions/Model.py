from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.volcon_db import db, Mission
from volcon.requirement.Model import RequirementModel

requirementModel = RequirementModel()

class MissionModel:
    @staticmethod
    def Create(org_id):
        try:
            data = request.get_json()
            mission: Mission = Mission(
                org_id=org_id,
                name=data['name'],
                description=data['description'],
                location=data['location'],
                max_people=data['applicants'],
                estTime=data['estTime'],
                volunteeringHours=data['volunteeringHours'],
                volunteeringLocation=data['volunteeringLocation'],
                deadline=data['deadline'],
            )
            db.session.add(mission)
            db.session.commit()
            requirementModel.Create(
                mission_id=mission.id, requirements=data['requirements'])
            return mission.to_dict()
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    # get missions with relationship
    @staticmethod
    def get_all_missions():
        try:
            missions: Mission = Mission.query.join(RequirementModel).all()
            return [mission.to_dict() for mission in missions]
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    # get missions with relationship
    @staticmethod
    def get_mission_by_id(mission_id):
        try:
            mission = Mission.query.filter_by(
                id=mission_id).join(RequirementModel).first()
            if mission:
                return mission.to_dict()
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def Update(mission_id):
        try:
            data = request.get_json()
            mission: Mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                mission.name = data.get('name', mission.name)
                mission.description = data.get(
                    'description', mission.description)
                mission.location = data.get('location', mission.location)
                mission.deadline = data.get('deadline', mission.deadline)
                mission.max_people = data.get('applicants', mission.max_people)
                mission.estTime = data.get('estTime', mission.estTime)
                mission.volunteeringHours = data.get(
                    'volunteeringHours', mission.volunteeringHours)
                mission.volunteeringLocation = data.get(
                    'volunteeringLocation', mission.volunteeringLocation)
                db.session.commit()
                requirementModel.Update(
                    mission_id=mission_id, requirements=data['requirements'])
                return mission.to_dict()
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def Destroy(mission_id):
        try:
            mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                requirementModel.Destroy(mission_id=mission_id)
                db.session.delete(mission)
                db.session.commit()
                return jsonify({'message': 'Mission deleted successfully'})
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500
