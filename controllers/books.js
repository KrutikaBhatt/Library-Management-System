const mongoose = require('mongoose');
const express =  require('express');
const Book = require('../models/books');
const Transaction = require('../models/transactions');
const Member = require('../models/members');
const axios = require('axios');

// The functions for book controllers

const router = express.Router();

const getBooks = async (req, res) => {
    const books = await Book.find({});
    res.status(200).json({'success':1,data:books});
};

const insertBook = async(req,res) =>{
    try {
        const book = new Book(req.body);
        await book.save();
        
        const transaction = new Transaction({
            type: 'add',
            book: book._id,
            message: `${book.title} was added to the library`
        });
        await transaction.save();
        res.status(200).json({'success':1,message:"Book data inserted succefully"});

    } catch (error) {
        res.status(500).json({'success':0,message:"Some internal error occurred"});
    }
    
};
async function FrappeServer(title, authors,publisher, page) {

    if (!title && !authors && !publisher && !page) {
        return axios.get('https://frappe.io/api/method/frappe-library')
    }
    
    const params = {};
    if (title) {
        params.title = title;
    }
    if (authors) {
        params.authors = authors;
    }
  
    if (publisher) {
        params.publisher = publisher;
    }
    if (page) {
        params.page = page;
    }
    return axios.get('https://frappe.io/api/method/frappe-library', {params});
}
const importBooksfromFrappe = async(req,res) =>{
    var title = req.body.title;
    var authors = req.body.authors;
    var publisher = req.body.publisher;
    var page = req.body.page;
    var numberOfBooks = req.body.numberOfBooks;
    console.log(numberOfBooks);
  
    if(!numberOfBooks) {
        numberOfBooks = 20;
    }

    
    const transaction = new Transaction({
        type: 'import',
        message: `Books were imported using Frappe's API.`
    });
    await transaction.save();

    
    FrappeServer(title, authors, publisher, page)
        .then(response => {
            const { data } = response;
            const books = data.message;
            var book_title ='';

            let promise = new Promise(async function (resolve, reject) {
                for(var i=0;i<numberOfBooks;i++){
                    const newBook = new Book(books[i]);
                    book_title+=(newBook.title+'\n');
                    await newBook.save();
                }
                
                setTimeout(() => resolve(book_title), 1000)
            }).then(book_title =>{
                console.log(book_title);
                res.status(200).json({'success':1,message:"Books import completed",books:book_title})
            })
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("There was some internal error");
        })
}

const getSingleBook = async(req,res) =>{
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({'success':0,message:"No book with ID found in database"})
        }
        console.log(req.params.id)
        return res.status(200).json({'success':1,data:book})
    } catch (error) {
        
    }
}

const updateBook = async(req,res)=>{
    const id = req.params.id;
    const book = req.body;

    console.log("In Update section")
    console.log(book);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Bool available with that id');
    }

    const newBook = await Book.findByIdAndUpdate(id,{...book,id},{new:true});
    return res.status(200).send({'success':1,message :"Book Updated successfully"});
}

const deleteBook = async(req,res) =>{
    try {
        const {id} = req.params.id;

        console.log(req.params.id);
        await Member.updateMany({}, {$pull: {books: {_id: req.params.id}}});
        await Book.findByIdAndRemove(req.params.id);


        return res.status(200).json({ sucess:1,message: "Book deleted successfully." });
    } catch (error) {
        console.log(error); 
    }
    
}

module.exports={
    getBooks,
    insertBook,
    importBooksfromFrappe,
    getSingleBook,
    updateBook,
    deleteBook
}