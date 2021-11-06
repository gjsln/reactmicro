const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data?.content?.toLowerCase().includes('orange')
      ? 'rejected'
      : 'approved';

    await axios.post('http://localhost:5005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen('5003', () => {
  console.log('Moderation Service running on 5003');
});
