const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Jacobstephenson97:root@cluster0.nhwp5.mongodb.net/mtgproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;