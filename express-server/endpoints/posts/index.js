'use strict';

const app = require('../../server');
const db = require('../../firestore');

app.post('/post/new', async (req, res) => {
    const {image_url, user_id, description, title, clothes} = req.body;
    if (!image_url || !user_id || !description || !title) {
        res.status(400).send('missing data from json');
        return;
    }
    const postID = (Math.floor(Math.random() * 1000000)).toString();
    const data = {
        image_url: image_url,
        description:description,
        title:title,
        id: postID,
        user_id: user_id,
        comments: [],
        clothes:clothes || {},
    };
    await db.collection('posts').doc(postID).set(data);
    const test = await db.collection('posts').doc(postID).get();
    res.json({"id":postID, "successful":true});
});

app.post('/post/delete', async (req, res) => {
    const {id} = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    await db.collection('posts').doc(id).delete();
    res.json({"successful": true});
});

app.post('/post/get', async (req, res) => {
    const {id} = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    const doc = await db.collection('posts').doc(id).get();

    if (!doc.exists) {
        res.status(400).send('No post was found with that ID.');
        return;
    }
    res.json({"successful": true, content: doc.data()});
});