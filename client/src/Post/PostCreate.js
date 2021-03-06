import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import useStyles from './style';
import axios from 'axios';

function PostCreate(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      await axios.post('http://localhost:5000/posts', {
        title,
      });
    }
    setTitle('');
  };

  return (
    <>
      <form>
        <Box className={`${classes.pt16} ${classes.pb16}`}>
          <TextField
            value={title}
            id='outlined-basic'
            label='Title'
            variant='outlined'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box className={`${classes.pt16} ${classes.pb16}`}>
          <Button variant='contained' onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default PostCreate;
