import React, { useState } from 'react';
import Hero from './Hero';
import SearchResults from './SearchResults';
import Header from './Header';
import Footer from './Footer';

import { Box } from '@mui/material';

const ExplorePage = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
    setHasSearched(true);
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 2,
        }}
      >
        <Header />
      </Box>
      <Hero onSearch={handleSearch} hasSearched={hasSearched} />
      {hasSearched && (
        <Box id="search-results" sx={{ py: 4 }}>
          <SearchResults results={searchResults} />
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default ExplorePage;