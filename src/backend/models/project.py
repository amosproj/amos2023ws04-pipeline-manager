import uuid


# that represents a project instance
class Project:

        datapipelineId = None
        s3BucketId = None
        def __init__(self, datapipelineId, s3BucketId):

            self.datapipelineId = datapipelineId
            self.s3BucketId = s3BucketId

        def to_json(self):
            return {
                'datapipelineId': self.datapipelineId,
                's3BucketId': self.s3BucketId,
            }