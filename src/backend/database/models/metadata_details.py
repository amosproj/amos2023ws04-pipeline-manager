class MetadataDetails:
    def __init__(
        self,
        datapipelineId,
        s3bucketfileId,
        result,
        create_date,
        state,
        file_type,
        file_size,
    ):
        self.datapipelineId = datapipelineId
        self.s3bucketfileId = s3bucketfileId
        self.result = result
        self.create_date = create_date
        self.state = str(state)
        self.file_type = file_type
        self.file_size = file_size

    def to_json(self):
        return {
            "datapipelineId": self.datapipelineId,
            "s3bucketfileId": self.s3bucketfileId,
            "result": self.result,
            "create_date": self.create_date,
            "state": str(self.state),
            "file_type": self.file_type,
            "file_size": self.file_size,
        }
