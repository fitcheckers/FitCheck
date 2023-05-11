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
    let post = await db.collection('posts').doc(id).get();
    if (!post.exists) {
        res.status(400).send('No post was found with that ID.');
        return;
    }
    let postdata = post.data();
    for (let i = 0; i < postdata.likes.length; i++) {
        let userdata = (await db.collection('users').doc(postdata.likes[i]).get()).data();
        if (userdata.likes) userdata.likes.splice(userdata.likes.indexOf(id), 1);
        await db.collection('users').doc(postdata.likes[i]).set(userdata, {merge:true});
    }
    let userdata = (await db.collection('users').doc(postdata.user_id).get()).data();
    userdata.posts.splice(userdata.posts.indexOf(id), 1);
    await db.collection('users').doc(postdata.user_id).set(userdata, {merge:true});
    await db.collection('posts').doc(id).delete();
    res.json({"successful": true});
});

app.post('/post/get', async (req, res) => {
    const {id} = req.body;
    if (!id) {
        res.status(400).send('missing id from json');
        return;
    }
    let doc = await db.collection('posts').doc(id).get();

    if (!doc.exists) {
        res.status(400).send('No post was found with that ID.');
        return;
    }
    doc = doc.data();
    let user = (await db.collection('users').doc(doc.user_id).get()).data();
    res.json({"successful": true, content: doc, user:user});
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
    likes.splice(likes.indexOf(user_id), 1);
    await db.collection('posts').doc(post_id).set({likes:likes}, {merge:true});
    likes = user.likes ? user.likes : [];
    likes.splice(likes.indexOf(post_id), 1);
    await db.collection('users').doc(user_id).set({likes:likes}, {merge:true});
    res.json({"successful": true});
});

app.post('/post/comments/add', async (req, res) => {
    const {user_id, post_id, content} = req.body;
    if (!user_id || !post_id || !content) {
        res.status(400).send('missing user_id or post_id or content from json');
        return;
    }
    let post = await db.collection('posts').doc(post_id).get();
    if(!post.exists) {
        res.status(400).send('post doesnt exist.');
        return;
    }
    const user = await db.collection('users').doc(user_id).get();
    if(!user.exists) {
        res.status(400).send('post doesnt exist.');
        return;
    }
    const comment_id = (Math.floor(Math.random() * 1000000)).toString();
    post = post.data();
    post.comments.push(comment_id);
    const date = Date.now()
    await db.collection('posts').doc(post_id).set(post, {merge:true});
    await db.collection('comments').doc(comment_id).set({user_id: user_id, comment_id:comment_id, post_id:post_id, content:content, date:date}, {merge:true});
    res.json({"successful":true})
});

app.post('/post/comments/edit', async( req, res) => {
    const {comment_id, content} = req.body;
    if (!comment_id|| !content) {
        res.status(400).send('missing user_id or post_id or content from json');
        return;
    }
    const comment = await db.collection('comments').doc(comment_id).get();
    if(!comment.exists) {
        res.status(400).send('comment doesnt exist.');
        return;
    }
    await db.collection('comments').doc(comment_id).set({content:content}, {merge:true});
    res.json({"successful":true});
});

app.post('/post/comments/delete', async (req, res) => {
    const {comment_id} = req.body;
    if (!comment_id) {
        res.status(400).send('missing user_id or post_id or content from json');
        return;
    }
    const comment = await db.collection('comments').doc(comment_id).get();
    if(!comment.exists) {
        res.status(400).send('comment doesnt exist.');
        return;
    }
    await db.collection('comments').doc(comment_id).delete();
    res.json({"successful":true});
});

app.post('/post/comments/get', async (req, res) => {
    const { post_id } = req.body;
    if (!post_id) {
        res.status(400).send('missing post_id');
        return;
    }
    let posts = await db.collection('comments').where('post_id', '==', post_id).orderBy('date', 'asc').get();
    posts = await Promise.all(posts.docs.map(async doc => {
        let docdata = doc.data();
        let userdata = (await db.collection('users').doc(docdata.user_id).get()).data();
        return { 
            id:doc.id,
            user:userdata,
            ...docdata,
        }
    }));
    res.json(posts);
});

app.post('/posts/', async (req, res) => {
    const {user_id} = req.body;
    if (!user_id) {
        res.status(400).send('missing id from json');
        return;
    }
    let data = await db.collection('users').doc(user_id).get();
    if (!data.exists) {
        res.status(400).send('user ID not found.');
        return;
    }
    data = data.data();
    if (!data.posts) data.posts = [];
    res.json({"content":data.posts});
});

app.post('/posts/query', async (req, res) => {
    let {page_size, page, tags, user_id} = req.body;
    if (!tags) tags = [];
    if (!page_size) page_size = 25;
    if (!page) page = 1;
    let data = db.collection('posts');
    if (user_id) {
        data = data.where('user_id', '==', user_id);
        if (tags.length > 0) data = data.where('tags', 'array-contains-any', tags);
        data = await data.orderBy('created', 'desc').offset(page_size * (page - 1)).limit(page_size).get();
        data = await Promise.all(data.docs.map(async doc => { 
            let docdata = doc.data();
            let userdata = (await db.collection('users').doc(docdata.user_id).get()).data();
            return {
                id:doc.id,
                user:userdata,
                ...docdata,
            }
        }));
        return res.json(data);
    };
    if (tags.length > 0) data = data.where('tags', 'array-contains-any', tags);
    data = await data.orderBy('created', 'desc').offset(page_size * (page - 1)).limit(page_size).get();
    data = await Promise.all(data.docs.map(async doc => { 
        let docdata = doc.data();
        let userdata = (await db.collection('users').doc(docdata.user_id).get()).data();
        return {
            id:doc.id,
            user:userdata,
            ...docdata,
        }
    }));
    res.json({data:data});
});