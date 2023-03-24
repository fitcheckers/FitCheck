'use strict';

const app = require('../../server');
const db = require('../../firestore');
const { get } = require('../../server');

app.post('/post/new', async (req, res) => {
    const {image_url, user_id, description, title, clothes, tags = []} = req.body;
    if (!image_url || !user_id || !description || !title) {
        res.status(400).send('missing data from json');
        return;
    }
    const postID = (Math.floor(Math.random() * 1000000)).toString();
    const date = Date.now();
    const data = {
        image_url: image_url,
        description:description,
        title:title,
        id: postID,
        user_id: user_id,
        comments: [],
        clothes:clothes || {},
        likes: [],
        tags: tags,
        created: date
    };
    await db.collection('posts').doc(postID).set(data);
    const user = await(await db.collection('users').doc(user_id).get()).data();
    if (!user.posts) user.posts = [];
    user.posts.push(postID);
    await db.collection('users').doc(user_id).set(user, {merge:true});
    res.send({"id":postID, "successful":true});
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

app.post('/post/like', async (req, res) => {
    const {user_id, post_id} = req.body;
    if (!user_id || !post_id) {
        res.status(400).send('missing user_id or post_id from json');
        return;
    }
    let doc = await db.collection('posts').doc(post_id).get();
    if (!doc.exists) {
        res.status(400).send('No post was found with that ID.');
        return;
    }
    let userdata = await db.collection('users').doc(user_id).get();
    if (!userdata.exists) {
        res.status(400).send('No user was found with that ID.');
        return;
    }
    let data = doc.data();
    let user = userdata.data();
    let likes = data.likes ? data.likes : [];
    if (likes.includes(user_id)) {  
        res.status(400).send('user already likes the post.');
        return;
    }
    likes.push(user_id);
    await db.collection('posts').doc(post_id).set({likes:likes}, {merge:true});
    likes = user.likes ? user.likes : [];
    likes.push(post_id);
    await db.collection('users').doc(user_id).set({likes:likes}, {merge:true});
    res.json({"successful": true});
});

app.post('/post/unlike', async (req, res) => {
    const {user_id, post_id} = req.body;
    if (!user_id || !post_id) {
        res.status(400).send('missing user_id or post_id from json');
        return;
    }
    let doc = await db.collection('posts').doc(post_id).get();
    if (!doc.exists) {
        res.status(400).send('No post was found with that ID.');
        return;
    }
    let userdata = await db.collection('users').doc(user_id).get();
    if (!userdata.exists) {
        res.status(400).send('No user was found with that ID.');
        return;
    }
    let data = doc.data();
    let user = userdata.data();
    let likes = data.likes ? data.likes : [];
    if (!likes.includes(user_id)) {  
        res.status(400).send('user was not liking the post from the beginning.');
        return;
    }
    likes.splice(likes.indexOf(user_id));
    await db.collection('posts').doc(post_id).set({likes:likes}, {merge:true});
    likes = user.likes ? user.likes : [];
    likes.splice(likes.indexOf(post_id));
    await db.collection('users').doc(user_id).set({likes:likes}, {merge:true});
    res.json({"successful": true});
});

app.post('/posts/', async (req, res) => {
    const {user_id} = req.body;
    if (!user_id) {
        res.status(400).send('missing id from json');
        return;
    }
    let data = await db.collection('users').doc(user_id).get();
    if (!data.exists) {
        res.status(400).send('usser ID not found.');
        return;
    }
    data = data.data();
    if (!data.posts) data.posts = [];
    res.json({"content":data.posts});
});

