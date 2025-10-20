import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ResultCard } from './SearchResults'; // Assuming ResultCard is exported from SearchResults

const ContentRow = ({ title, destinations }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll 80% of visible width
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 2, ml: 2 }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
            msOverflowStyle: 'none', // IE and Edge
            scrollbarWidth: 'none', // Firefox
            gap: 2,
            p: 2,
          }}
        >
          {destinations}
        </Box>
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ContentRow;
