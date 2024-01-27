from flask import request, jsonify, Blueprint

from database.mongo_repo import datapipelineDB
from database.models.datapipeline import Datapipeline
from services.auth_service import secure

datapipeline = Blueprint("datapipeline", __name__, template_folder='templates')

@datapipeline.route('/datapipeline', methods=['GET'])
@secure
def get_all_datapipelines():
    data = datapipelineDB.find()

    allData = []
    for d in data:
        allData.append({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']})

    return jsonify(allData), 201

@datapipeline.route('/datapipeline/<id>', methods=['GET'])
@secure
def get_datapipeline(id):
    d = datapipelineDB.find_one({"uuid": id})
    if d:
        return jsonify({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']}), 201
    else:
        return jsonify({'error': 'Entity not found'}), 400


@datapipeline.route('/datapipeline/<id>',methods=['POST'])
@secure
def update_datapipeline_by_id(id):
    data = request.json
    if 'name' not in data or 'config' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    datapipelineDB.update_one({"uuid": id}, {'$set': { 'name':data['name'], 'config': data['config'] }})

    d = datapipelineDB.find_one({"uuid": id})
    if d:
        return jsonify({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']}), 201
    else:
        return jsonify({'error': 'Entity not found'}), 400




@datapipeline.route('/datapipeline/new',methods=['POST'])
@secure
def create_datapipeline():
    data = request.json

    if 'name' not in data or 'config' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    # Filters all unnecessary data frpipom json
    datapipeline = Datapipeline(data['name'], data['config'])
    datapipelineDB.insert_one(datapipeline.to_json())

    return jsonify({'message': 'Entity created successfully'}), 201


@datapipeline.route('/datapipeline/<id>',methods=['DELETE'])
@secure
def delete_datapipeline(id):

    result = datapipelineDB.delete_one({"uuid": id})

    if result.deleted_count > 0:
        return jsonify({'message': 'Sucessfully deleted'}), 201
    else:
        return jsonify({'error': 'Entity not found'}), 400
