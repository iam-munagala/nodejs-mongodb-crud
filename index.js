const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const url = process.env.mongo_url
const PORT = process.env.PORT;
const router = require("./routes/app");

mongoose.connect(url,{
    useNewUrlParser:true
})



const conn = mongoose.connection

conn.on('open',()=>{
    console.log("DB connected");
})


app.use(express.json());
app.use("/",router);


app.listen(PORT,(req,res)=>{
    console.log(`server is running on http://localhost:${PORT}`);
})