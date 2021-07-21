const client = require('../db/index')


getCardByName = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("mtgproject");
        const movies = database.collection("cards");
        // query for movies that have a runtime less than 15 minutes
        const query = { name: new RegExp(req.params.name, 'i') };
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            // sort: { title: 1 },
            // Include only the `title` and `imdb` fields in each returned document
            projection: { name: 1 },
        };
        const cursor = movies.find(query, options).limit(3)
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
getAllCards = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("mtgproject");
        const movies = database.collection("cards");
        // query for movies that have a runtime less than 15 minutes
        const query = { name: /Hull/ };
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            // sort: { title: 1 },
            // Include only the `title` and `imdb` fields in each returned document
            projection: { name: 1 },
        };
        const cursor = movies.find(query, options).limit(3)
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
module.exports = { getCardByName, getAllCards }