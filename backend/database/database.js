// Database ko connect krne ka code yaha likh rhey hai
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/usersdb';
const client = new MongoClient(url);

let _db;

const mongoConnect = () => {
    return client
        .connect() // mongodb://localhost:27017, is url ke server se connect kia hai mongodb pckage ko
        .then((client) => { 
            _db = client.db("usersdb");
        })
        .catch(err => console.log(err));
}

function getDb(){
    if(_db) return _db;
    return "Error in database, it is not created yet";
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
