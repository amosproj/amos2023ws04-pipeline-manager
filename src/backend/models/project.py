
# that represents a project instance
class Project:

        datapipeline = None
        s3Bucket = None
        def __init__(self, datapipeline, s3Bucket):
            self.datapipeline = datapipeline
            self.s3Bucket = s3Bucket

