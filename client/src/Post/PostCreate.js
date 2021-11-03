import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import useStyles from './style';

function PostCreate(props) {
  const classes = useStyles();
  return (
    <>
      <form>
        <Box className={`${classes.pt16} ${classes.pb16}`}>
          <TextField id='outlined-basic' label='Title' variant='outlined' />
        </Box>
        <Button variant='contained'>Submit</Button>
      </form>
    </>
  );
}

export default PostCreate;
