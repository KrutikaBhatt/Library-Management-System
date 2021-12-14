const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const BookRoutes = require('./routes/book_routes');
const MemberRoutes = require('./routes/member_routes');
const TransactionRoutes = require('./routes/transaction_reports');
const dotenv = require('dotenv');


//The app object is instantiated on creation of the Express server. 
const app = express();
dotenv.config();

// body-parser middleware 

app.use(bodyParser.json({limit :"30mb",extended :true}));
app.use(bodyParser.urlencoded({limit :"30mb",extended :true}));
app.use(cors());


app.get('/',(req,res) =>{
    res.send("Hello!!. This is Frappe dev training server");
});

app.use('/books',BookRoutes);
app.use('/members',MemberRoutes);
app.use('/transaction',TransactionRoutes);


const PORT = process.env.PORT || 8080;

const mongoose_option ={
    useNewUrlParser :true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.CONNECTION_URL,mongoose_option)
    .then(()=>{
        app.listen(PORT,()=> console.log("Backend Server running at port 8080"))
    }).catch((error)=>{console.log("The error occured in Monogodb connection ",error.message)})

mongoose.set('useFindAndModify',false);