
class S3ObjectDetails:
    def __init__(self, key, last_modified, size, content_type, storage_class,original_file_name):
        self.key = key
        self.last_modified = last_modified
        self.size = size
        self.content_type = content_type

        self.storage_class = storage_class
        self.original_file_name = original_file_name

    def to_json(self):
        return {
            "key": self.key,
            "last_modified": self.last_modified,
            "size": self.size,
            "content_type": self.content_type,

            "storage_class": self.storage_class,
            "original_file_name":self.original_file_name
        }

    def to_dict(self):
        return {
            'key': self.key,
            'last_modified': self.last_modified,
            'size': self.size,
            'content_type': self.content_type,
            'storage_class': self.storage_class,
            'original_file_name': self.original_file_name
        }