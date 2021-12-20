from flask import Flask, request, json, Response,jsonify,send_file
from database import *
from pymongo import MongoClient
from books import book
from member import Member
from transactions import Transaction
import requests, datetime
import csv

app = Flask(__name__)
db = get_db()

@app.route('/')
def welcome_route():
    return Response(response=json.dumps({"Welcome": "Hello this is freppe dev assignment backend"}),
                        status=200, mimetype='application/json')


# Members route API begins here
@app.route('/members',methods=['GET'])
def get_members():
    try:
        print("Hello")
        resp = Member.objects()

        return Response(response=resp, status=200,mimetype='application/json')
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')


@app.route('/members',methods=['POST'])
async def add_member():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide complete information"}),
                        status=400, mimetype='application/json')

    member = Member(data)
    await member.save()

    transaction = Transaction({
        'type1':'add',
        'member':member._id,
        'message':'Member'+member.name+" was added to the library"
    })
    await transaction.save()

    return Response(response=json.dumps({"Success":"Member have been added successfully!","response":jsonify(member.to_json())}), status=200,mimetype='application/json')


@app.route('/members/<string:id>', methods=['PUT'])     
def update_member():
    try:
        data = request.json
        if data is None or data == {} or id is None:
            return Response(response=json.dumps({"Error": "Please provide complete information"}),
                            status=400, mimetype='application/json')
        
        member = Member.objects({'_id':db.ObjectId(id)}).first()
        if not member:
            return Response(response=jsonify({'error': 'Member not found'}), status=200,mimetype='application/json')
        else:
            member.update({'_id':db.ObjectId(id)})
            return Response(response=json.dumps({"Success":"Member have been updated successfully!"}), status=200,mimetype='application/json')

    except:
        return Response(response=json.dumps({"Success":"There was an unexpected error. Cannot update!"}), status=500,mimetype='application/json')
        


@app.route('/members/<string:id>', methods=['DELETE'])   
def delete():
    try:
        data = request.json
        if data is None or data == {} or id is None:
            return Response(response=json.dumps({"Error": "Please provide complete information"}),
                            status=400, mimetype='application/json')

        member = Member.objects({'_id':db.ObjectId(id)}).first()
        if not member:
            return jsonify({'error': 'data not found'})
        else:
            member.delete()
            return Response(response=json.dumps("Member deleted successfully"), status=200,mimetype='application/json')
        
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')


@app.route('/member/<string:id>', methods=['GET'])   
def get_single_member():
    try:   
        member = Member.objects({'_id':db.ObjectId(id)}).first()
        if not member:
            return jsonify({'error': 'data not found'})
        else:
            return Response(response=jsonify(member), status=200,mimetype='application/json')
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')


@app.route('/member/issue/<string:id>', methods=['POST'])
async def issue_book():
    try:
        books_list = request.books.json
        member = Member.objects({'_id':db.ObjectId(id)}).first()

        print(books_list)
        print(member)
        for i in range(books_list.length):
            book = await book.objects({'_id':db.ObjectId(id)}).first()
            member.books.append(book)
            book.quantity_in_library =  book.quantity_in_library-1
            book.times_borrowed = book.times_borrowed + 1
            await book.save()
        
        await member.save()
        transaction = Transaction({
        'type1':'issue',
        'member':member._id,
        'message':'Member'+member.name+" was issues books"
        })
        await transaction.save()

        return Response(response=jsonify({"message":"Books issued successfully"}), status=200,mimetype='application/json')
    
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')


@app.route('/member/return/<string:id>', methods=['POST'])
async def return_book():
    try:
        books_list = request.books.json
        member = Member.objects({'_id':db.ObjectId(id)}).first()

        for i in range(books_list.length):
            book = await book.objects({'_id':db.ObjectId(id)}).first()
            member.books.remove(book)
            book.quantity_in_library =  book.quantity_in_library+1
            await book.save()
            member.debt+=book.rent
        
        await member.save()
        transaction = Transaction({
        'type1':'return',
        'member':member._id,
        'message':'Member'+member.name+" returned "+books_list.length
        })
        await transaction.save()

        return Response(response=jsonify({"message":"Books returned successfully"}), status=200,mimetype='application/json')
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')

# Books CRUD route API begins here
@app.route('/books',methods=['GET'])
def get_books():
    try:
        resp = book.objects()

        return Response(response=jsonify(resp), status=200,mimetype='application/json')
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')


@app.route('/books',methods=['POST'])
async def add_books():
    try:
        data = request.json
        if data is None or data == {}:
            return Response(response=json.dumps({"Error": "Please provide complete information"}),
                            status=400, mimetype='application/json')

        book1 = book(data)
        book1.save()

        transaction = Transaction({
        'type1':'add',
        'book':book._id,
        'message':'Book'+member.name+" was added in library "
        })
        await transaction.save()
        return Response(response=json.dumps({"Success":"Books have been added successfully!","response":jsonify(book1)}), status=200,mimetype='application/json')
    except:
        return Response(response=json.dumps({"Error":"Unexpected error occurred"}), status=500,mimetype='application/json')

@app.route('/book/<string:id>', methods=['PUT'])     
def update_book():
    try:
        data = request.json
        if data is None or data == {} or id is None:
            return Response(response=json.dumps({"Error": "Please provide complete information"}),
                            status=400, mimetype='application/json')
        
        book1 = book.objects({'_id':db.ObjectId(id)}).first()
        if not book1:
            return Response(response=jsonify({'error': 'Book not found'}), status=200,mimetype='application/json')
        else:
            book1.update({'_id':db.ObjectId(id)})
            return Response(response=json.dumps({"Success":"Book have been updated successfully!"}), status=200,mimetype='application/json')

    except:
        return Response(response=json.dumps({"Success":"There was an unexpected error. Cannot update!"}), status=500,mimetype='application/json')
        


@app.route('/book/<string:id>', methods=['DELETE'])   
def delete_book():
    try:
        data = request.json
        if data is None or data == {} or id is None:
            return Response(response=json.dumps({"Error": "Please provide complete information"}),
                            status=400, mimetype='application/json')

        book1 = book.objects({'_id':db.ObjectId(id)}).first()
        if not book1:
            return jsonify({'error': 'data not found'})
        else:
            book1.delete()
            return Response(response=json.dumps("Book deleted successfully"), status=200,mimetype='application/json')
        
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')


@app.route('/book/<string:id>', methods=['GET'])   
def get_single_book():
    try:
        book1 = book.objects({'_id':db.ObjectId(id)}).first()
        if not book1:
            return jsonify({'error': 'data not found'})
        else:
            return Response(response=jsonify(book1), status=200,mimetype='application/json')
    except:
        return Response(response=jsonify({"error":"Unexpected error occurred"}), status=500,mimetype='application/json')


@app.route('/import',methods=['POST'])
async def import_books():
    try:          
        response = requests.get("https://frappe.io/api/method/frappe-library")
        raw_data = response.json()
        titles = []
        data = []

        for value in raw_data.values():
            for x in value:
                data.append(x)
                book1 = await book(x)
                book1.save()

        for title in data:
            titles.append(title)
        
        transaction = Transaction({
        'type1':'import',
        'message':'Books imported from Frappe server'
        })
        await transaction.save()

        return Response(response=jsonify({"response":"Books imported successfully"}), status=200,mimetype='application/json')
        
    except :
        return Response(response=jsonify({"error":"Some unexpected error occurred"}), status=500,mimetype='application/json')



# Transaction route API begins here
@app.route('/transactions',methods=['GET'])
def get_transactions():
    try:
        resp = Transaction.objects()

        return Response(response=resp, status=200,mimetype='application/json')
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')

   


# Report route API begins here
@app.route('/reports/popular',methods=['GET'])
async def get_popular_books():
    try:
        sort_function = {"times_borrowed":-1}
        books = await book.find({}).sort(sort_function)

        return Response(response=jsonify(books), status=200,mimetype='application/json')
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')


@app.route('/report/highest',methods=['GET'])
async def get_highest_paying():
    try:
        sort_function = {"total_amount_paid":-1}
        result = await Member.find({}).sort(sort_function)

        return Response(response=jsonify(result), status=200,mimetype='application/json')
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')


# Download CSV transactions

@app.route('/transaction/download',methods=['POST'])
async def download():
    try:
        resp = Transaction.find({})
        row_list = [["ID","Member","Book","Message","Type","Date"]]
        for value in resp:
            id = value._id
            member = value.member.name
            book = value.book.title
            message = value.message
            type1 = value.type1
            date = value.created_at

            row_list.append([id,member,book,message,type1,date])
        
        with open('Transactions.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(row_list)
        
        return send_file('Transactions.csv',mimetype='text/csv',attachment_filename='Transactions.csv',as_attachment=True)
        
    except :
        return Response(response=jsonify({"error":"An error occurred.Please try again"}), status=500,mimetype='application/json')



if __name__ == '__main__':
    app.run(port=8000)