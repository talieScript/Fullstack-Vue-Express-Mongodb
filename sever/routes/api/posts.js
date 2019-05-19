const express      = require('express'),
      mongodb      = require('mongodb');

const router = express.Router();


// get posts
router.get("/", async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// add posts

// Delete post


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:1Ginandtonic@cluster0-b9d6t.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts')
}

module.exports = router;