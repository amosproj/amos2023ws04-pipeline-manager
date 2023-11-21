from flask import request, jsonify, Blueprint
from database.mongo_repo import fileWPDB
from database.models.fileWP import FileWP

fileWP = Blueprint("fileWP", __name__)

@fileWP.route('/fileWP',methods=['GET'])
def get_all_fileWPs():
    data = fileWPDB.find()

    allData = []
    for d in data:
        allData.append({'uuid': d['uuid'], 'name': d['name'], 'datapipelineId': d['datapipelineId']})

    return jsonify(allData), 201

@fileWP.route('/fileWP/<id>',methods=['GET'])
def get_fileWP(id):
    d = fileWPDB.find_one({"uuid": id})
    if d:
        return jsonify({'uuid': d['uuid'], 'name': d['name'], 'datapipelineId': d['datapipelineId']})
    else:
        return jsonify({'error': 'Entity not found'}), 400

@fileWP.route('/fileWP/<id>',methods=['POST'])
def update_fileWP_by_id(id):
    data = request.json
    if 'name' not in data or 'config' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    fileWPDB.update_one({"uuid": id}, {'$set': { 'name':data['name'], 'datapipelineId': data['datapipelineId'] }})

    d = fileWPDB.find_one({"uuid": id})
    if d:
        return jsonify({'uuid': d['uuid'], 'name': d['name'], 'datapipelineId': d['datapipelineId']})
    else:
        return jsonify({'error': 'Entity not found'}), 400


@fileWP.route('/fileWP/new',methods=['POST'])
def create_fileWP():
    data = request.json

    if 'name' not in data or 'datapipelineId' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    # Filters all unnecessary data from json
    fileWP = FileWP(data['name'], data['datapipelineId'])
    fileWPDB.insert_one(fileWP.to_json())

    return jsonify({'message': 'Entity created successfully'}), 201


@fileWP.route('/fileWP/<id>',methods=['DELETE'])
def delete_fileWP(id):

    result = fileWPDB.delete_one({"uuid": id})

    if result.deleted_count > 0:
        return jsonify({'message': 'Sucessfully deleted'}), 201
    else:
        return jsonify({'error': 'Entity not found'}), 400