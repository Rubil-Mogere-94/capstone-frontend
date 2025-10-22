import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Grid, Divider, Button, TextField, CircularProgress, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import AuthDetails from './AuthDetails';
import app from '../firebase'; // Assuming firebase.js is in the parent directory

const ProfilePage = () => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [preferredClimate, setPreferredClimate] = useState('');
  const [travelStyle, setTravelStyle] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
      // In a real app, load preferences from a backend here
      // For now, using placeholders or initial empty state
      setPreferredClimate('Temperate'); // Example default
      setTravelStyle('Adventure'); // Example default
    }
  }, [currentUser]);

  const handleUserChange = (user) => {
    setCurrentUser(user);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setDisplayName(currentUser.displayName || '');
    setPhotoURL(currentUser.photoURL || '');
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsEditingProfile(false);
      // Force a re-render of AuthDetails to get updated user info
      auth.currentUser.reload();
    } catch (error) {
      setSnackbarMessage(`Error updating profile: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    setPasswordError('');
    try {
      // Reauthenticate user before changing password
      // This step is crucial for security
      // For simplicity, we're assuming the user is already logged in and their session is valid.
      // In a production app, you might prompt for current password again or use a recent login token.
      // For now, we'll use a dummy reauthentication if currentPassword is provided.
      if (currentPassword && currentUser.email) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
      }
      
      await updatePassword(currentUser, newPassword);
      setSnackbarMessage('Password updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setPasswordError(error.message);
      setSnackbarMessage(`Error changing password: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = () => {
    setLoading(true);
    // In a real application, you would save these preferences to a backend (e.g., Firebase Firestore)
    // For this example, we'll just simulate saving and update local state.
    setTimeout(() => {
      setSnackbarMessage('Travel preferences saved!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsEditingPreferences(false);
      setLoading(false);
    }, 1000);
  };

  const handleCancelPreferences = () => {
    setIsEditingPreferences(false);
    // Reset to original preferences if cancelled (would fetch from backend in real app)
    setPreferredClimate('Temperate'); // Example default
    setTravelStyle('Adventure'); // Example default
  };

  const userProfile = {
    name: currentUser?.displayName || "Traveler",
    email: currentUser?.email || "Not logged in",
    bio: "Passionate traveler and climate enthusiast. Always looking for sustainable travel options.",
    avatarUrl: currentUser?.photoURL || "https://via.placeholder.com/150",
    memberSince: "January 2023",
    lastLogin: "October 20, 2025",
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 64px)',
        p: 3,
        backgroundColor: '#f0f2f5',
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
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt={userProfile.name}
              src={photoURL || userProfile.avatarUrl}
              sx={{ width: 120, height: 120, border: '3px solid #1976d2' }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333' }}>
              {currentUser ? `${userProfile.name}'s Profile` : 'Guest Profile'}
            </Typography>
            <AuthDetails onUserChange={handleUserChange} />
            {isEditingProfile ? (
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Save Profile'}
                  </Button>
                  <Button variant="outlined" onClick={handleCancelEdit} disabled={loading}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  {userProfile.bio}
                </Typography>
                {currentUser && (
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">Email:</Typography>
              <Typography variant="body1">{userProfile.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">Member Since:</Typography>
              <Typography variant="body1">{userProfile.memberSince}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">Last Login:</Typography>
              <Typography variant="body1">{userProfile.lastLogin}</Typography>
            </Grid>
          </Grid>
          {currentUser && (
            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel Change Password' : 'Change Password'}
            </Button>
          )}

          {isChangingPassword && (
            <Box sx={{ mt: 3, maxWidth: 400 }}>
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                disabled={loading || !currentPassword || !newPassword || !confirmNewPassword}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save New Password'}
              </Button>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Travel Preferences
          </Typography>
          {isEditingPreferences ? (
            <Box sx={{ mt: 2, maxWidth: 400 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="preferred-climate-label">Preferred Climate</InputLabel>
                <Select
                  labelId="preferred-climate-label"
                  value={preferredClimate}
                  label="Preferred Climate"
                  onChange={(e) => setPreferredClimate(e.target.value)}
                >
                  <MenuItem value="Tropical">Tropical</MenuItem>
                  <MenuItem value="Temperate">Temperate</MenuItem>
                  <MenuItem value="Arid">Arid</MenuItem>
                  <MenuItem value="Polar">Polar</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="travel-style-label">Travel Style</InputLabel>
                <Select
                  labelId="travel-style-label"
                  value={travelStyle}
                  label="Travel Style"
                  onChange={(e) => setTravelStyle(e.target.value)}
                >
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Relaxation">Relaxation</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Exploration">Exploration</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSavePreferences}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Preferences'}
                </Button>
                <Button variant="outlined" onClick={handleCancelPreferences} disabled={loading}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Preferred Climate: {preferredClimate}</Typography>
              <Typography variant="body1">Travel Style: {travelStyle}</Typography>
              {currentUser && (
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setIsEditingPreferences(true)}
                >
                  Edit Preferences
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
            Recent Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            (This section would display your recent searches, saved trips, and contributions. 
            Implementation requires tracking user actions across the application and storing them in a database.)
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;j