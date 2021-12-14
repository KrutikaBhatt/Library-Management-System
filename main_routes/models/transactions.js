const mongoose = require('mongoose');
const Book = require('./books.js');
const Member = require('./members.js');

const TransactionSchema = mongoose.Schema({
    member: Member.schema,
    book: Book.schema,
    type: String,
    message: String,
    created_at:{
        type:Date,
        default:new Date()
    }

});

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;