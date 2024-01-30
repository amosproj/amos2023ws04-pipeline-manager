import uuid
from datetime import datetime

# Datapipeline State
# PENDING
# QUEUED
# FINISHED
# FAILED


class DatapipelineRun:
    def __init__(
        self,
        datapipelineId,
        fileId,
    ):
        self.executionId = str(uuid.uuid4())
        self.datapipelineId = datapipelineId
        self.fileId = fileId
        self.result = []
        self.create_date = datetime.now()
        self.state = "PENDING"
        # TODO get a user from some source
        self.user = "No user"

    def to_json(self):
        return {
            "executionId": self.executionId,
            "datapipelineId": self.datapipelineId,
            "fileId": self.fileId,
            "result": self.result,
            "create_date": self.create_date,
            "state": self.state,
            "user": self.user,
        }
