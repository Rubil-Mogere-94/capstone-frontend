import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/favorites`);
      const favoritesWithImages = response.data.map(dest => {
        const [city, country] = dest.name.split(', ');
        return {
          ...dest,
          city,
          country,
          imageUrl: `https://source.unsplash.com/random/600x400?${city.toLowerCase()},city`
        };
      });
      setFavorites(favoritesWithImages);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/favorites/${id}`);
      // Refresh the list of favorites after deletion
      fetchFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorite Destinations
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Here you can find all the destinations you've marked as favorites.
      </Typography>

      <Grid container spacing={4}>
        {favorites.map((destination) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ borderRadius: '16px', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="192"
                image={destination.imageUrl}
                alt={destination.city}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {destination.city}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">{destination.country}</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(destination.id)}
                  fullWidth
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;