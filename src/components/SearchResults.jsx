import { API_BASE_URL } from '../config';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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
  Stack,
} from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // new icon
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import ContentRow from './ContentRow';
import MapComponent from './MapComponent';
import { GradientButton } from './common/GradientButton';
import { FilterSection } from './SearchResults/FilterSection';
import { useQueryClient } from '@tanstack/react-query';

export const ResultCard = ({ destination, index }) => {
  const { id, name, country, temperature, precipitation } = destination;
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

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
              e.target.src = '/fallback-image.jpg'; // Add fallback
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
          {/* Weather Info */}
          <Grid container spacing={2}>
            <Grid sx={{ xs: 6 }}>
              <Typography variant="body2">Avg Temp: {temperature.avg !== null ? `${temperature.avg}°C` : 'N/A'}</Typography>
            </Grid>
            <Grid sx={{ xs: 6 }}>
              <Typography variant="body2">Precip: {precipitation.avg !== null ? `${precipitation.avg}mm` : 'N/A'}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <GradientButton onClick={() => navigate(`/destinations/${id}`)}>
              View Details <ArrowForwardIcon fontSize="small" />
            </GradientButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SearchResults = ({ results }) => {
  const navigate = useNavigate(); // ✅ navigation hook
  const [mapMarkers, setMapMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [activeFilters, setActiveFilters] = useState([]);

  
  
  const handleFilterClick = (category) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((f) => f !== category)
        : [...prevFilters, category]
    );
  };

  const filteredResults = useMemo(() => {
    if (activeFilters.length === 0) return results;
    return results.filter((destination) =>
      activeFilters.some((filter) =>
        destination.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [results, activeFilters]);

  useEffect(() => {
    if (filteredResults?.length > 0) {
      const newMarkers = filteredResults.map(destination => ({
        position: [destination.lat, destination.lon],
        data: destination,
      }));
      setMapMarkers(newMarkers);
      if (newMarkers.length > 0) {
        setMapCenter(newMarkers[0].position);
        setMapZoom(5);
      }
    }
  }, [filteredResults]);

  const popularDestinations = filteredResults.slice(0, 3);
  const recommendedForYou = filteredResults.slice(1, 4);

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, rgba(239,246,255,0.5), rgba(224,247,250,0.5))',
      }}
    >
      <Container maxWidth="lg">
        {/* ✅ Back to Home Button */}
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

        <FilterSection activeFilters={activeFilters} onFilterClick={handleFilterClick} />

        {mapMarkers.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <MapComponent center={mapCenter} zoom={mapZoom} markers={mapMarkers} />
          </Box>
        )}

        <AnimatePresence>
          <motion.div layout>
            <ContentRow title="Popular Destinations" destinations={popularDestinations.map((dest, index) => <ResultCard key={dest.id} destination={dest} index={index} />)} />
            <ContentRow title="Recommended for You" destinations={recommendedForYou.map((dest, index) => <ResultCard key={dest.id} destination={dest} index={index} />)} />
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default SearchResults;