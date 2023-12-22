from flask import Blueprint, jsonify

misc = Blueprint("misc", __name__, template_folder="templates")

@misc.route("/ping", methods=["POST"])
def ping():
    return jsonify({"message": "Ping successfully"})