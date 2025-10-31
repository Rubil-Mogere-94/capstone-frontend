import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const PostList = ({ posts }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Paper elevation={3} sx={{ mb: 2, borderRadius: '12px', overflow: 'hidden' }}>
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
