import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GradientButton } from './common/GradientButton';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // ✅ Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // ✅ Remove a favorite destination
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, rgba(239,246,255,0.5), rgba(224,247,250,0.5))',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* 🔙 Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: '12px', fontWeight: 'bold' }}
          >
            Back to Home
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
            Your Favorite Destinations
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.600', maxWidth: 768, mx: 'auto' }}>
            Save your dream destinations and come back anytime to explore them.
          </Typography>
        </motion.div>

        {/* 🧭 Favorites List */}
        <AnimatePresence>
          {favorites.length > 0 ? (
            <motion.div layout>
              <Grid container spacing={4}>
                {favorites.map((destination, index) => (
                  <Grid item key={destination.id} xs={12} sm={6} md={4}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card
                        sx={{
                          borderRadius: '16px',
                          boxShadow: 3,
                          overflow: 'hidden',
                          position: 'relative',
                          '&:hover': { boxShadow: 6 },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={`https://source.unsplash.com/random/600x400?${destination.name},landscape`}
                          alt={destination.name}
                        />
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {destination.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {destination.country}
                          </Typography>

                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <GradientButton onClick={() => navigate(`/destinations/${destination.id}`)}>
                              View Details
                            </GradientButton>

                            <IconButton color="error" onClick={() => removeFavorite(destination.id)}>
                              <FavoriteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 6 }}>
              You have no favorite destinations yet 😢  
              <br />
              Start exploring and add some to your favorites!
            </Typography>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default FavoritesPage;
