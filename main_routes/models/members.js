const mongoose = require('mongoose');
const Book = require('./books');

const MemberSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    debt: {
        type: Number, 
        default: '0'
    },
    books: [Book.schema],
    total_amount_paid: {
        type: Number, 
        default: '0'
    },
    created_at :{
        type:Date,
        default:new Date()
    },
});

const Member = mongoose.model('member', MemberSchema);

module.exports = Member;