import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function CommentsList({ comments }) {
  const renderedComments =
    comments.length > 0 &&
    comments.map((item) => {
      let content = '';

      if (item.status === 'approved') {
        content = item.content;
      } else if (item.status === 'pending') {
        content = 'This comment is still in pending';
      } else if (item.status === 'rejected') {
        content = 'This comment is got rejected';
      }

      return (
        <ListItem disablePadding key={item.id}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={content} />
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
