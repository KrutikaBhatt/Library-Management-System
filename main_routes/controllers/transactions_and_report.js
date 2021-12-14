const mongoose = require('mongoose');
const express =  require('express');
const Book = require('../models/books');
const Transaction = require('../models/transactions');
const Member = require('../models/members');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("transactions.csv");
const CsvParser = require("json2csv").Parser;


// Get all Transactions
const allTransactions = async(req,res) =>{
    try {
        const transactions = await Transaction.find({});
        return res.status(200).send({success:1,data:transactions});
    } catch (error) {
        return res.status(500).send({success:0,message:"Some error happened"});
    }
}

const downloadTransactions = async(req,res) =>{
    try {
        Transaction.find({}).then((objs) => {
            let transaction = [];
        
            objs.forEach((obj) => {
              const { _id, member, book, type,message,created_at } = obj;
              transaction.push({ _id, member, book, type,message,created_at });
            });
        
            const csvFields = ["Id", "Member Name", "Book Name", "Type","Message","Date"];
            const csvParser = new CsvParser({ csvFields });
            const csvData = csvParser.parse(transaction);
            fs.writeFile('transactions.csv', csvData, function(error) {
                if (error) throw error;
                console.log('file saved');
                res.download('transactions.csv','transactions.csv')
            });
          });
    } catch (error) {
        console.log(error);
    }
}

// Reports Routes
const PopularBook = async(req,res) =>{
    //This function sorts the books based on number of times borrowed
    try {
        var sort_function = {times_borrowed:-1};
        const books = await Book.find({}).sort(sort_function);
        return res.status(200).send({success:1,data:books});
    } catch (error) {
     console.log(error);   
    }
}
const HighestPaying = async(req,res) =>{
    // This function sorts the members based on the payment they have done
    try {
        var sort_function = {total_amount_paid:-1};
        const result = await Member.find({}).sort(sort_function);
        return res.status(200).send({success:1,data:result});
    
    } catch (error) {
     console.log(error);   
    }
}

const Chart = async(req,res) =>{
    try {
        Transaction.find({}).then((objs) =>{
            let transaction = [];
            var import1=0;
            var add=0;
            var issue=0;
            var return1 =0;
        
            objs.forEach((obj) => {
              const { _id, member, book, type,message,created_at } = obj;
              if(type=="issue") issue+=1;
              if(type =="add") add+=1;
              if(type =="import") import1+=1;
              if(type=="return") return1+=1;
            });
            transaction.push({"issue":issue,"add":add,"import":import1,"return":return1});
            return res.send({"issue":issue,"add":add,"import":import1,"return":return1});
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports ={
    allTransactions,
    downloadTransactions,
    PopularBook,
    HighestPaying,
    Chart 
}