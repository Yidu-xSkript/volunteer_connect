from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from volcon_db import db, Mission

class mission_CRUDS:
    @staticmethod
    def create_mission(org_id):
        try:
            data = request.get_json()
            mission = Mission(
                org_id=org_id,
                name=data['name'],
                description=data['description'],
                location=data['location'],
                start_date=data['start_date'],
                end_date=data['end_date']
            )
            db.session.add(mission)
            db.session.commit()
            return jsonify({'message': 'Mission created successfully'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def get_all_missions():
        try:
            missions = Mission.query.all()
            return jsonify([mission.serialize() for mission in missions])
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def get_mission_by_id(mission_id):
        try:
            mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                return jsonify(mission.serialize())
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def update_mission(mission_id):
        try:
            data = request.get_json()
            mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                mission.name = data.get('name', mission.name)
                mission.description = data.get('description', mission.description)
                mission.location = data.get('location', mission.location)
                mission.start_date = data.get('start_date', mission.start_date)
                mission.end_date = data.get('end_date', mission.end_date)
                db.session.commit()
                return jsonify({'message': 'Mission updated successfully'})
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500

    @staticmethod
    def delete_mission(mission_id):
        try:
            mission = Mission.query.filter_by(id=mission_id).first()
            if mission:
                db.session.delete(mission)
                db.session.commit()
                return jsonify({'message': 'Mission deleted successfully'})
            else:
                return jsonify({'message': 'Mission not found'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500