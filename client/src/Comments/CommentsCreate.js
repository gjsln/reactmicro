import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import useStyles from '../Post/style';

function CommentsCreate({ postId }) {
  const classes = useStyles();
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      await axios.post(`http://localhost:5001/posts/${postId}/comments`, {
        content,
      });
    }
    setContent('');
  };

  return (
    <Box component='div'>
      <form>
        <Box className={`${classes.pt16} ${classes.pb16}`}>
          <TextField
            value={content}
            id='outlined-basic'
            label='Comments'
            variant='outlined'
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Box className={`${classes.pt16} ${classes.pb16}`}>
          <Button variant='contained' onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CommentsCreate;
