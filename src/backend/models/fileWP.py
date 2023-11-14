import uuid


# that represents a file work process
class FileWP:

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