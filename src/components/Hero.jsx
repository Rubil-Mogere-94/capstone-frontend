import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled, useTheme } from '@mui/material/styles'; // Import useTheme

// Custom styled components for gradient text and button (re-defined for this component)
const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Use primary and secondary from theme
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const Hero = ({ onSearch, hasSearched }) => {
  const theme = useTheme(); // Access theme
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', { location, dates, guests });
    // Simulate search results
    const dummyResults = [
      {
        name: 'Barcelona',
        country: 'Spain',
        temperature: { avg: 20, min: 15, max: 25 },
        precipitation: { avg: 30, min: 10, max: 50 },
        percentile: { tempMin: 18, tempMax: 27, precipMin: 5, precipMax: 60 },
      },
      {
        name: 'Cape Town',
        country: 'South Africa',
        temperature: { avg: 22, min: 18, max: 28 },
        precipitation: { avg: 20, min: 5, max: 40 },
        percentile: { tempMin: 20, tempMax: 30, precipMin: 2, precipMax: 50 },
      },
      {
        name: 'Sydney',
        country: 'Australia',
        temperature: { avg: 24, min: 20, max: 30 },
        precipitation: { avg: 40, min: 15, max: 70 },
        percentile: { tempMin: 22, tempMax: 32, precipMin: 10, precipMax: 80 },
      },
      {
        name: 'Lisbon',
        country: 'Portugal',
        temperature: { avg: 19, min: 14, max: 24 },
        precipitation: { avg: 35, min: 12, max: 55 },
        percentile: { tempMin: 17, tempMax: 26, precipMin: 8, precipMax: 65 },
      },
    ];
    onSearch(dummyResults);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 700ms ease-in-out',
        overflow: 'hidden',
        ...(hasSearched
          ? {
              height: 80,
              background: theme.palette.background.paper, // Use paper background for compact view
              borderBottom: `1px solid ${theme.palette.divider}`,
            }
          : {
              minHeight: '90vh',
              background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`, // Red gradient
            }),
      }}
    >
      {/* Removed Animated background elements for cleaner UI */}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          p: 2,
          width: '100%',
        }}
      >
        {!hasSearched && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: 32 }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'extrabold',
                  mb: 2,
                  color: 'white',
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  fontSize: { xs: '3rem', md: '4.5rem' },
                }}
              >
                Discover Your
                <GradientText
                  variant="inherit"
                  component="span"
                  sx={{ display: 'block', mt: 1 }}
                >
                  Perfect Climate
                </GradientText>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ marginBottom: 40 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white', // Changed to white for better contrast with red background
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  maxWidth: 768,
                  mx: 'auto',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                Find destinations with ideal weather for your next adventure.
                <Typography
                  component="span"
                  sx={{ display: 'block', mt: 1, fontSize: '1.125rem', color: 'white' }} // Changed to white
                >
                  Search by location, dates, and travel preferences.
                </Typography>
              </Typography>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: hasSearched ? 0 : 0.4 }}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            p: 3,
            boxShadow: 6,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            ...(hasSearched
              ? {
                  width: '100%',
                  maxWidth: 960,
                  mx: 'auto',
                  mt: 0,
                }
              : {
                  width: '100%',
                  mt: 4,
                  '&:hover': {
                    boxShadow: 9,
                  },
                  transition: 'all 500ms',
                }),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              width: '100%',
              gap: 2,
            }}
          >
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Where do you want to go?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(249, 250, 251, 0.8)',
                      '& fieldset': {
                        borderColor: 'grey.200',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.light, // Use theme primary
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main, // Use theme primary
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    '& .MuiInputBase-input': {
                      pl: 5,
                      py: 2,
                      color: 'grey.800',
                      '&::placeholder': {
                        color: 'grey.500',
                        opacity: 1,
                      },
                    },
                    boxShadow: 1,
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: 3,
                    },
                    transition: 'all 300ms',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ position: 'absolute', left: 16, color: theme.palette.primary.main, zIndex: 10 }}>
                        <LocationOnIcon sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="When? (e.g., March-April)"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(249, 250, 251, 0.8)',
                      '& fieldset': {
                        borderColor: 'grey.200',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.light,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    '& .MuiInputBase-input': {
                      pl: 5,
                      py: 2,
                      color: 'grey.800',
                      '&::placeholder': {
                        color: 'grey.500',
                        opacity: 1,
                      },
                    },
                    boxShadow: 1,
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: 3,
                    },
                    transition: 'all 300ms',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ position: 'absolute', left: 16, color: theme.palette.primary.main, zIndex: 10 }}>
                        <CalendarTodayIcon sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Who? (e.g., 2 adults)"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(249, 250, 251, 0.8)',
                      '& fieldset': {
                        borderColor: 'grey.200',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.light,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      },
                    },
                    '& .MuiInputBase-input': {
                      pl: 5,
                      py: 2,
                      color: 'grey.800',
                      '&::placeholder': {
                        color: 'grey.500',
                        opacity: 1,
                      },
                    },
                    boxShadow: 1,
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: 3,
                    },
                    transition: 'all 300ms',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ position: 'absolute', left: 16, color: theme.palette.primary.main, zIndex: 10 }}>
                        <GroupIcon sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GradientButton
                variant="contained"
                onClick={handleSearch}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                  },
                  minWidth: 140,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <SearchIcon sx={{ fontSize: 20 }} />
                Search
              </GradientButton>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
