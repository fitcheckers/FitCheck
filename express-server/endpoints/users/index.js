'use strict';

const app = require('../../server');
const db = require('../../firestore');

app.post('/users/get', async (req, res) => {
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

app.post('/users/update', async (req, res) => {
    const { id, profile_pic_url, profile_banner_url, display_name, username, styles, posts, followers, following, likes, bio } = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    const data = {};
    if (profile_pic_url) data.profile_pic_url = profile_pic_url;
    if (profile_banner_url) data.profile_banner_url = profile_banner_url;
    if (display_name) data.display_name = display_name;
    if (username) data.username = username;
    if (styles) data.styles = styles;
    if (posts) data.posts = posts;
    if (followers) data.followers = followers;
    if (following) data.following = following;
    if (likes) data.likes = likes;
    if (bio) data.bio = bio;
    await db.collection('users').doc(id).set(data, { merge: true });
    res.json({ "success": true });
});

app.post('/users/follow', async (req, res) => {
    const { follower, followed } = req.body;
    if (!follower || !followed) {
        res.status(400).send('missing follower or following from json');
        return;
    }
    let followed_data = await (await db.collection('users').doc(followed).get()).data();
    let follower_data = await (await db.collection('users').doc(follower).get()).data();
    if (!follower_data || !followed_data) {
        res.status(400).send('follower or followed user ID is invalid.');
        return;
    }
    if (!followed_data.followers) followed_data.followers = [];
    if (followed_data.followers.includes(follower)) {
        res.status(400).send('follower is already following them.');
        return;
    }
    followed_data.followers.push(follower);
    if (!follower_data.following) follower_data.following = [];
    follower_data.following.push(followed);
    await db.collection('users').doc(followed).set(followed_data);
    await db.collection('users').doc(follower).set(follower_data);
    res.json({ "success": true });
});

app.post('/users/unfollow', async (req, res) => {
    const { follower, followed } = req.body;
    if (!follower || !followed) {
        res.status(400).send('missing follower or following from json');
        return;
    }
    let followed_data = await (await db.collection('users').doc(followed).get()).data();
    let follower_data = await (await db.collection('users').doc(follower).get()).data();
    if (!follower_data || !followed_data) {
        res.status(400).send('follower or followed user ID is invalid.');
        return;
    }
    if (!followed_data.followers) followed_data.followers = [];
    if (!followed_data.followers.includes(follower)) {
        res.status(400).send('follower is not currrently following them.');
        return;
    }
    followed_data.followers.splice(followed_data.followers.indexOf(follower));
    follower_data.following.splice(follower_data.following.indexOf(followed));
    await db.collection('users').doc(followed).set(followed_data);
    await db.collection('users').doc(follower).set(follower_data);
    res.json({ "success": true });
});

app.post('/users/followers', async (req, res) => {
    let { id, followers = true, following = true } = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    const returning = {};
    const data = await (await db.collection('users').doc(id).get()).data();
    if (followers) returning.followers = await (await db.collection('users').where('__name__', 'in', data.followers).get()).docs.map(doc => { return { ...doc.data()}});
    if (following) returning.following = await (await db.collection('users').where('__name__', 'in', data.following).get()).docs.map(doc => { return { ...doc.data()}});
    res.json(returning);
});