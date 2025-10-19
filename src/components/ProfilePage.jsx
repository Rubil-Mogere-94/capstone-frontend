import React from 'react';
import { Box, Typography } from '@mui/material';
import AuthDetails from './AuthDetails';

const ProfilePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <AuthDetails />
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is your profile page. More details and settings will be added here.
      </Typography>
    </Box>
  );
};

export default ProfilePage;