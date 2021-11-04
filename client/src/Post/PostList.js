import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  Card,
  Box,
  Grid,
} from '@mui/material';
import CommentsCreate from '../Comments/CommentsCreate';
import CommentsList from '../Comments/CommentsList';
function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts =
    posts &&
    Object.values(posts).map((post) => {
      return (
        <Grid item xs={2} sm={4} md={4} key={post.id}>
          <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: 'beige' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  {post.title}
                </Typography>
                <CommentsList postId={post.id} />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CommentsCreate postId={post.id} />
            </CardActions>
          </Card>
        </Grid>
      );
    });

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderedPosts}
      </Grid>
    </Box>
  );
}

export default PostList;
