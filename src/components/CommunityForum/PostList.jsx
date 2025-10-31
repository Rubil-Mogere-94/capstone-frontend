import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from 'firebase/auth';

const PostList = ({ posts, onDelete }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <List>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Paper elevation={3} sx={{ mb: 2, borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            {currentUser && currentUser.uid === post.author_uid && (
              <Tooltip title="Delete Post">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(post.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'grey.500',
                    '&:hover': { color: 'error.main' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            <ListItem alignItems="flex-start" sx={{ py: 2, px: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                    {post.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      sx={{ display: 'inline', mr: 1 }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      by {post.author_uid.substring(0, 8)}... {/* Displaying a shortened author UID */}
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ display: 'inline' }}>
                      on {new Date(post.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography component="div" variant="body1" sx={{ mt: 1.5, color: 'text.primary' }}>
                      {post.content}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < posts.length - 1 && <Divider variant="fullWidth" component="li" sx={{ mx: 3 }} />}
          </Paper>
        </motion.div>
      ))}
    </List>
  );
};

export default PostList;
