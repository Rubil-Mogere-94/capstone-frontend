import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import PostList from './CommunityForum/PostList';
import PostForm from './CommunityForum/PostForm';
import Header from './Header';
import { styled } from '@mui/material/styles';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, deletePost } from '../utils/apiClient';

// Same gradient button from previous pages
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.error.main} 90%)`,
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '20px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.error.dark} 90%)`,
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  },
}));

const CommunityForumPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setOpenForm(false);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleAddPost = (newPost) => {
    createPostMutation.mutate(newPost);
  };

  const handleDeletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f4f8 0%, #e1e8f0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          px: 2,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(107, 103, 109, 0.15)',
            py: 4,
            px: 3,
            border: '1px solid rgba(107, 103, 109, 0.1)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#e01212ff',
                mb: 2,
              }}
            >
              Climate-Smart Travel Forum
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#f55853ff',
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Share tips, ask questions, and connect with eco-conscious travelers.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <GradientButton
              variant="contained"
              onClick={() => setOpenForm(true)}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Create New Post
            </GradientButton>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '5px solid rgba(107, 103, 109, 0.15)',
              boxShadow: '0 2px 12px rgba(107, 103, 109, 0.08)',
            }}
          >
            {isLoading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h5" color="error">
                  Failed to load posts.
                </Typography>
              </Box>
            ) : posts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography
                  variant="h5"
                  color="#7a7678"
                  sx={{
                    mb: 2,
                    fontWeight: 300
                  }}
                >
                  No posts yet.
                </Typography>
                <Typography
                  variant="body1"
                  color="#0a090aff"
                  sx={{ opacity: 0.8 }}
                >
                  Be the first to share!
                </Typography>
              </Box>
            ) : (
              <PostList posts={posts} onDelete={handleDeletePost} />
            )}
          </Paper>

          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: {
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(107, 103, 109, 0.2)'
              }
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: '#6b676d',
                color: 'white',
                pb: 2,
                pt: 3
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold">
                Create New Post
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 2 }}>
              <PostForm onSubmit={handleAddPost} onCancel={handleCloseForm} />
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default CommunityForumPage;
