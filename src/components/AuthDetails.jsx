import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { logOut } from '../services/authService';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled logout button with gradient colors
const LogoutButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.error.main} 90%)`,
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '8px 16px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.error.dark} 90%)`,
    boxShadow: '0 4px 8px 2px rgba(255, 105, 135, .4)',
  },
}));

const AuthDetails = ({ onUserChange }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (onUserChange) {
        onUserChange(currentUser);
      }
    });
    return () => unsubscribe();
  }, [auth, onUserChange]);

  const handleLogOut = async () => {
    try {
      await logOut();
      alert('Logged out successfully!');
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {user ? (
        <>
          <Typography variant="body1">Welcome, {user.email}</Typography>
          <LogoutButton 
            variant="contained" 
            onClick={handleLogOut}
            sx={{
              minWidth: '100px',
            }}
          >
            Log Out
          </LogoutButton>
        </>
      ) : (
        <Typography variant="body1">Not logged in</Typography>
      )}
    </Box>
  );
};

export default AuthDetails;