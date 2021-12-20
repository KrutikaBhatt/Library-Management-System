from ..database import *
from datetime import datetime

db = get_db()

class book(db.Document):
    title = db.StringField(required=True)
    authors = db.StringField(required=True)
    isbn = db.StringField(required=True)
    isbn13 = db.StringField(required=True)
    language_code = db.StringField()
    num_pages = db.StringField()
    ratings_count = db.StringField()
    text_reviews_count = db.StringField()
    publication_date = db.DateTimeField()
    publisher = db.StringField()
    quantity_total = db.IntegerField(default=1)
    quantity_in_library =db.IntegerField(default=1)
    rent = db.IntegerField(default=50)
    times_borrowed = db.IntegerField(default=0)
    created_at = db.DateTimeField(default=datetime.utcnow)
    






