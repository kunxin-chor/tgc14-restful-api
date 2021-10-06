const MongoClient = require("mongodb").MongoClient;

// global variable
let _db;

async function connect(url, dbname)
{
    let client = await MongoClient.connect(url, {
        useUnifiedTopology:true
    });
    _db = client.db(dbname)
    console.log("Database connected");
}

function getDB() {
    return _db;
}

module.exports = {
    connect, getDB
}

/* 
In JavaScript ES6, the export will be done as:
export { connect, getDB }
*/