require('dotenv').config({path: __dirname + '/../config/.env'});

const { MongoClient } = require('mongodb');

const mongURL = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

let db = null;

exports.connectionToDatabase = async () => {
    if(db){
        return db;
    }

    try{
        const client = await MongoClient.connect(mongURL);
        db = client.db(dbName);
        return db;
    } catch (err) {
        throw err;
    }
}