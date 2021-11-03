import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import PostCreate from './Post/PostCreate';

export default function App() {
  return (
    <>
      <Container maxWidth='xl'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Post
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Typography gutterBottom='true' variant='h4'>
          Create Post
        </Typography>
        <PostCreate />
      </Container>
    </>
  );
}
