import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
  Container,
  Grid,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import ContentRow from './ContentRow'; // Import ContentRow

// Re-define GradientButton for this component
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.info.dark})`,
  },
}));

export const ResultCard = ({ destination, index }) => { // Export ResultCard
  const { name, country, temperature, precipitation, percentile } = destination;
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleCardClick = () => {
    console.log(`Navigating to details page for: ${name}`);
    // In a real application, you would use react-router-dom or similar
    // to navigate to a detailed page, e.g., history.push(`/destinations/${name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        onClick={handleCardClick} // Add onClick handler here
        sx={{
          borderRadius: '16px',
          boxShadow: 3,
          overflow: 'hidden',
          transform: 'scale(1)',
          transition: 'all 300ms',
          cursor: 'pointer', // Indicate it's clickable
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        {/* Card Image with Overlay */}
        <Box sx={{ position: 'relative', width: '100%', height: 192, overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              zIndex: 10,
            }}
          />
          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}>
            <IconButton
              onClick={toggleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                p: 1,
                borderRadius: '50%',
                boxShadow: 3,
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                transition: 'transform 300ms',
              }}
            >
              {isFavorited ? (
                <FavoriteIcon sx={{ color: 'red.500', fontSize: 20 }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: 'grey.600', fontSize: 20 }} />
              )}
            </IconButton>
          </Box>

          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #e3f2fd, #e0f7fa)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            >
              <LocationOnIcon sx={{ color: 'blue.300', fontSize: 32 }} />
            </Box>
          )}

          <CardMedia
            component="img"
            image={`https://source.unsplash.com/random/600x400?${name},landscape`}
            alt={`${name} landscape`}
            onLoad={() => setImageLoaded(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 700ms',
              transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
              opacity: imageLoaded ? 1 : 0,
            }}
          />

          <Box sx={{ position: 'absolute', bottom: 16, left: 16, zIndex: 20, color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', opacity: 0.9 }}>
              <LocationOnIcon sx={{ fontSize: 12, mr: 0.5 }} />
              <Typography variant="body2">{country}</Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* Description */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'grey.600',
                backgroundColor: 'rgba(239, 246, 255, 0.5)',
                p: 1.5,
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
              }}
            >
              Ideal for a comfortably warm & dry experience.
            </Typography>
          </Box>

          {/* Weather Details */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  p: 1.5,
                  backgroundColor: 'red.50',
                  borderRadius: '12px',
                  border: '1px solid red.100',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 235, 238, 0.5)',
                  },
                  transition: 'background-color 300ms',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'red.100',
                    p: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'red.200',
                    },
                    transition: 'background-color 300ms',
                  }}
                >
                  <ThermostatIcon sx={{ color: 'red.500', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.500' }}>
                    Avg. Temp
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'grey.800', fontWeight: 'bold' }}>
                    {temperature.avg}°C
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'grey.500' }}>
                    ({temperature.min}°C - {temperature.max}°C)
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  p: 1.5,
                  backgroundColor: 'blue.50',
                  borderRadius: '12px',
                  border: '1px solid blue.100',
                  '&:hover': {
                    backgroundColor: 'rgba(227, 242, 253, 0.5)',
                  },
                  transition: 'background-color 300ms',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'blue.100',
                    p: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'blue.200',
                    },
                    transition: 'background-color 300ms',
                  }}
                >
                  <CloudIcon sx={{ color: 'blue.500', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.500' }}>
                    Avg. Precip
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'grey.800', fontWeight: 'bold' }}>
                    {precipitation.avg} mm
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'grey.500' }}>
                    ({precipitation.min} mm - {precipitation.max} mm)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Percentile Bands */}
          <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: '12px', border: '1px solid grey.100' }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'grey.700', mb: 1 }}>
              Climate Range (10th-90th percentile)
            </Typography>
            <Grid container spacing={1.5} sx={{ fontSize: '0.75rem' }}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  Temperature
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.800', fontWeight: 'semibold' }}>
                  {percentile.tempMin}°C - {percentile.tempMax}°C
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  Precipitation
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.800', fontWeight: 'semibold' }}>
                  {percentile.precipMin} mm - {percentile.precipMax} mm
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* View Details Button and Tags */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="Perfect Weather"
                sx={{
                  backgroundColor: 'green.100',
                  color: 'green.800',
                  fontSize: '0.75rem',
                  px: 1,
                  py: 0.5,
                  borderRadius: '9999px',
                }}
              />
              <Chip
                label="Low Rainfall"
                sx={{
                  backgroundColor: 'blue.100',
                  color: 'blue.800',
                  fontSize: '0.75rem',
                  px: 1,
                  py: 0.5,
                  borderRadius: '9999px',
                }}
              />
            </Box>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GradientButton
                variant="contained"
                sx={{
                  px: 2.5,
                  py: 1.25,
                  borderRadius: '12px',
                  fontWeight: 'semibold',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 3,
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                View Details
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </GradientButton>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SearchResults = ({ results }) => {
  // Dummy categorized data for Netflix-style display
  const popularDestinations = results.slice(0, 3);
  const recommendedForYou = results.slice(1, 4);

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, rgba(239, 246, 255, 0.5), rgba(224, 247, 250, 0.5))',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 2 }}>
            Explore Destinations
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.600', maxWidth: 768, mx: 'auto' }}>
            Discover destinations matching your climate preferences.
          </Typography>
        </motion.div>

        <AnimatePresence>
          <motion.div layout>
            {/* Display Content Rows */}
            <ContentRow title="Popular Destinations" destinations={popularDestinations} />
            <ContentRow title="Recommended for You" destinations={recommendedForYou} />
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default SearchResults;