import React, { useState } from 'react';
import { signUp } from '../services/authService';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert('Signed up successfully!');
      navigate('/'); // Redirect to home page after successful sign-up
    } catch (error) {
      alert(`Error signing up: ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h1">Sign Up</Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSignUp} fullWidth>Sign Up</Button>
        <Button variant="text" onClick={() => navigate('/signin')} fullWidth>Already have an account? Sign In</Button>
      </Paper>
    </Box>
  );
};

export default SignUp;
