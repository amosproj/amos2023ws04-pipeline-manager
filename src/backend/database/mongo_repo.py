from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    host=os.getenv("MONGODB_URL"),
    port=int(os.getenv("MONGODB_PORT")),
    username=os.getenv("MONGODB_USER"),
    password=os.getenv("MONGODB_PASSWORD"),
    authSource="admin",
)

db = client["dpms_db"]
user = db["user"]
fileWPDB = db["fileWP"]
datapipelineDB = db["datapipeline"]
metadataDB = db["metadata"]

db = client['dpms_db']
user = db['user']
fileWPDB = db['fileWP']
datapipelineDB = db['datapipeline']
s3filename = db['S3FileNames']
