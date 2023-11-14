import os

from flask import Flask, request, jsonify, render_template, redirect, url_for, send_from_directory, Blueprint
from database.mongo_repo import datapipelineDB
from models.datapipeline import Datapipeline

datapipeline = Blueprint("datapipeline", __name__)

@datapipeline.route('/datapipeline',methods=['GET'])
def get_all_datapipelines():
    data = datapipelineDB.find()

    allData = []
    for d in data:
        allData.append({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']})

    return jsonify(allData), 201

@datapipeline.route('/datapipeline/<id>',methods=['GET'])
def get_datapipeline(id):
    d = datapipelineDB.find_one({"uuid": id})
    return jsonify({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']})


@datapipeline.route('/datapipeline/<id>',methods=['POST'])
def update_datapipeline_by_id(id):
    data = request.json
    if 'name' not in data or 'config' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    datapipelineDB.update_one({"uuid": id}, {'$set': { 'name':data['name'], 'config': data['config'] }})

    d = datapipelineDB.find_one({"uuid": id})
    return jsonify({'uuid': d['uuid'], 'name': d['name'], 'config': d['config']})


@datapipeline.route('/datapipeline/new',methods=['POST'])
def create_datapipeline():
    data = request.json

    if 'name' not in data or 'config' not in data:
        return jsonify({'error': 'Missing id or name in request'}), 400

    # Filters all unnecessary data from json
    datapipeline = Datapipeline(data['name'], data['config'])
    datapipelineDB.insert_one(datapipeline.to_json())

    return jsonify({'message': 'Entity created successfully'}), 201
