const express      = require('express'),
      mongodb      = require('mongodb');

const router = express.Router();


// get posts
router.get("/", async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// add posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        name: req.body.name,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
})


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:1Ginandtonic@cluster0-b9d6t.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts')
}

module.exports = router;