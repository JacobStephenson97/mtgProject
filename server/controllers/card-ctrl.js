const { MongoClient } = require('mongodb');
const uri = require('../db/index')
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

getCardByName = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("mtgproject");
        const cards = database.collection("uniqueartcards");
        // query for movies that have a runtime less than 15 minutes
        const query = { name: new RegExp(req.params.name, 'i'), lang: "en" };
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { name: 1 },
            // Include only the `title` and `imdb` fields in each returned document
            projection: { name: 1, image_uris: 1 },
        };
        const cursor = cards.find(query, options).limit(100)
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            return res
                .status(404)
                .json({ success: false, error: "Card not found at all" })
        }
        var array = await cursor.toArray();
        return res.status(200).json({ success: true, data: array })
    } finally {
        await client.close();
    }
}
module.exports = { getCardByName }