const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { content, id, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((item) => {
      return item.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen('5002', () => {
  console.log('Server started on 5002');
});