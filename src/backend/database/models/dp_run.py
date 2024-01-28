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
        self.created_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.state = "PENDING"
        self.start_by_user = "user1"

    def to_json(self):
        return {
            "executionId": self.executionId,
            "datapipelineId": self.datapipelineId,
            "fileId": self.fileId,
            "result": self.result,
            # "created_date": self.created_date,
            "state": self.state,
            # "start_by_user": self.start_by_user,
        }
