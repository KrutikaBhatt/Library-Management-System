from database import *
from datetime import datetime

db = get_db()

class Transaction(db.Document):
    member = db.ObjectIdField(primary_key=True)
    book  = db.ObjectIdField(primary_key=True)
    type1 = db.StringField(required=True)
    message = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)
