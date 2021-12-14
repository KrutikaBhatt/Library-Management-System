const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    authors: String,
    average_rating: Number,
    isbn: String,
    isbn13: String,
    language_code: String,
    num_pages: Number,
    ratings_count: Number,
    text_reviews_count: Number,
    publication_date: String,
    publisher: String,
    quantity_total: {type: Number, default: 1},
    quantity_in_library: {type: Number, default: 1},
    rent: {type: Number, default: 50},
    times_borrowed: {type: Number, default: 0},
    added_at :{
        type:Date,
        default:new Date()
    }
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;