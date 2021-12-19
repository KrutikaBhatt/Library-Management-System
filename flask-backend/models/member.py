from database import *
from datetime import datetime

db = get_db()

class Member(db.Document):
    name = db.StringField(required=True)
    age = db.IntegerField(required=True)
    gender = db.StringField(required=True)
    debt = db.IntegerField(default=0)
    books = db.ListField(db.ObjectIdField(primary_key=True))  #Save the arrays of books
    total_amount_paid = db.IntegerField(default=0)
    created_at = db.DateTimeField(default=datetime.utcnow)
