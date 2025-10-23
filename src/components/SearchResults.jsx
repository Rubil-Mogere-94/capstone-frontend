import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Container,
  Grid,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import { GradientButton } from './common/GradientButton';

// ✅ Individual Destination Card
export const ResultCard = ({ destination, index }) => {
  const { id, name, country, temperature, precipitation } = destination;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if destination is already in favorites
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = storedFavorites.some((fav) => fav.id === id);
    setIsFavorite(exists);
  }, [id]);

  // ✅ Toggle favorite status
  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = storedFavorites.filter((item) => item.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      storedFavorites.push(destination);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        sx={{
          borderRadius: '16px',
          boxShadow: 3,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          '&:hover': { boxShadow: 6 },
        }}
      >
        {/* Card Image */}
        <Box sx={{ position: 'relative', width: '100%', height: 192, overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              zIndex: 10,
            }}
          />

          <CardMedia
            component="img"
            loading="lazy"
            image={`https://source.unsplash.com/random/600x400?${name},landscape`}
            alt={`${name} landscape`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/fallback-image.jpg';
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
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

          {/* ❤️ Favorite Button (top-right corner) */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255,255,255,0.8)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
              zIndex: 30,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* Weather Info */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                Avg Temp: {temperature?.avg !== null ? `${temperature.avg}°C` : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Precip: {precipitation?.avg !== null ? `${precipitation.avg}mm` : 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <GradientButton onClick={() => navigate(`/destinations/${id}`)}>
              View Details <ArrowForwardIcon fontSize="small" />
            </GradientButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ✅ Main SearchResults Page
const SearchResults = ({ results }) => {
  const navigate = useNavigate();
  const [mapMarkers, setMapMarkers] = useState([]);
  const [cachedResults, setCachedResults] = useState([]);
  const isOnline = navigator.onLine;
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
  if (results?.length > 0 && isOnline) {
    // ✅ Save search results for offline use
    localStorage.setItem("lastSearchResults", JSON.stringify(results));

    const newMarkers = results.map(destination => ({
      position: [destination.lat, destination.lon],
      data: destination,
    }));
    setMapMarkers(newMarkers);
    if (newMarkers.length > 0) {
      setMapCenter(newMarkers[0].position);
      setMapZoom(5);
    }
  } else if (!isOnline) {
    // ✅ If offline, load cached data
    const stored = localStorage.getItem("lastSearchResults");
    if (stored) {
      const offlineResults = JSON.parse(stored);
      setCachedResults(offlineResults);

      const newMarkers = offlineResults.map(destination => ({
        position: [destination.lat, destination.lon],
        data: destination,
      }));
      setMapMarkers(newMarkers);
      if (newMarkers.length > 0) {
        setMapCenter(newMarkers[0].position);
        setMapZoom(5);
      }
    }
  }
}, [results, isOnline]);


  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, rgba(239,246,255,0.5), rgba(224,247,250,0.5))',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* 🔙 Back to Home */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: '12px', fontWeight: 'bold' }}
          >
            Back to Home
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/favorites')}
            sx={{
              borderRadius: '12px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff4081, #f50057)',
            }}
          >
            View Favorites ❤️
          </Button>
        </Box>

        {/* Header */}
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
            Discover multiple locations around the world and save your favorites.
          </Typography>
        </motion.div>

        {/* 🗺️ Map */}
        {mapMarkers.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <MapComponent center={mapCenter} zoom={mapZoom} markers={mapMarkers} />
          </Box>
        )}

        {/* 🌍 Destination Grid */}
        <AnimatePresence>
          <motion.div layout>
            <Grid container spacing={4}>
              {(isOnline ? results : cachedResults).map((destination, index) => (
                <Grid item key={destination.id} xs={12} sm={6} md={4}>
                  <ResultCard destination={destination} index={index} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default SearchResults;
