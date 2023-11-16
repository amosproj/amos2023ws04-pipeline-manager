class TaskExecutionDetails:
    def __init__(self, execution_date, task_instance, task_log):
        self.execution_date = execution_date
        self.task_instance = task_instance
        self.task_log = task_log

    def to_json(self):
        return {
            'execution_date': str(self.task_log),
            'task_instance': self.task_log,
            'task_log': self.task_log,
        }
