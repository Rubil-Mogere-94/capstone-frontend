import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
      navigate('/signin');
    } catch (error) {
      alert(`Error sending password reset email: ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h1">Reset Password</Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handlePasswordReset} fullWidth>Send Reset Email</Button>
        <Button variant="text" onClick={() => navigate('/signin')} fullWidth>Back to Sign In</Button>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
