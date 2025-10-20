import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { logOut } from '../services/authService';
import { Box, Button, Typography } from '@mui/material';

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
          <Button variant="contained" color="secondary" onClick={handleLogOut}>Log Out</Button>
        </>
      ) : (
        <Typography variant="body1">Not logged in</Typography>
      )}
    </Box>
  );
};

export default AuthDetails;
