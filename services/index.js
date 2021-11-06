const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const port = 5000;
const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:5005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(200).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Events: ', req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log('Post Server is running on : ', port);
});
