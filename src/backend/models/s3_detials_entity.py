
class S3ObjectDetails:
    def __init__(self, key, last_modified, size, content_type, etag, storage_class):
        self.key = key
        self.last_modified = last_modified
        self.size = size
        self.content_type = content_type
        self.etag = etag
        self.storage_class = storage_class

    def to_dict(self):
        return {
            "key": self.key,
            "last_modified": self.last_modified,
            "size": self.size,
            "content_type": self.content_type,
            "etag": self.etag,
            "storage_class": self.storage_class
        }
