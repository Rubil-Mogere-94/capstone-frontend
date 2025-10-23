import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import SearchResults from './SearchResults';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const ExplorePage = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // ✅ Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ✅ Restore search results if offline
  useEffect(() => {
    if (!isOnline) {
      const stored = localStorage.getItem('exploreSearchResults');
      if (stored) {
        const data = JSON.parse(stored);
        setSearchResults(data);
        setHasSearched(true);
      }
    }
  }, [isOnline]);

  // ✅ Called when search completes
  const handleSearch = (results) => {
    setSearchResults(results);
    setHasSearched(true);

    // Save results locally for offline restore
    localStorage.setItem('exploreSearchResults', JSON.stringify(results));

    // Smooth scroll to results
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
