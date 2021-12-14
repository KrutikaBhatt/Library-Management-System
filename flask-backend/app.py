from flask import Flask, request, json, Response,jsonify
import database
from pymongo import MongoClient


app = Flask(__name__)


@app.route('/')
def welcome_route():
    return Response(response=json.dumps({"Welcome": "Hello this is freppe dev assignment backend"}),
                        status=200, mimetype='application/json')


# Members route API begins here
@app.route('/members',methods=['GET'])
def get_members():
    print("Hello")
    resp = database.member_collection.find()
    print(list(resp))

    return Response(response=json.dumps(list(response)), status=200,
                    mimetype='application/json')


@app.route('/members',methods=['POST'])
def add_member():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide complete information"}),
                        status=400, mimetype='application/json')

    response = member_collection.insert_one(data)
    return Response(response=json.dumps({"Success":"Member have been added successfully!","response":response}), status=200,mimetype='application/json')


@app.route('/members', methods=['PUT'])     
def update_member():
    data = request.json
    if data is None or data == {} or 'ID' not in data:
        return Response(response=json.dumps({"Error": "Please provide complete information"}),
                        status=400, mimetype='application/json')

    response = member_collection.update_one({'_id':ObjectId(data)},{'$set':data})
    
    if response.modified_count>0:
        return Response(response=json.dumps({"Success":"Member have been updated successfully!","response":response}), status=200,mimetype='application/json')

    else:
        return Response(response=json.dumps({"Success":"There was an unexpecte error. Cannot update!","response":response}), status=200,mimetype='application/json')


@app.route('/members', methods=['DELETE'])   
def delete():
    data = request.json
    if data is None or data == {} or 'ID' not in data:
        return Response(response=json.dumps({"Error": "Please provide complete information"}),
                        status=400, mimetype='application/json')

    response = member_collection.delete_one({'_id':ObjectId(data['ID'])})

    return Response(response=json.dumps("Member deleted successfully"), status=200,
                    mimetype='application/json')


if __name__ == '__main__':
    app.run(port=8000)