const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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

  handleEvents(type, data);

  res.send({});
});

const handleEvents = (type, data) => {
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
};

app.listen('5002', async () => {
  console.log('Query service started on 5002');

  const res = await axios.get('http://localhost:5005/events');

  for (let event of res.data) {
    console.log('Processing Events: ', event.type);

    handleEvents(event.type, event.data);
  }
});
