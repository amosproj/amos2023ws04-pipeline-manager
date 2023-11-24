import uuid
from database.mongo_repo import fileWPDB
from flask import jsonify

# represents a file work process
class FileWP:
    fileIds = []

    def __init__(self, name, datapipelineId):
        self.uuid = str(uuid.uuid4())
        self.name = name
        self.datapipelineId = datapipelineId

    def addFile(self, fileId):
        # add file to object
        self.fileIds.append(fileId)
        # add file to db
        result = fileWPDB.update_one({'uuid': self.uuid}, {'$set': {'fileIds': jsonify(self.fileIds)}})

        return result

    def to_json(self):
        return {
            'uuid': str(self.uuid),
            'name': self.name,
            'datapipelineId': self.datapipelineId,
            'fileIds': self.fileIds,
        }
