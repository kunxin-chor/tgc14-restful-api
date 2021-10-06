const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoUtil = require('./MongoUtil.js')
const ObjectId = require('mongodb').ObjectId;

let app = express();

// important for RESTFul API:

// allow Express to process JSON payload
// in POST, PUT and PATCH requests
app.use(express.json());

// enable CORS so that our React applications
// hosted on a domain name can use it
app.use(cors());

async function main() {

}

main();

// START SERVER
app.listen(3000, ()=>{
    console.log("Server started")
})
