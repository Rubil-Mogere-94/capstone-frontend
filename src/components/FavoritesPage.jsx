import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';

const dummyFavorites = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://source.unsplash.com/random/600x400?santorini,island',
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://source.unsplash.com/random/600x400?kyoto,temple',
  },
  {
    id: 3,
    name: 'Bora Bora',
    country: 'French Polynesia',
    imageUrl: 'https://source.unsplash.com/random/600x400?borabora,beach',
  },
];

const FavoritesPage = () => {
  const handleDelete = (id) => {
    console.log(`Deleting favorite with ID: ${id}`);
    // Future: Implement actual delete logic here
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
        {dummyFavorites.map((destination) => (
          <Grid item key={destination.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="192"
                image={destination.imageUrl}
                alt={destination.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {destination.name}
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