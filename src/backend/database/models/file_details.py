import uuid
from datetime import datetime


class FileDetails:
    def __init__(self, name, mime_type, size, s3_uuid, content_type, storage_class, last_modified):
        self.uuid = str(uuid.uuid4())
        self.name = name
        self.mime_type = mime_type
        self.size = size
        self.s3_uuid = s3_uuid
        self.content_type = content_type
        self.storage_class = storage_class
        self.last_modified = last_modified
        self.created_at = datetime.now()

    def to_json(self):
        return {
            'uuid': self.uuid,
            'name': self.name,
            'mime_type': self.mime_type,
            'size': self.size,
            's3_uuid': self.s3_uuid,
            'content_type': self.content_type,
            'storage_class': self.storage_class,
            'last_modified': self.last_modified,
            'created_at': self.created_at,
        }
