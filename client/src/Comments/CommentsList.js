import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:5001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments =
    comments.length > 0 &&
    comments.map((item) => {
      return (
        <ListItem disablePadding key={item.id}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={item.content} />
        </ListItem>
      );
    });

  return (
    <>
      <List>{renderedComments}</List>
    </>
  );
}

export default CommentsList;
