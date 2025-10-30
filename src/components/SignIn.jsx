import React, { useState } from 'react';
import { signIn } from '../services/authService';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      alert('Signed in successfully!');
      navigate('/'); // Redirect to home page after successful sign-in
    } catch (error) {
      alert(`Error signing in: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        gap: 6,
        px: 3,
      }}
    >
      {/* Left side - Welcome text */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, black, red)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Klymates
        </Typography>
      </Box>

      {/* Right side - Sign-in box */}
      <Paper
        elevation={3}
        sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}
      >
        <Typography variant="h5" component="h2" align="center">
          Sign In
        </Typography>
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
        <Button variant="contained" onClick={handleSignIn} fullWidth>
          Sign In
        </Button>
        <Button variant="text" onClick={() => navigate('/forgot-password')} fullWidth>
          Forgot Password?
        </Button>
        <Button variant="text" onClick={() => navigate('/signup')} fullWidth>
          Don't have an account? Sign Up
        </Button>
      </Paper>
    </Box>
  );
};

export default SignIn;
