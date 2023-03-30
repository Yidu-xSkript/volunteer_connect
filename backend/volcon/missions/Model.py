from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from backend.models.volcon_db import db, Mission, User
from backend.volcon.requirement.Model import RequirementModel
from backend.volcon.applications.Model import ApplicationModel

requirementModel = RequirementModel()
mission = Mission()
applicationModel = ApplicationModel()


class MissionModel:

    # get missions with relationship
    @staticmethod
    def get_all_missions():
        try:
            # Implement Filter
            organizations = request.args.get('organizations')
            location = request.args.get('location')
            volunteerLocation = request.args.get('volunteerLocation')
            applicants = request.args.get('applicants')

            query = request.args.get("query")
            missions: list[Mission] = mission.filter(
                query, organizations, applicants, location, volunteerLocation)

            return [mission.to_dict() for mission in missions]
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def getOrgMissions(self):
        try:
            # Implement Filter
            missions: list[Mission] = mission.getMyMissions()
            return [mission.to_dict() for mission in missions]
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def Create(self, org_id):
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
            missions: list[Mission] = Mission.query.all()
            return jsonify({'org_missions': self.getOrgMissions(), 'missions': [mission.to_dict() for mission in missions]})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    # get missions with relationship
    @staticmethod
    def get_mission_by_id(mission_id):
        try:
            mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                return mission.to_dict()
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def Update(self, mission_id):
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
                missions: list[Mission] = Mission.query.all()
                return jsonify({'org_missions': self.getOrgMissions(), 'missions': [mission.to_dict() for mission in missions]})
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    def Destroy(self, mission_id):
        try:
            mission = Mission.query.filter_by(id=mission_id).one_or_none()
            if mission:
                requirementModel.Destroy(mission_id=mission_id)
                applicationModel.Destroy(mission_id=mission_id)
                db.session.delete(mission)
                db.session.commit()
                missions: list[Mission] = Mission.query.all()
                return jsonify({'org_missions': self.getOrgMissions(), 'missions': [mission.to_dict() for mission in missions]})
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500
