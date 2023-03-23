from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.volcon_db import db, Requirement

class RequirementModel:
    def Create(self, mission_id, requirements):
        """Create Requirement"""
        try:
            _requirements = []
            for i in requirements:
                _requirements.append(Requirement(
                    mission_id=mission_id,
                    name=requirements[i]
                ))

            db.session.bulk_save_objects(_requirements)
            db.session.commit()
            return _requirements
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return error, 500

    def Destroy(self, mission_id):
        """Destroy all requirements based mission r/n ship"""
        try:
            requirements = Requirement.__tablename__.delete().where(Requirement.mission_id == mission_id)
            db.session.execute(requirements)
            db.session.commit()
            return
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return error, 500

    def getAllRequirements(self, mission_id):
        try:
            requirements = Requirement.query.filter_by(id=mission_id).all()
            return requirements
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return error, 500

    def Update(self, mission_id, requirements):
        """Update Requirement"""
        try:
            requirements = self.getAllRequirements(mission_id)
            if requirements.count > 0:
                self.Destroy(mission_id)
            self.Create(mission_id, requirements)
            return jsonify({'message': 'Mission updated successfully'})
        except SQLAlchemyError as e:
            error = str(e.__dict__.get('orig', e))
            return jsonify({'error': error}), 500