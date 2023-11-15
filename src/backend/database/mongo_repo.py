from pymongo import MongoClient
import os

client = MongoClient('localhost', 27017,username='admin', 
                         password='pass',
                        authSource="admin")
# client = MongoClient(os.getenv(MONGODB_URL), os.getenv(MONGODB_PORT))

db = client.flask_db
user = db.user
fileWPDB = db.fileWP
datapipelineDB = db.datapipeline
