import React from 'react';
import { Chip, Stack } from '@mui/material';

export const FilterSection = ({ activeFilters, onFilterClick }) => {
  const filterCategories = ['Beach', 'Mountains', 'City', 'Desert', 'Forest', 'Lake', 'Ocean', 'River', 'Island', 'Historical', 'Cultural', 'Adventure', 'Relaxation'];
  
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
      {filterCategories.map((category) => (
        <Chip
          key={category}
          label={category}
          clickable
          color={activeFilters.includes(category) ? 'primary' : 'default'}
          onClick={() => onFilterClick(category)}
          sx={{ borderRadius: '16px' }}
        />
      ))}
    </Stack>
  );
};