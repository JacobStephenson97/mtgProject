const { MongoClient } = require('mongodb');
const uri = "URI";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;