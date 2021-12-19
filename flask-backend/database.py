from flask import Flask
from flask_pymongo import pymongo
from app import app

def get_db():
    CONNECTION_STRING = "mongodb+srv://KrutikaBhatt:krutika123@cluster0.u2gnz.mongodb.net/Frappe?retryWrites=true&w=majority"
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client.get_database('frappe_backend')
    book_collection = pymongo.collection.Collection(db, 'books')
    member_collection = pymongo.collection.Collection(db,'members')
    transactions = pymongo.collection.Collection(db,'transactions')

    return db
