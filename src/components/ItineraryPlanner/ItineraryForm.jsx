import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const ItineraryForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDestination(initialData.destination || '');
      setStartDate(initialData.startDate || '');
      setEndDate(initialData.endDate || '');
      setNotes(initialData.notes || '');
    } else {
      setTitle('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setNotes('');
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      id: initialData?.id,
      title,
      destination,
      startDate,
      endDate,
      notes,
    });
  };

  const inputFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid sx={{ xs: 12 }}>
          <motion.div variants={inputFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <TextField
              label="Itinerary Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': { borderColor: 'secondary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'secondary.main', boxShadow: '0 0 0 2px rgba(102, 178, 255, 0.2)' },
                },
              }}
            />
          </motion.div>
        </Grid>
        <Grid sx={{ xs: 12 }}>
          <motion.div variants={inputFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <TextField
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': { borderColor: 'secondary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'secondary.main', boxShadow: '0 0 0 2px rgba(102, 178, 255, 0.2)' },
                },
              }}
            />
          </motion.div>
        </Grid>
        <Grid sx={{ xs: 12, sm: 6 }}>
          <motion.div variants={inputFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': { borderColor: 'secondary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'secondary.main', boxShadow: '0 0 0 2px rgba(102, 178, 255, 0.2)' },
                },
              }}
            />
          </motion.div>
        </Grid>
        <Grid sx={{ xs: 12, sm: 6 }}>
          <motion.div variants={inputFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': { borderColor: 'secondary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'secondary.main', boxShadow: '0 0 0 2px rgba(102, 178, 255, 0.2)' },
                },
              }}
            />
          </motion.div>
        </Grid>
        <Grid sx={{ xs: 12 }}>
          <motion.div variants={inputFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': { borderColor: 'secondary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'secondary.main', boxShadow: '0 0 0 2px rgba(102, 178, 255, 0.2)' },
                },
              }}
            />
          </motion.div>
        </Grid>
        <Grid sx={{ xs: 12, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ borderRadius: '20px', px: 3, py: 1, fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '20px', px: 3, py: 1, fontWeight: 'bold' }}>
            {initialData ? 'Save Changes' : 'Create Itinerary'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryForm;
