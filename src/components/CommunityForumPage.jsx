import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { motion } from 'framer-motion';
import PostList from './CommunityForum/PostList';
import PostForm from './CommunityForum/PostForm';
import Header from './Header'; // ✅ Import Header (adjust path if needed)

const CommunityForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [
      {
        id: Date.now(),
        author: 'Current User', // Placeholder
        date: new Date().toLocaleDateString(),
        ...newPost,
      },
      ...prev,
    ]);
    setOpenForm(false);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      {/* ✅ Header added at the top */}
      <Header />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
          >
            Climate-Smart Travel Forum
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Share tips, ask questions, and connect with eco-conscious travelers.
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
            sx={{
              borderRadius: '20px',
              px: 3,
              py: 1.5,
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              '&:hover': { boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)' },
            }}
          >
            Create New Post
          </Button>
        </Box>

        <Paper elevation={6} sx={{ p: 3, borderRadius: '16px', bgcolor: 'background.paper' }}>
          {posts.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ py: 4 }}
            >
              No posts yet. Be the first to share!
            </Typography>
          ) : (
            <PostList posts={posts} />
          )}
        </Paper>

        <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', pb: 1 }}>
            Create New Post
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <PostForm onSubmit={handleAddPost} onCancel={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default CommunityForumPage;
