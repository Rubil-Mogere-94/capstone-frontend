import React, { useState } from 'react';
import { Box, Typography, Paper, Avatar, Grid, Divider } from '@mui/material';
import AuthDetails from './AuthDetails';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserChange = (user) => {
    setCurrentUser(user);
  };

  // Placeholder for user data - in a real app, this would come from context or an API
  const userProfile = {
    name: currentUser?.displayName || "Traveler",
    email: currentUser?.email || "Not logged in",
    bio: "Passionate traveler and climate enthusiast. Always looking for sustainable travel options.",
    avatarUrl: currentUser?.photoURL || "https://via.placeholder.com/150", // Placeholder avatar
    memberSince: "January 2023", // This would ideally come from user metadata in Firebase
    lastLogin: "October 20, 2025", // This would ideally come from user metadata in Firebase
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 64px)', // Adjust based on header/footer height
        p: 3,
        backgroundColor: '#f0f2f5', // Light background for the page
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 800,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid sx={{ xs: 12, md: 3, display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt={userProfile.name}
              src={userProfile.avatarUrl}
              sx={{ width: 120, height: 120, border: '3px solid #1976d2' }}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 9 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333' }}>
              {currentUser ? `${userProfile.name}'s Profile` : 'Guest Profile'}
            </Typography>
            <AuthDetails onUserChange={handleUserChange} /> {/* Pass the callback */}
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {userProfile.bio}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle1" color="text.secondary">Email:</Typography>
              <Typography variant="body1">{userProfile.email}</Typography>
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle1" color="text.secondary">Member Since:</Typography>
              <Typography variant="body1">{userProfile.memberSince}</Typography>
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle1" color="text.secondary">Last Login:</Typography>
              <Typography variant="body1">{userProfile.lastLogin}</Typography>
            </Grid>
            {/* Add more account details here */}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Travel Preferences
          </Typography>
          <Typography variant="body1" color="text.secondary">
            (Coming Soon: Customize your travel preferences, favorite destinations, and climate impact goals.)
          </Typography>
          {/* Placeholder for future preferences settings */}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Recent Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            (Coming Soon: View your recent searches, saved trips, and contributions.)
          </Typography>
          {/* Placeholder for recent activity */}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;