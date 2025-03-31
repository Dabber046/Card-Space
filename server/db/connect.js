// server/db/connect.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://jjmin94:<db_password>@dabber.cjswv.mongodb.net/?retryWrites=true&w=majority&appName=Dabber";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;
