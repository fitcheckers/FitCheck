'use strict';

const express = require('express');

const db = require ('./firestore');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('express server');
});



app.post('/newpost', checkJSON, async (req, res) => {
    const {imageurl, userid, description, title} = req.body;
    if (imageurl == undefined || userid == undefined || description == undefined || title == undefined) {
        res.status(400).send('missing data from json');
        return;
    }
    const postID = (Math.floor(Math.random() * 1000000)).toString();
    const data = {
        imageurl: imageurl,
        description:description,
        title:title,
        id: postID,
        userid: userid
    };
    await db.collection('posts').doc(postID).set(data);
    const test = await db.collection('posts').doc(postID).get();
    res.json({"id":postID, "successful":true});
});

app.post('/deletepost', checkJSON, async (req, res) => {
    const {id} = req.body;
    if (!id) {
        req.status(400).send('messing data from json');
        return;
    }
    await db.collection('posts').doc(id).delete();
    res.json({"successful": true});
});

app.post('/getpost', checkJSON, async (req, res) => {
    const {id} = req.body;
    if (!id) {
        req.status(400).send('messing data from json');
        return;
    }
    const doc = await db.collection('posts').doc(id);

    if (!((await doc.get()).exists)) {
        res.status(400).send('No post was found with that ID.');
        return;
    }

    await doc.delete();
    res.json({"successful": true, content: {}});
});

app.listen(80, () => {
    console.log('express server is now running on port 80');
});

function checkJSON(req, res, next) {
    if (req.headers['content-type'] !== 'application/json') res.status(400).send('Server requires application/json');
    next();
}