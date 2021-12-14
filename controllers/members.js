const mongoose = require('mongoose');
const express =  require('express');
const Book = require('../models/books');
const Transaction = require('../models/transactions');
const Member = require('../models/members');


const getMembers = async (req, res) => {
    const member = await Member.find({});
    res.status(200).json({'success':1,data:member});
};


const addMember = async(req, res) => {
    const member = new Member(req.body);
    await member.save();
    
    const transaction = new Transaction({
        type: 'add',
        member: member._id,
        message: `${member.name} was added to the library`
    });
    await transaction.save();

    return res.status(200).send({success:1,message:"The member added successfully"});
};

const getSingleMember = async(req,res) =>{
    const member = await Member.findById(req.params.id);
    if(!member){
        return res.status(404).send("No member found with this ID");
    }

    return res.status(200).send({success:1,data :member});
}

// Issue a Book and Return a book by member


const Issue = async (req, res) => {
    const books = req.body.books;
    const member = await Member.findById(req.params.id);

    console.log(books);
    console.log(member);
    for (let i = 0; i < books.length; i++) {
        const book = await Book.findById(books[i]);
        member.books.push(book);
        book.quantity_in_library -= 1;
        book.times_borrowed += 1;
        await book.save();
    }


    await member.save();

    const transaction = new Transaction({
        type: 'issue',
        member: member._id,
        message: `${member.name} issued ${books.length} book(s): `
    });
   

    for (let i = 0; i < books.length; i++) {
        const book = await Book.findById(books[i]);
        if(i != books.length - 1) {
            transaction.message += `${book.title}, `;
        } else {
            transaction.message += `${book.title}.`;
        }
    }
    await transaction.save();
    return res.status(200).send({success:1,message :"The Book is issued to that member"});
};

const Return = async (req, res) => {
    const books = req.body.books;
    const member = await Member.findById(req.params.id);
    
    for (let i = 0; i < books.length; i++) {
        // get the book
        const book = await Book.findById(books[i]);
        member.books.pull(book);
        book.quantity_in_library += 1;
        await book.save();
        member.debt += book.rent;
    }
    // save the member
    await member.save();
    // store the transaction
    const transaction = new Transaction({
        type: 'return',
        member: member._id,
        message: `${member.name} returned ${books.length} books: `
    });
    for (let i = 0; i < books.length; i++) {
        const book = await Book.findById(books[i]);
        if(i != books.length - 1) {
            transaction.message += `${book.title}, `;
        } else {
            transaction.message += `${book.title}.`;
        }
    }
    await transaction.save();

    return res.status(200).send({success:1,message:"Book returned "})
};


const updateMember = async(req,res)=>{
    const id = req.params.id;
    const member = req.body;
    // Check if the Id is moongoose Id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No member available with that id');
    }

    const newMember = await Member.findByIdAndUpdate(id,{...member,id},{new:true});
    return res.status(200).send({success:1,message:"Member updated successfully"})
}

const deleteMember = async(req,res) =>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No member with this id - ${id}`);
    }

    const member = await Member.findById(id);
   
    for (let i = 0; i < member.books.length; i++) {
        const book = await Book.findById(member.books[i]);
        book.quantity_in_library += 1;
        await book.save();
    }
    
    const transaction = new Transaction({
        type: 'delete',
        member: member._id,
        message: `${member.name} was deleted. Books were returned: ${member.books.join(', ')}`
    });
    await transaction.save();
    await Member.findByIdAndDelete(id);

    return res.status(200).send({success:1,message:"Member deleted successfully"})
}

module.exports ={
    getMembers,
    addMember,
    getSingleMember,
    Issue,
    Return,
    updateMember,
    deleteMember
}