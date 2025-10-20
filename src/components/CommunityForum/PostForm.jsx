import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const PostForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <TextField
          label="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#f5f5f5',
              '&:hover fieldset': { borderColor: 'primary.main' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main', boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)' },
            },
          }}
        />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <TextField
          label="Your Post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={6}
          required
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#f5f5f5',
              '&:hover fieldset': { borderColor: 'primary.main' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main', boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)' },
            },
          }}
        />
      </motion.div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ borderRadius: '20px', px: 3, py: 1, fontWeight: 'bold' }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px', px: 3, py: 1, fontWeight: 'bold' }}>
          Submit Post
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
