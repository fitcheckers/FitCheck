'use strict';

const app = require('../../server');
const db = require('../../firestore');

app.post('/users/get', async(req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    const data = await db.collection('users').doc(id).get();
    if (!data.exists) {
        res.status(400).send('user ID was not found.');
    }
    res.json(data.data());
});

app.post('/users/update', async(req, res) => {
    const {id, profile_pic_url, profile_banner_url, display_name, username} = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    const data = {};
    if (profile_pic_url) data.profile_pic_url = profile_pic_url;
    if (profile_banner_url) data.profile_banner_url = profile_banner_url;
    if (display_name) data.display_name = display_name;
    if (username) data.username = username;
    await db.collection('users').doc(id).set(data, {merge:true});
    res.json({"success": true});
});