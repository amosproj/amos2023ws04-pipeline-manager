from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()
client = MongoClient(host=os.getenv('MONGODB_URL'), port=int(os.getenv('MONGODB_PORT')))

db = client.flask_db
user = db.user
fileWPDB = db.fileWP
datapipelineDB = db.datapipeline
