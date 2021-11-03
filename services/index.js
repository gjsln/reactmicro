const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const port = 5000;
const app = express();

const posts = {};

app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  res.status(200).send(posts[id]);
});

app.listen(port, () => {
  console.log('Server is running on : ', port);
});
