import uuid

# represents an apache airflow pipeline
class Datapipeline:

    def __init__(self, name, config):
        self.uuid = str(uuid.uuid4())
        self.name = name
        self.config = config

    def to_json(self):
        return {
            'uuid': str(self.uuid),
            'name': self.name,
            'config': self.config,
        }
