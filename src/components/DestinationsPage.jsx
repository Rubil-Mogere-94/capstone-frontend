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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const dummyDestinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    imageUrl: 'https://source.unsplash.com/random/600x400?paris,city',
  },
  {
    id: 2,
    name: 'Bora Bora',
    country: 'French Polynesia',
    imageUrl: 'https://source.unsplash.com/random/600x400?borabora,beach',
  },
  {
    id: 3,
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://source.unsplash.com/random/600x400?kyoto,temple',
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    imageUrl: 'https://source.unsplash.com/random/600x400?newyork,city',
  },
  {
    id: 5,
    name: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://source.unsplash.com/random/600x400?santorini,island',
  },
  {
    id: 6,
    name: 'Machu Picchu',
    country: 'Peru',
    imageUrl: 'https://source.unsplash.com/random/600x400?machupicchu,mountains',
  },
];

const DestinationsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Destinations
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Explore a world of climate-smart travel options. Discover your next adventure.
      </Typography>

      <Grid container spacing={4}>
        {dummyDestinations.map((destination) => (
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
                <Button variant="contained" endIcon={<ArrowForwardIcon />} fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DestinationsPage;